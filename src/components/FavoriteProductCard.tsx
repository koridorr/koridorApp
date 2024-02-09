import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICON_NAMES, IMAGE_NAMES, STORAGE_KEYS} from '../helpers/constants';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';
import {navigate, replace} from '../navigation';
import {Button} from '../widgets';
import Text from './Text';
import Touchable from './Touchable';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  useAddFavoriteProductMutation,
  usePostaddCartMutation,
} from '../services/home';
import {generateEncryptedKey} from '../widgets/CryptoPrivacy';
import moment from 'moment';
import {getKeyFromStorage, removeKeyFromStorage} from '../helpers/AsyncStorage';
import {useFocusEffect} from '@react-navigation/native';
import ShowToast from '../utils/Toast';
import {setCredentials} from '../reducers/authSlice';
import {useAppDispatch} from '../hooks/store';

type PropTypes = {
  counter: boolean;
  addButton: boolean;
  headings: boolean;
  addNew: boolean;

  item: any;
  favProducts: any;
  page: string;
  setFavProducts: Dispatch<SetStateAction<any>>;
  setAddNew: Dispatch<SetStateAction<boolean>>;
};

const FavoriteProductCard = ({
  counter,
  addButton,
  headings,
  item,
  setFavProducts,
  favProducts,
  addNew,
  setAddNew,
}: PropTypes) => {
  const dispatch = useAppDispatch();
  const [addFavoriteItem] = useAddFavoriteProductMutation();
  const [addCartApi] = usePostaddCartMutation();
  const [count, setCount] = useState(0);
  useFocusEffect(
    React.useCallback(() => {
      setCount(0);
    }, []),
  );

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
        // setLike(!like);
        if (favProducts?.includes(item)) {
          let indexToDelete = favProducts.indexOf(item);
          favProducts.splice(indexToDelete, 1);
          setFavProducts([...favProducts]);
        } else {
          favProducts?.push(item);
          setFavProducts([...favProducts]);
        }
      }
    } catch (error) {
      // setLoading(false);
    }
  };
  const addRemoveCart = async (type: number) => {
    let data = {
      vendorId: item?.vendorId?._id,
      quantity: 1,
      images: item?.productImages,
      productName: item?.name,
      productId: item?._id,
      type: type, //1 for increment 2 for decrement
      removeAllProducts: false,
      removeItem: false,
      appkey: moment.utc().valueOf().toString(),
    };

    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    setAddNew(true);
    try {
      const payload = await addCartApi(body).unwrap();
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        setAddNew(false);
        if (type == 1) {
          setCount(count + 1);
        } else {
          if (count > 0) {
            setCount(count - 1);
          }
        }
      }
    } catch (error: any) {
      setAddNew(false);

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
    }
    setAddNew(false);
  };

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
      // setLoading(true);
      const payload = await addCartApi(body).unwrap();

      // setLoading(false);
      if (payload.statusCode === 200) {
        navigate('OrderStack', {
          screen: 'MyCart',
          params: {
            data: item?.vendorId,
          },
        });
      }
    } catch (error: any) {
      console.log(error, 'error');

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
      // setLoading(false);
    }
    // setLoading(false);
  };
  const RenderItem = (ele: any, item: any) => {
    return (
      <View style={{alignSelf: 'center'}}>
        <ImageBackground
          resizeMode="contain"
          style={{
            height: screenHeight / 5.5,
            width: screenWidth / 3.2,
            borderRadius: 11,
            overflow: 'hidden',
          }}
          source={{uri: ele?.item}}></ImageBackground>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {headings ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
            bottom: 11,
            paddingVertical: 4,
          }}>
          <View>
            <Text fontSize={14} fontFamily={fonts.BOLD}>
              {item.productCategory}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={styles.foodCard3}>
        {item?.productImages?.length ? (
          <AppIntroSlider
            nextLabel=""
            doneLabel=""
            data={[item.productImages[0]]}
            style={{
              backgroundColor: '#F9F9F9',
              borderRadius: 10,
              right: 1,
              borderRightColor: 8,
            }}
            activeDotStyle={styles.activeDot}
            dotStyle={styles.dot}
            renderItem={ele => RenderItem(ele, item)}
          />
        ) : (
          <View
            style={{
              height: screenHeight / 5.5,
              width: screenWidth / 3,
              backgroundColor: '#F9F9F9',
              borderRadius: 10,
            }}>
            <FastImage
              resizeMode="contain"
              source={IMAGE_NAMES.groceries}
              style={{
                height: screenHeight / 5.5,
                width: screenWidth / 3.2,
                borderRadius: 11,
                overflow: 'hidden',
              }}
            />
          </View>
        )}

        <View style={{}}>
          <View
            style={{
              right: 33,
              paddingTop: 10,
              flex: 1,
            }}>
            <Touchable
              onPress={() => addFavoriteProduct(item)}
              style={{height: screenHeight / 20, width: screenWidth / 13}}>
              <View
                style={favProducts?.includes(item) ? styles.fav1 : styles.fav2}>
                <FastImage
                  source={
                    favProducts?.includes(item)
                      ? ICON_NAMES.heart2
                      : ICON_NAMES.heart
                  }
                  style={{height: 20, width: 20}}
                  resizeMode="contain"
                />
              </View>
            </Touchable>
          </View>
        </View>

        <View style={{width: '55%', right: 15, height: screenHeight / 5.4}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#DCFF9F',
                borderRadius: 10,
                width: screenWidth / 8,
              }}></View>
          </View>

          <Text
            color="#292D32"
            fontSize={12}
            fontFamily={fonts.BOLD}
            customStyle={{}}>
            {item?.name}
          </Text>
          <Text
            color="#272C3F"
            fontSize={16}
            fontFamily={fonts.BOLD}
            customStyle={{marginVertical: 3}}>
            {'$ ' + item?.price || '$ 0'}
          </Text>
          <Text color="#A2A2A2" fontSize={10}>
            {item?.description || 'Test'}
          </Text>
          {addButton ? (
            <View style={{justifyContent: 'flex-end', flex: 1}}>
              <TouchableOpacity
                onPress={() => addToCart()}
                style={{
                  width: 100,
                  height: 40,
                }}>
                <View
                  style={{
                    backgroundColor: colors.green,
                    justifyContent: 'center',
                    width: 70,
                    borderRadius: 20,
                    marginTop: 10,
                    alignItems: 'center',
                    height: 28,
                  }}>
                  <Text fontSize={12} fontFamily={fonts.BOLD} customStyle={{}}>
                    ADD
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}

          {counter ? (
            <View style={{justifyContent: 'flex-end', flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: colors.green,
                  width: 80,
                  padding: 3,
                  borderRadius: 20,
                  justifyContent: 'space-between',
                  // top: 3,
                }}>
                <Touchable
                  onPress={() => {
                    if (item?.cartData && item?.cartData?.quantity > 0) {
                      addRemoveCart(2);
                    }
                  }}
                  style={{
                    justifyContent: 'center',
                    width: 25,
                    alignItems: 'center',
                    height: 25,
                    borderRadius: 50,
                    borderColor: colors.black,
                    backgroundColor: '#DCFF9F',
                  }}>
                  <Text
                    fontSize={18}
                    customStyle={{
                      color: colors.black,
                      bottom: 2,
                    }}>
                    -
                  </Text>
                </Touchable>

                <Text>{` ${
                  item?.cartData?.quantity > 0
                    ? item?.cartData?.quantity
                    : count
                } `}</Text>

                <Touchable
                  onPress={() => addRemoveCart(1)}
                  style={{
                    justifyContent: 'center',
                    width: 25,
                    alignItems: 'center',
                    height: 25,
                    borderRadius: 50,
                    borderColor: colors.black,
                    backgroundColor: '#DCFF9F',
                  }}>
                  <Text
                    fontSize={18}
                    customStyle={{
                      color: colors.black,
                      bottom: 2,
                    }}>
                    +
                  </Text>
                </Touchable>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  foodCard3: {
    height: screenHeight / 5.5,
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  fav1: {
    backgroundColor: colors.white,
    padding: 2,
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    width: screenWidth / 17,
  },
  fav2: {
    backgroundColor: colors.white,
    padding: 2,
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    width: screenWidth / 16.5,
  },
});

export default FavoriteProductCard;
