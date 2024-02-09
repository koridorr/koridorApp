import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const colors = {
  bg: '#ffffff',
  black: '#080808',
  lightBlack: '#1C1C1E',
  white: '#FFFFFF',
  purple: '#31087B',
  grey: '#A2A2A2',
  darkPurple: '#241939',
  lightPink: '#F4EFFF',
  darkPink: '#F86F6F',
  lightGrey: '#B5B5B5',
  lightestGrey: '#F6F6F6',
  lightPurpule: '#EFF4FF',
  red: '#F22222',
  green: '#B8FF3D',
  blue: '#545EAF',
  darkGrey: '#4D4D4D',
  darkYellow: '#926B0F',
  lightYellow: '#F2BC32',
  darkBlue: '#0D5E6B',
  skyBlue: '#32D1F2',
};

const fonts = {
  BLACK: 'WorkSans-Black',
  BOLD: 'Product-Sans-Bold',
  EXTRA_BOLD: 'WorkSans-ExtraBold',
  LIGHT: 'WorkSans-Light',
  LIGHT_ITALIC: 'WorkSans-LightItalic',
  EXTRA_LIGHT: 'WorkSans-ExtraLight',
  MEDIUM: 'WorkSans-Medium',
  REGULAR: 'Product Sans Regular',
  SEMI_BOLD: 'WorkSans-SemiBold',
};

export {screenWidth, screenHeight, colors, fonts};
