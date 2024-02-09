import React from 'react';
import {useState} from 'react';
import {
  Image,
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputEndEditingEventData,
  View,
} from 'react-native';

import {Error, Text, Touchable} from '../components';

import {colors, fonts} from '../helpers/styles';

import FastImage from 'react-native-fast-image';
import {ICON_NAMES} from '../helpers/constants';
import { onFocus } from '@reduxjs/toolkit/dist/query/core/setupListeners';

/**
 *
 * @param onChange
 * @param onFocus
 * @param onBlur
 * @param onSubmitEditing
 * @param value
 * @param label
 * @param placeholder
 * @param error
 * @param isPasswordInput
 * @param customContainerStyle
 * @param customInputStyle
 * @param datePickerFocus
 * @param customIcon
 * @param customIconLeft
 * @param disabled
 * @param inputRef
 * @param showIcon
 * @param highlighted
 * @param returnKeyType
 * @param onEndEditing
 * @param showLeftIcon
 * @param alwaysShowPlaceholder
 * @param datePicker
 * @param autoFocus
 * @param blackPlaceholder
 * @returns {JSX.Element}
 * @constructor
 */
const Input = ({
  onChange = (val: string) => {},
  onEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {},
  onSubmitEditing = Keyboard.dismiss,
  value = '',
  label = '',
  placeholder = '',
  error = '',
  rightIcon = false,
  isPasswordInput = false,
  blackPlaceholder = false,
  searchIcon = false,
  customContainerStyle = {},
  customInputStyle = {},
  customIcon = '' as any,
  customIconLeft = '' as any,
  disabled = false,
  inputRef = {} as any,
  
  showIcon = true,
  returnKeyType = 'done' as any,
  showLeftIcon = false,
  showRightIcon = false,
  alwaysShowPlaceholder = false,
  autoFocus = false,
  highlighted = false,
  keyboardType = 'default' as any,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onIconPress = () => {
    isPasswordInput ? setShowPassword(prev => !prev) : null;
  };

  const styles = getStyles(isFocused, error);

  const showPasswordIcon = () => {
    return (
      <Touchable onPress={onIconPress}>
        {
          <FastImage
            source={!showPassword? ICON_NAMES.hide:ICON_NAMES.view}
            style={{height: 20, width: 20,right:9}}
            resizeMode="contain"
          />
        }
      </Touchable>
    );
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            // borderBottomWidth: 1 ,
            // borderColor: isFocused ? colors.green : '#F3F3F3',
            // borderBottomColor:highlighted?colors.red: isFocused ? colors.green : '#F3F3F3',
            // // borderWidth: highlighted ? 1 : 0,
            borderBottomWidth: 0.9 ,
            borderColor: highlighted ? colors.red  :isFocused?colors.green: '#F3F3F3',
            marginBottom: 5,
            //  borderWidth: highlighted ? 1 : 0,

          },
          customContainerStyle,
        ]}>
        {label && isFocused ? (
          <View style={styles.labelWrapper}>
            <Text children={label} />
          </View>
        ) : null}

        <View style={[styles.inputWrapper]}>
          {showLeftIcon ? (
            <View>
              <Image
                style={{
                  height: Platform.OS === 'ios' ? 40 : 45,
                  width: Platform.OS === 'ios' ? 40 : 45,
                  marginRight: 6,
                }}
                source={customIconLeft}
              />
            </View>
          ) : null}

          {searchIcon ? (
            <View>
              <Image
                style={{
                  height: 22,
                  width: 22,
                  marginLeft: 10,
                }}
                resizeMode="stretch"
                source={ICON_NAMES.search}
              />
            </View>
          ) : null}

          <TextInput
            {...props}
            autoFocus={autoFocus}
            blurOnSubmit={false}
            editable={!disabled}
            keyboardType={keyboardType}
            placeholder={!isFocused || alwaysShowPlaceholder ? placeholder : ''}
            placeholderTextColor={ '#A2A2A2'}
            ref={inputRef}
            returnKeyType={returnKeyType || 'done'}
            secureTextEntry={isPasswordInput && !showPassword}
            style={[styles.inputStyle, customInputStyle]}
            value={value}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            onChangeText={onChange}
            onSubmitEditing={e => {
              Keyboard.dismiss();
              onEndEditing(e);
            }}
            // onEndEditing={onEndEditing}
          />
          {isPasswordInput ? showPasswordIcon() : null}
          {showRightIcon ? (
            <View>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: rightIcon ? colors.black : undefined,
                }}
                resizeMode="contain"
                source={customIconLeft}
              />
            </View>
          ) : null}
        </View>
      </View>
      {error && value ? <Error error={error} /> : null}
    </View>
  );
};

const getStyles = (isFocused: boolean, error: string) =>
  StyleSheet.create({
    container: {
      width: '100%',

      backgroundColor: '#fff',
      // borderRadius: 10,
      // paddingHorizontal: Platform.OS === 'ios' ? 15 : 10,
      // borderWidth: 1,
    },
    labelWrapper: {
      height: 20,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      // top: 3,
    },
    inputStyle: {
      flex: 1,
      paddingVertical: Platform.OS === 'ios' ? 19 : 16,

      color: colors.black,
      fontSize: 14,
      fontFamily: fonts.REGULAR,
    },
  });

export default Input;
