import {Linking, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {colors, fonts} from '../helpers/styles';
import {useAppSelector} from '../hooks/store';
import {navigate} from '../navigation';
import {ProfileListType} from '../types/ProfileList.d.types';
import ShowToast from '../utils/Toast';
import Text from './Text';
import Touchable from './Touchable';
import {ICON_NAMES} from '../helpers/constants';
import React from 'react';

const ProfileListCard = ({icon, name, navigateTo, text}: ProfileListType) => {
  return (
    <Touchable
      onPress={() => {
        if (navigateTo?.length) {
          navigate(navigateTo, {screenNames: name});
        }
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderBottomWidth: 0.2,
          borderBottomColor: colors.lightGrey,
          padding: 18,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <FastImage
              source={icon}
              // tintColor={colors.black}
              style={{
                height: 32,
                width: 32,
                // bottom: 10,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 15,
            }}>
            <Text fontSize={14} color="#292D32" fontFamily={fonts.SEMI_BOLD}>
              {name}
            </Text>
            <Text fontSize={12} color="#908FA1">
              {text}
            </Text>
          </View>
        </View>
        <View>
          <FastImage
            source={ICON_NAMES.arrowButton}
            style={{
              height: 20,
              width: 20,
              left: 5,
              bottom: 5,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </Touchable>
  );
};

export default ProfileListCard;
