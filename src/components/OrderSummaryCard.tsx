import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';
import Text from './Text';
import AppIntroSlider from 'react-native-app-intro-slider';

import {IMAGE_NAMES} from '../helpers/constants';
import moment from 'moment';

type OrderSummaryCardTypes = {
  item: any;
};

const OrderSummaryCard = ({item}: OrderSummaryCardTypes) => {
  const RenderItem = (ele: any, item: any) => {
    return (
      <View style={{alignSelf: 'center', paddingTop: 8}}>
        <FastImage
          resizeMode="contain"
          style={{
            height: screenHeight / 10,
            width: screenWidth / 4.8,
          }}
          source={{uri: ele?.item}}
        />
        <View style={{paddingVertical: 18}} />
      </View>
    );
  };

  return (
    <View style={styles.foodCard3}>
      {item?.item?.images?.length ? (
        <AppIntroSlider
          nextLabel=""
          doneLabel=""
          data={[item?.item?.images[0]]}
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

      <View style={{width: '64%', height: screenHeight / 7.5}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text fontSize={12} color="#548AE6">
              {`  Order ID :  ${item?.item?.orderNo}`}
            </Text>
          </View>
          {/* <Text fontSize={12} fontFamily={fonts.BOLD} color="#20A253">
            Order Delivered
          </Text> */}
        </View>

        <Text color="#292D32" fontSize={14} fontFamily={fonts.SEMI_BOLD}>
          {item?.item?.name}
        </Text>
        <Text color="#292D32" fontSize={10} fontFamily={fonts.REGULAR}>
          Fruit Juices
        </Text>
        <Text color={colors.grey} fontSize={10}>
          {moment(item?.item?.createdAt).format('LL')}
        </Text>
      </View>

      <View
        style={{flexDirection: 'row', justifyContent: 'space-between'}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodCard3: {
    flexDirection: 'row',
    // bottom: 10,

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.purple,
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

export default OrderSummaryCard;
