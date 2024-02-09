import React, {Dispatch, useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICON_NAMES, IMAGE_NAMES, STORAGE_KEYS} from '../helpers/constants';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';
import {navigate} from '../navigation';
import {CartDataTypes} from '../types/User';
import {Button} from '../widgets';
import Text from './Text';
import Touchable from './Touchable';
import AppIntroSlider from 'react-native-app-intro-slider';
import {usePostaddCartMutation} from '../services/home';
import {useAppDispatch} from '../hooks/store';
import {getKeyFromStorage} from '../helpers/AsyncStorage';
import {SetStateAction} from 'react';

type PropTypes = {
  counter: boolean;
  addButton: boolean;
  item: any;
  removeCart: () => void;
  incrementCount: () => void;
  decrementCount: () => void;
};

const ViewCartCard = ({
  counter,
  addButton,
  item,
  removeCart,
  decrementCount,
  incrementCount,
}: PropTypes) => {
  // const [count, setCount] = useState(item?.quantity);

  const RenderItem = (ele: any, item: any) => {
    return (
      <View>
        <FastImage
          resizeMode="contain"
          style={{
            height: screenHeight / 5.9,
            width: screenWidth / 2.8,
          }}
          source={{uri: ele?.item}}
        />
      </View>
    );
  };
  return (
    <View style={styles.foodCard3}>
      <View
        style={{
          width: screenWidth / 2.9,
        }}>
        {item?.images?.length ? (
          <AppIntroSlider
            nextLabel=""
            doneLabel=""
            data={[item?.images[0]]}
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
      </View>
      <View style={{width: '65%', paddingLeft: 11}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#DCFF9F',
                borderRadius: 10,
                width: 50,
                alignItems: 'center',
              }}></View>
          </View>
          <Touchable style={{right: 15}} onPress={() => removeCart(item)}>
            <FastImage
              source={ICON_NAMES.closeCircle}
              style={{height: 28, width: 28}}
              resizeMode="contain"
            />
          </Touchable>
        </View>

        <Text color="#292D32" fontSize={12} fontFamily={fonts.BOLD}>
          {item.productName}
        </Text>
        <Text color="#272C3F" fontSize={16} fontFamily={fonts.BOLD}>
          {'$ ' + item?.productId?.price}
        </Text>
        <Text color="#A2A2A2" fontSize={10}>
          {item.productId?.description}
        </Text>

        {addButton ? (
          <View>
            <Touchable
              onPress={() => navigate('OrderStack', {screen: 'MyCart'})}
              style={{
                flexDirection: 'row',
                backgroundColor: colors.green,
                justifyContent: 'center',
                width: 70,
                borderRadius: 20,

                alignItems: 'center',
                height: 28,
              }}>
              <Text fontSize={12} fontFamily={fonts.BOLD}>
                Add
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
              }}>
              <Touchable
                onPress={() => {
                  // if (count > 0) {
                  decrementCount(item);
                  // }
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

              <Text>{item?.quantity}</Text>
              <Touchable
                onPress={() => {
                  incrementCount(item);
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
                  +
                </Text>
              </Touchable>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  foodCard3: {
    height: screenHeight / 5.8,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
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
export default ViewCartCard;
