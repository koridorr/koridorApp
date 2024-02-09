import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts} from '../helpers/styles';

import Text from './Text';
import {ICON_NAMES} from '../helpers/constants';
import React from 'react';

type itemType = {
  icon: number;
  name: string;
  text: string;
};

type ProfileListType = {
  item: itemType;
  onPress: () => void;
};
const PaymentCard = ({item, onPress}: ProfileListType) => {
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row'}}>
        {/* <View style={{alignSelf: 'center'}}>
          <FastImage
            source={item?.icon}
            style={{
              height: 32,
              width: 32,
            }}
            resizeMode="contain"
          />
        </View> */}
        <View style={styles.v1}>
          <Text fontSize={12} color="#84869A">
            {item?.brand}
          </Text>
          <Text fontSize={14} color="#292D32" fontFamily={fonts.REGULAR}>
            {'**** **** **** ' + item?.last4}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.v2} onPress={() => onPress(item)}>
        <FastImage
          source={ICON_NAMES.delete}
          style={{
            height: 28,
            width: 28,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PaymentCard;
const styles = StyleSheet.create({
  main: {
    padding: 11,
    margin: 10,
    backgroundColor: '#F7FFE9',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  v1: {paddingLeft: 15, alignSelf: 'center'},
  v2: {alignSelf: 'center', right: 11},
});
