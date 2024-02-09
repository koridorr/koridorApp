import React from 'react';
import {StyleSheet, Text as _Text} from 'react-native';

// import RNStyles from '@tapston/react-native-styles';
// import Animated from 'react-native-reanimated';

import {colors, fonts} from '../helpers/styles';

/**
 *
 * @param fontSize
 * @param fontFamily
 * @param color
 * @param children
 * @param opacity
 * @param customStyle
 * @param isAnimated
 * @param props
 * @param fontWeight
 * @returns {JSX.Element}
 * @private
 */
const Text = ({
  fontSize = 16,
  fontFamily = fonts.REGULAR,
  color = colors.black,
  children = '',
  opacity = 1,
  customStyle = {},
  isAnimated = false,
  fontWeight = '500',

  ...props
}): JSX.Element => {
  const style = styles(fontSize, fontFamily, color, opacity, fontWeight);

  const resultProps = {
    children,
    style: [style.text, customStyle],
    ...props,
  };

  return <_Text {...resultProps} />;
  // isAnimated ? <Animated.Text children={children} {...resultProps} /> :
};

const styles = (
  fontSize: number,
  fontFamily: string,
  color: string,
  opacity: number,
  fontWeight: string,
) =>
  StyleSheet.create({
    text: {
      fontSize,
      fontFamily,
      color,
      opacity,
      lineHeight: fontSize + 8,
      fontWeight,
      flexWrap: 'wrap',
    },
  });

export default Text;
