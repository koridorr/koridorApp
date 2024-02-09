import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity, View, Platform} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {colors, fonts, screenWidth} from '../helpers/styles';
import FastImage from 'react-native-fast-image';
import {ICON_NAMES, IMAGE_NAMES} from '../helpers/constants';
import Text from './Text';

type AddressType = {
  address_line1: string;
  address_line2: string;
  state: string;
  city: string;
  zipcode: string;
  id: number;
};
type PlacesAutocompleteTypes = {
  addressFeilds: string;
  setAddressFeilds: Dispatch<SetStateAction<string>>;

  highlighted: any;
  getLocationData: (
    data: {description: SetStateAction<string>; terms: string | any[]},
    details: any,
  ) => void;
  placeholder: string;
  customContainerStyle: {};
  containerStyle: {};
  width: number;
  bottom: number;
  borderBottomWidth: number;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
};

const PlacesAutocomplete = ({
  addressFeilds,
  setAddressFeilds,
  customContainerStyle,
  highlighted,
  borderBottomWidth,
  getLocationData,
  placeholder,
  containerStyle,
  bottom,
  width,
}: PlacesAutocompleteTypes) => {
  const ref = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if (addressFeilds?.address_line1?.length) {
      ref.current?.setAddressText(addressFeilds.address_line1);
    }
  }, [addressFeilds?.address_line1]);
  const removeInput = () => {
    ref.current?.setAddressText('');
    setAddressFeilds(null);
  };

  return (
    <View style={{paddingBottom: 10}}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={placeholder || 'Address'}
        fetchDetails={true}
        onPress={(data, details = null) => {
          setIsFocused(false), getLocationData(data, details);
        }}
        textInputProps={{
          value: addressFeilds,
          placeholder: 'Address',
          onChangeText: val => {
            if (val !== '') {
              setAddressFeilds(val as any);
              setIsFocused(true);
            }
          },

          multiline: true,
          placeholderTextColor: colors.lightGrey,
          returnKeyType: 'search',
          color: colors.black,
          fontSize: 14,
          fontFamily: fonts.REGULAR,
          onBlur: () => setIsFocused(false),
          onFocus: () => setIsFocused(true),
        }}
        query={{
          key: 'AIzaSyCMnlOUgeY6u57rFbFtHSXsRmcyZ4ENP7g',
          language: 'en',
        }}
        styles={{
          container: styles.placesInput,

          textInputContainer: [
            {
              placeholderTextColor: colors.black,
              alignItems: 'center',
              backgroundColor: colors.white,
              paddingVertical: 11,
              borderRadius: 30,
            },
            containerStyle,
          ],
          textInput: [
            {
              backgroundColor: colors.white,
              borderBottomWidth: borderBottomWidth,
              width: screenWidth,
              paddingTop: Platform.OS === 'ios' ? 18 : 5,
              borderColor: highlighted
                ? colors.red
                : isFocused
                ? '#F3F3F3'
                : '#F3F3F3',
            },
            containerStyle,
          ],
        }}
        renderRightButton={() => {
          return (
            <View>
              {addressFeilds ? (
                <TouchableOpacity onPress={() => removeInput()} style={{}}>
                  <FastImage
                    style={{
                      height: 15,
                      width: 15,
                      right: 15,
                    }}
                    source={ICON_NAMES.cross}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
        debounce={500}
        enablePoweredByContainer={false}
        renderRow={rowData => {
          const address =
            rowData.structured_formatting.main_text +
            ' ' +
            rowData.structured_formatting.secondary_text;
          return (
            <View>
              <Text
                style={{fontSize: 12, color: colors.black, fontWeight: '500'}}>
                {address}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  placesInput: {
    // width: screenWidth/1.06,
    width: screenWidth / 1.09,
    // bottom: -5,
  },
});

export default PlacesAutocomplete;
