import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICON_NAMES, IMAGE_NAMES, STORAGE_KEYS} from '../helpers/constants';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';
import Text from './Text';
import AppIntroSlider from 'react-native-app-intro-slider';
import {navigate, replace} from '../navigation';
import Touchable from './Touchable';
import {useAppDispatch} from '../hooks/store';
import {
  useAddFavoriteProductMutation,
  usePostaddCartMutation,
} from '../services/home';
import {generateEncryptedKey} from '../widgets/CryptoPrivacy';
import moment from 'moment';
import {getKeyFromStorage, removeKeyFromStorage} from '../helpers/AsyncStorage';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import ShowToast from '../utils/Toast';
import {setCredentials} from '../reducers/authSlice';
import React from 'react';
type favProducts = {
  _id: any;
  vendorId: any;
  productImages: any;
  name: string;
  price: number;
  subCategoryId: any;
  quantity: string | undefined;
  item: {};
};

type PropTypes = {
  favProducts: favProducts[];
  setFavProducts: Dispatch<SetStateAction<favProducts[]>>;
  like: boolean;
  setLike: Dispatch<SetStateAction<boolean>>;
  index: number;
  item: favProducts;
  setLoading: Dispatch<SetStateAction<boolean>>;
  getCart: () => void;
};

const AddCartCard = ({
  like,
  setLike,
  index,
  item,
  setLoading,
  favProducts,
  setFavProducts,
  getCart,
}: PropTypes) => {
  const dispatch = useAppDispatch();
  const [addFavoriteItem] = useAddFavoriteProductMutation();
  const [addCartApi] = usePostaddCartMutation();

  const addToCart = async () => {
    let data = {
      vendorId: item?.vendorId?._id,
      quantity: 1,
      images: item?.productImages,
      productName: item?.name,
      productId: item?._id,
      type: 1, //1 for increment 2 for decrement
      removeAllProducts: false,
      removeItem: false,
      appkey: moment.utc().valueOf().toString(),
    };

    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload = await addCartApi(body).unwrap();
      setLoading(false);
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        getCart();
        // navigate('OrderStack', {
        //   screen: 'ViewCart',
        //   params: {
        //     data: item?.vendorId,
        //     fromClick:"addCart"
        //   },
        // });
      }
    } catch (error: any) {
      if (error?.data?.message) {
        ShowToast(error?.data?.message);
      }
      if (error?.data?.statusCode === 401) {
        const isVisited = true;
        await removeKeyFromStorage(STORAGE_KEYS.token);
        ShowToast('Session expired');
        replace('AuthFlow', {screen: 'SignUp', params: {isVisited}});
        dispatch(
          setCredentials({
            token: null,
            user: null,
          }),
        );
      }
      setLoading(false);
    }
  };

  const addFavoriteProduct = async (item: any) => {
    try {
      let data = {
        productId: item?._id,
        appkey: moment.utc().valueOf().toString(),
      };

      const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
      const body = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      const payload = await addFavoriteItem({
        body,
        type: 'product',
      }).unwrap();

      if (payload.statusCode === 200) {
        setLike(!like);
        if (favProducts?.includes(item)) {
          let indexToDelete = favProducts.indexOf(item);
          favProducts.splice(indexToDelete, 1);
          setFavProducts([...favProducts]);
        } else {
          favProducts?.push(item);
          setFavProducts([...favProducts]);
        }
      }
    } catch (error: any) {
      setLoading(false);
      if (error?.data?.statusCode === 401) {
        const isVisited = true;
        await removeKeyFromStorage(STORAGE_KEYS.token);
        ShowToast('Session expired');
        replace('AuthFlow', {screen: 'SignUp', params: {isVisited}});
        dispatch(
          setCredentials({
            token: null,
            user: null,
          }),
        );
      }
    }
  };

  const RenderItem = (ele: any, item: any) => {
    return (
      <Pressable
        onPress={() =>
          navigate('OrderStack', {
            screen: 'MyCart',
            params: {
              data: item?.vendorId,
              fromClick: 'home',
            },
          })
        }
        style={{alignSelf: 'center', height: screenHeight / 7}}>
        <FastImage
          resizeMode="contain"
          style={{
            height: screenHeight / 8.3,
            width: screenWidth / 4.6,
            top: 11,
          }}
          source={{uri: ele?.item}}
        />
        <View style={{paddingVertical: 18}} />
      </Pressable>
    );
  };

  return (
    <View style={styles.foodCard2}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 7,
          // flex: 1
        }}>
        <View
          style={{
            paddingHorizontal: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            top: 8,
          }}>
          <Text fontSize={13}>{'$' + item?.price}</Text>

          <Touchable
            onPress={() => addFavoriteProduct(item)}
            style={{
              backgroundColor: colors.white,
              padding: 2,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FastImage
              source={
                favProducts?.includes(item)
                  ? ICON_NAMES.heart2
                  : ICON_NAMES.heart
              }
              style={{
                height: 25,
                width: 25,
                top: 1,
              }}
              resizeMode="contain"
            />
          </Touchable>
        </View>
      </View>

      {item?.productImages?.length ? (
        <AppIntroSlider
          nextLabel=""
          doneLabel=""
          data={[item.productImages[0]]}
          activeDotStyle={styles.activeDot}
          dotStyle={styles.dot}
          renderItem={ele => RenderItem(ele, item)}
        />
      ) : (
        <View
          style={{
            alignSelf: 'center',
            height: screenHeight / 8.3,
          }}>
          <FastImage
            resizeMode="contain"
            style={{
              height: screenHeight / 8.3,
              width: screenWidth / 4.6,
              top: 11,
            }}
            source={IMAGE_NAMES.groceries}
          />
          <View style={{paddingVertical: 18}} />
        </View>
      )}

      <View style={{left: 7}}>
        <Text fontSize={15} fontFamily={fonts.BOLD}>
          {item.name}
        </Text>
        <Text color="grey" fontSize={8} fontFamily={fonts.LIGHT}>
          {item?.subCategoryId?.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text color="grey" fontSize={10} fontFamily={fonts.BOLD}>
            {'Quantity '}
          </Text>
          <Text fontSize={10} fontFamily={fonts.BOLD}>
            {item?.quantity}
          </Text>
        </View>
      </View>
      <Touchable onPress={() => addToCart()} style={styles.addCard}>
        <Text fontFamily={fonts.BOLD} fontSize={12}>
          {'Add to Cart'}
        </Text>
      </Touchable>
    </View>
  );
};
const styles = StyleSheet.create({
  foodCard2: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    height: screenHeight / 3.3,
    width: screenWidth / 2.42,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
  },

  addCard: {
    backgroundColor: colors.green,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    height: 35,
    marginBottom: 9,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  activeDot: {
    backgroundColor: 'black',
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 3,
    top: 25,
  },
  dot: {
    backgroundColor: 'gray',
    width: 4,
    height: 4,
    borderRadius: 4,
    marginHorizontal: 3,
    top: 25,
  },
});

export default AddCartCard;
