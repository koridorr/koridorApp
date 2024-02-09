import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';
import Text from './Text';
import LinearGradient from 'react-native-linear-gradient';
import {ICON_NAMES} from '../helpers/constants';

const BrandCard = (props: any) => {
  const colors :any = [
    ['#32D1F2', '#0D5E6B'],
    ['#F2BC32', '#926B0F'],
    ['#B8FF3D', '#81C115'],
  ];
  const colorIndex = props?.index % colors.length;
  const backgroundColor = colors[colorIndex];

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={backgroundColor}
        style={{borderRadius: 20, height: screenHeight / 4.3}}>
        <View style={{flex: 1}}>
          <View
            style={{
              alignSelf: 'center',
              flex: 0.8,
              justifyContent: 'flex-end',
            }}>
            <FastImage
              source={{uri: props.item.image}}
              style={{
                height: screenHeight / 11,
                width: screenWidth / 4.5,
                borderRadius: 8,
                overflow: 'hidden',
              }}
              resizeMode="contain"
            />
          </View>
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  borderRadius: 10,
                  width: 50,
                  alignItems: 'center',
                }}>
                <Text fontSize={8}>{props.item.cutAmount}</Text>
              </View>

              {/* <Text customStyle={{left: 10}} color="#272C3F" fontSize={10}>
              {props.item.rating}
            </Text> */}
            </View>

            <Text
              color={colors.white}
              fontSize={12}
              fontFamily={fonts.BOLD}
              customStyle={{paddingHorizontal: 10, textAlign: 'center'}}>
              {props.item.name}
            </Text>

            <View style={{}}>
              {/* <Text
              fontSize={14}
              fontFamily={fonts.BOLD}
              customStyle={{
                paddingRight: 6,
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
                color: colors.white,
                paddingLeft: 10,
              }}>
              $613
            </Text> */}
              {/* <Text
              color={colors.white}
              fontSize={16}
              fontFamily={fonts.BOLD}
           >
              {props.item.amount}
            </Text> */}
            </View>
            <Text color="#A2A2A2" fontSize={10}>
              {props.item.text}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    height: screenHeight / 4,
    margin: 5,
    width: screenWidth / 3,
    borderRadius: 20,
  },
});

export default BrandCard;
