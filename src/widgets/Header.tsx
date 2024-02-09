import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {Text, Touchable} from '../components';
import {fonts, screenWidth} from '../helpers/styles';
import BackButton from './BackButton';

type HeaderProps = {
  leftIcon?: Source;
  onLeftIconPress?: any;
  rightIcon?: Source;
  onRightIconPress?: any;
  hideLeftIcon?: boolean;
  title?: string;
  customContainerStyle?: any;
  backgroundColor?: boolean;
};

const Header = ({
  leftIcon,
  rightIcon,
  hideLeftIcon = false,
  title = '',
  customContainerStyle,
  onLeftIconPress = null,
  onRightIconPress = () => {},
  backgroundColor = false,
}: HeaderProps) => {
  return (
    <View style={[styles.headerContainer, customContainerStyle]}>
      {!hideLeftIcon ? (
        <View>
          {leftIcon ? (
            <Touchable onPress={onLeftIconPress}>
              <FastImage source={leftIcon} style={styles.buttonStyle} />
            </Touchable>
          ) : (
            <View>
              <BackButton onLeftIconPress={onLeftIconPress} />
            </View>
          )}
        </View>
      ) : (
        <View />
      )}
      <View style={styles.titleWrapper}>
        <Text
          customStyle={{textAlign: 'center', left: 20}}
          fontSize={18}
          fontFamily={Platform.OS === 'ios' ? fonts.EXTRA_BOLD : fonts.BOLD}
          fontWeight="600">
          {title}
        </Text>
      </View>

      <View>
        {rightIcon ? (
          <Touchable onPress={onRightIconPress}>
            <FastImage source={rightIcon} style={styles.buttonStyle} />
          </Touchable>
        ) : (
          <View style={{minWidth: leftIcon ? screenWidth / 10 : 0}} />
        )}
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',

    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  titleWrapper: {
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 25,
    width: 25,
  },
});

export default Header;
