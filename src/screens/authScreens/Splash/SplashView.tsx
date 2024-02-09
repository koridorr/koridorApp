import React, {useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../components';
import {navigate} from '../../../navigation';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../helpers/styles';

type SplashViewPropTypes = {};

export const SplashView = ({}: SplashViewPropTypes) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={{
          width: 140,
          height: 140,
          bottom: 10,
        }}
        resizeMode="contain"
        source={require('../../../assets/images/splashLogo.png')}
      />
      {/* <StatusBar backgroundColor={colors.green} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
