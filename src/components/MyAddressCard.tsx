import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts} from '../helpers/styles';

import {ProfileListType} from '../types/ProfileList.d.types';

import Text from './Text';

import {ICON_NAMES} from '../helpers/constants';
import React from 'react';

const MyAddressCard = ({icon, name, navigateTo, text}: ProfileListType) => {
  return (
    <View
      style={{
        padding: 18,
        margin: 10,
        backgroundColor: '#F7FFE9',
        justifyContent:"center",
      }}>
        <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:11}}>

        <View style={{flexDirection:"row"}}>
          <View>
          <FastImage
            source={icon}
            style={{
              height: 18,
              width: 18,
              top: 5,
            }}
          />
          </View>
          <View style={{paddingLeft:11}}> 
          <Text fontSize={14} color="#292D32" fontFamily={fonts.REGULAR}>
            {name}
          </Text>
          <Text fontSize={12} color="#84869A">
            {text}
          </Text>
          </View>
        </View>
        <View style={{flexDirection:"row"}}>
        <FastImage
            source={ICON_NAMES.pencil}
            style={{
              height: 23,
              width: 23,
              paddingLeft: 2,
            }}
            resizeMode="contain"
          />
          <FastImage
            source={ICON_NAMES.delete}
            style={{
              height: 23,
              width: 23,
              left: 12,
            }}
            resizeMode="contain"
          />
        </View>
        </View>

      
    </View>
  );
};

export default MyAddressCard;
