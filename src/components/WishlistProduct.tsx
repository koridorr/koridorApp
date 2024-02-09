import React, {Dispatch, SetStateAction, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICON_NAMES, IMAGE_NAMES, STORAGE_KEYS} from '../helpers/constants';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';
import {navigate, replace} from '../navigation';
import {Button} from '../widgets';
import Text from './Text';
import Touchable from './Touchable';
import AppIntroSlider from 'react-native-app-intro-slider';
import {usePostaddCartMutation} from '../services/home';
import moment from 'moment';
import {generateEncryptedKey} from '../widgets/CryptoPrivacy';
import ShowToast from '../utils/Toast';
import {removeKeyFromStorage} from '../helpers/AsyncStorage';
import {setCredentials} from '../reducers/authSlice';
import {useAppDispatch} from '../hooks/store';

type PropTypes = {
  counter: boolean;
  addButton: boolean;
  headings: boolean;
  item: any;
  removeFav: (id: string) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const WishlistProduct = ({
  counter,
  setLoading,
  addButton,
  headings,
  item,
  removeFav,
}: PropTypes) => {
  const dispatch = useAppDispatch();

  const [addCartApi] = usePostaddCartMutation();
  const [count, setCount] = useState(0);
  const [like, setLike] = useState(false);
  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const RenderItem = (ele: any, item: any) => {
    return (
      <View style={{}}>
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

  const addToCart = async () => {
    let data = {
      vendorId: item?.productId?.vendorId?._id,
      quantity: 1,
      images: item?.productId?.productImages,
      productName: item?.productId?.name,
      productId: item?.productId?._id,
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
      if (payload.statusCode === 200) {
        navigate('OrderStack', {
          screen: 'ViewCart',
          params: {
            data: item?.productId?.vendorId?._id,
            fromClick: 'addCart',
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
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
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
        {item?.productId?.productImages?.length ? (
          <AppIntroSlider
            nextLabel=""
            doneLabel=""
            data={[item?.productId?.productImages[0]]}
            activeDotStyle={styles.activeDot}
            style={{
              backgroundColor: '#F9F9F9',
              borderRadius: 10,
              right: 1,
              borderRightColor: 8,
            }}
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
        <View style={{alignSelf: 'flex-start'}}>
          <View
            style={{
              right: 30,
              paddingTop: 15,
              flex: 1,
            }}>
            <Touchable
              onPress={() => {
                removeFav(item?.productId?._id);
              }}
              style={{
                backgroundColor: colors.white,
                padding: 2,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FastImage
                source={ICON_NAMES.heart2}
                style={{
                  height: 22,
                  width: 22,
                  top: 1,
                }}
                resizeMode="contain"
              />
            </Touchable>
          </View>
        </View>
        <View style={{width: '55%', height: screenHeight / 5, right: 15}}>
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
            customStyle={{paddingTop: 5}}>
            {item?.productId?.name}
          </Text>
          <Text
            color="#272C3F"
            fontSize={16}
            fontFamily={fonts.BOLD}
            customStyle={{marginVertical: 3}}>
            {'$ ' + item?.productId?.price || '$ 0'}
          </Text>
          <Text color="#A2A2A2" fontSize={10}>
            {item?.productId?.description || 'Test'}
          </Text>

          {addButton ? (
            <View style={{justifyContent: 'flex-end', flex: 0.9}}>
              <Touchable
                onPress={() => addToCart(item)}
                // onPress={() =>
                //   navigate('OrderStack', {
                //     screen: 'MyCart',
                //     params: {
                //       data: item?.productId?.vendorId,
                //     },
                //   })
                // }
                style={{
                  flexDirection: 'row',
                  backgroundColor: colors.green,
                  justifyContent: 'center',
                  width: 70,
                  borderRadius: 20,
                  marginTop: 5,
                  alignItems: 'center',
                  height: 28,
                }}>
                <Text fontSize={12} fontFamily={fonts.BOLD} customStyle={{}}>
                  ADD
                </Text>
              </Touchable>
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
                  top: 3,
                }}>
                <Touchable
                  onPress={decrementCount}
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
                <Text> {count} </Text>

                <Touchable
                  onPress={incrementCount}
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
    </>
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
});

export default WishlistProduct;
