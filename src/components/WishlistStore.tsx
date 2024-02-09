import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {ICON_NAMES, IMAGE_NAMES} from '../helpers/constants';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';
import Text from './Text';
import FastImage from 'react-native-fast-image';
import Touchable from './Touchable';
import {navigate} from '../navigation';
type PropTypes = {
  item: any;
  removeFav: (id:string) => void;
};
const WishlistStore = ({item, removeFav}: PropTypes) => {
  return (
    <Touchable
      onPress={() =>
        navigate('OrderStack', {
          screen: 'MyCart',
          params: {
            data: item?.vendorId,
          },
        })
      }
      style={{alignSelf: 'center'}}>
      <ImageBackground
        resizeMode="cover"
        source={{uri: item?.vendorId?.businessImages[0]}}
        style={{
          height: screenHeight / 4.4,
          width: screenWidth / 1.1,
          borderRadius: 11,
          overflow: 'hidden',
          backgroundColor: '#F9F9F9',
        }}>
        <View style={{alignSelf: 'flex-end', right: 8, paddingTop: 11}}>
          <Touchable
            onPress={() => removeFav(item?.vendorId?._id)}
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
        <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            rowGap: 8,
            alignSelf: 'center',
            paddingBottom: 8,
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              width: screenWidth / 1.24,
              height: screenHeight / 10,
              borderRadius: 11,
            }}>
            <View
              style={{
                justifyContent: 'center',
                flex: 1,
                paddingHorizontal: 11,
              }}>
              <Text fontSize={14} fontFamily={fonts.BOLD}>
                {item?.vendorId?.storeName || ''}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <FastImage
                  source={ICON_NAMES.locationIcn}
                  style={{height: 14, width: 14, top: 2}}
                  resizeMode="contain"
                />
                <Text
                  fontFamily={fonts.REGULAR}
                  customStyle={{paddingLeft: 2}}
                  color={colors.lightGrey}
                  fontSize={12}>
                  {item?.vendorId?.storeAddress?.slice(0, 45)}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {item?.vendorId?.rating > 0 ? (
                  <View style={{flexDirection: 'row'}}>
                    <FastImage
                      source={ICON_NAMES.star}
                      style={{height: 14, width: 14, top: 2}}
                      resizeMode="contain"
                    />

                    <Text customStyle={{paddingLeft: 2}} fontSize={10}>
                      {item?.vendorId?.rating?.toFixed(1)}
                    </Text>
                  </View>
                ) : null}
                {/* <View style={{ flexDirection: "row" }}>
                <FastImage
                tintColor={colors.black}
                      source={ICON_NAMES.clock}
                      style={{ height: 14, width: 14 ,top:2}}
                      resizeMode="contain"
                    />
                
                  <Text customStyle={{paddingLeft:2}} fontSize={10}>60 min</Text>
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Touchable>
  );
};

export default WishlistStore;

const styles = StyleSheet.create({});
