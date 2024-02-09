import {colors, fonts} from '../helpers/styles';
import {GestureResponderEvent, Keyboard, StyleSheet, View} from 'react-native';
import {Touchable, Text} from '../components';
import FastImage, {Source} from 'react-native-fast-image';

/**
 *
 * @param onPress
 * @param value
 * @param type
 * @param disabled
 * @param customStyle
 * @returns {JSX.Element}
 * @constructor
 */

type ButtonTypes = {
  onPress: (event: GestureResponderEvent) => void;
  value?: string;
  disabled?: boolean;
  customStyle?: any;
  leftIcon?: Source;
  buttonTextColor?: string;
};

const Button = ({
  onPress,
  value = '',
  disabled = false,
  customStyle = {},
  leftIcon,
  buttonTextColor = '',
}: ButtonTypes): JSX.Element => {
  const buttonStyle = disabled ? styles.disabled : styles.default;
  const textColor = disabled ? colors.grey : buttonStyle.color;

  return (
    <Touchable
      disabled={disabled}
      style={[styles.container, buttonStyle, customStyle]}
      onPress={(e: any) => {
        Keyboard.dismiss();
        onPress(e);
      }}>
      {leftIcon ? (
        <View style={styles.imageWrapper}>
          <FastImage source={leftIcon} style={styles.imageStyle} />
        </View>
      ) : null}
      <Text
        children={value}
        color={buttonTextColor || textColor}
        fontFamily={fonts.BOLD}
        fontSize={16}
      />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  default: {
    backgroundColor: colors.green,
    color: colors.black,
  },
  bordered: {
    backgroundColor: 'transparent',
    color: colors.purple,
    borderWidth: 2,
    borderColor: colors.green,
  },
  disabled: {
    backgroundColor: colors.green,
    color: colors.white,
  },
  imageStyle: {
    width: 22,
    height: 22,
  },
  imageWrapper: {
    marginRight: 5,
  },
});

export default Button;
