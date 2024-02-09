import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  TextInputEndEditingEventData,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {colors, fonts} from '../helpers/styles';
import Error from './Error';
import {NativeSyntheticEvent} from 'react-native';

import FastImage from 'react-native-fast-image';
export const CountryPickerComponent = ({
  onChange = (val: string) => {},
  onEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {},
  value = '',
  placeholder = '',
  error = '',
  customContainerStyle = {},
  fullBorder = false,
  highlighted = false,
  profile = false,
  iconSource = {},
  showIcon = false,
  ...props
}) => {
  let countryCode = props.countryName;
  const [withFilter, setwithFilter] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    setwithFilter(true);
  }, [withFilter]);

  const onSelect = (country: any) => {
    props.setCountryCode(`+${country.callingCode}`);
    props.setCountryName(country.cca2);
  };
  return (
    <View>
      <View
        style={[
          styles.inputField,
          {
            borderBottomWidth: highlighted ? 0.3 : 1,
            borderWidth: fullBorder ? 1 : 0,
            borderRadius: fullBorder ? 12 : 0,
            borderBottomColor: highlighted
              ? colors.red
              : isFocused
              ? colors.green
              : '#F3F3F3',
            borderColor: highlighted
              ? colors.red
              : isFocused
              ? colors.green
              : '#F3F3F3',
          },
          customContainerStyle,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 12,
            width: '90%',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              left: 5,
            }}
            pointerEvents={props?.editable ? 'auto' : 'none'}>
            <CountryPicker
              {...{
                withCallingCodeButton: true,
                withFlagButton: true,
                countryCode,
                withFilter,
                onSelect,
              }}
              visible={false}
              theme={{
                fontSize: 16,
              }}
            />
          </View>
          <TextInput
            {...props}
            style={styles.EnterInput}
            placeholder={placeholder}
            maxLength={16}
            keyboardType={'numeric'}
            placeholderTextColor="#A2A2A2"
            onChangeText={onChange}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            value={value}
            onSubmitEditing={onEndEditing}
            returnKeyType={'done'}
          />
          <View style={{left: 16}}>
            {showIcon ? (
              <FastImage
                resizeMode="contain"
                source={iconSource}
                style={{width: 20, height: 20}}
              />
            ) : undefined}
          </View>
        </View>
      </View>
      {error && value ? <Error error={error} /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#ffffff',
    // borderRadius: 12,
    flexDirection: 'row',
    // paddingHorizontal: 15,

    // borderBottomWidth:  ,
    marginVertical: 1,
  },
  EnterInput: {
    fontSize: 14.4,
    fontFamily: fonts.REGULAR,
    paddingVertical: Platform.OS === 'ios' ? 18 : 15,
    width: '74%',
    marginLeft: Platform.OS === 'ios' ? 6 : 2,
    top: Platform.OS === 'ios' ? 0 : 1,
    color: colors.black,
    paddingLeft: 5,
  },
});
