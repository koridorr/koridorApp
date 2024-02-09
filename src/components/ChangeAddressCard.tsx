import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts} from '../helpers/styles';
import {ProfileListType} from '../types/ProfileList.d.types';
import Text from './Text';
import {ICON_NAMES} from '../helpers/constants';
import React from 'react';

const ChangeAddressCard = ({icon, name, text}: ProfileListType) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}>
      <View>
        <FastImage
          source={icon}
          style={{
            height: 28,
            width: 28,
            bottom: 5,
          }}
          resizeMode="contain"
        />
      </View>

      <View style={{left: 10, width: '100%'}}>
        <Text fontSize={12} color="#292D32" fontFamily={fonts.BOLD}>
          {name}
        </Text>

        <Text fontSize={12} color="#84869A">
          {text}
        </Text>
        <View
          style={{
            borderBottomWidth: 0.3,
            paddingVertical: 5,
            borderBottomColor: '#A2A2A2',
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};

export default ChangeAddressCard;
