import React, {Dispatch, SetStateAction} from 'react';
import {Image, StyleSheet, View, ScrollView} from 'react-native';
import {ImagePickerModal, PlacesAutocomplete, Text} from '../../../components';
import {CountryPickerComponent} from '../../../components/CountryPickerComponent';

import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../helpers/styles';
import {
  Button,
  CustomDropdown,
  Header,
  ImagePicker,
  Input,
} from '../../../widgets';

import {ICON_NAMES} from '../../../helpers/constants';
import {
  IsValidEmail,
  isNumber,
  isString,
  isValidPassword,
} from '../../../utils/Validations';
import Loader from '../../../widgets/Loader';
import {ImageResponse, User} from '../../../types/User';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

type ValueTypes = {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  alternativePhoneNo: string;
  city: string;
};
type AddressType = {
  address_line1: string;
  address_line2: string;
  state: string;
  city: string;
  zipcode: string;
  id: number;
};

type ProfileSetupPropTypes = {
  values: ValueTypes;
  setValues: Dispatch<SetStateAction<ValueTypes>>;
  submitted: boolean;
  alternativeCountryCode: string;
  alternativeCountryName: string;
  countryName: string;
  countryCode: string;
  isMobileDisabled: boolean;
  isEmailDisabled: boolean;
  addressName: string;
  setCountryCode: Dispatch<SetStateAction<string>>;
  setAlternativeCountryCode: Dispatch<SetStateAction<string>>;
  setAlternativeCountryName: Dispatch<SetStateAction<string>>;
  setCountryName: Dispatch<SetStateAction<string>>;
  setAddressFeilds: Dispatch<SetStateAction<AddressType>>;
  setAddress: Dispatch<SetStateAction<string>>;
  getLocAddress: (
    data: {description: React.SetStateAction<string>; terms: string | any[]},
    details: any,
  ) => void;
  handleSubmit: () => void;
  loading: boolean;
  handleCameraImage: () => void;
  handleGalleryImage: () => void;
  isModalVisible: boolean;
  profileImage: ImageResponse | undefined;
  toggleModal: () => void;
  data: User;
  type: any;
  setConPassword: Dispatch<SetStateAction<string>>;

  setPassword: Dispatch<SetStateAction<string>>;

  conPassword: string;
  password: string;
};

const ProfileSetupView = ({
  setIsFocused,
  isFocused,
  setRoomNo,
  roomNo,
  setSelectedVen,
  selectedVen,
  setVendors,
  vendors,
  addressName,
  getLocAddress,
  setAddress,
  conPassword,
  password,
  setPassword,
  setConPassword,
  countryCode,
  handleCameraImage,
  handleGalleryImage,
  isModalVisible,
  profileImage,
  toggleModal,
  countryName,
  submitted,
  isMobileDisabled,
  isEmailDisabled,
  setCountryCode,
  values,
  setCountryName,
  setValues,
  handleSubmit,
  setAlternativeCountryCode,
  alternativeCountryName,
  setAlternativeCountryName,
  alternativeCountryCode,
  loading,
  type,
  data,
}: ProfileSetupPropTypes) => {
  return (
    <View style={{height: screenHeight}}>
      <Header title="" />
      <Loader loading={loading} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraScrollHeight={40}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={true}
        style={{height: screenHeight}}>
        <View style={styles.container}>
          <View style={styles.profileHead}>
            <Text fontFamily={fonts.BOLD} customStyle={{fontSize: 24}}>
              Profile Setup
            </Text>
            <Text customStyle={{fontSize: 12, color: '#A2A2A2', top: 4}}>
              Enter your details below
            </Text>
          </View>

          <View style={{alignItems: 'center', paddingTop: 0}}>
            <ImagePickerModal
              profileImage={profileImage?.image}
              handleCameraImage={handleCameraImage}
              handleGalleryImage={handleGalleryImage}
              isModalVisible={isModalVisible}
              toggleModal={toggleModal}
            />
          </View>

          <View style={{flex: 0.8}}>
            <Input
              value={values.firstName}
              onChange={(val: string) => {
                if (val === ' ' || val === '.') {
                } else {
                  setValues({...values, firstName: val});
                }
              }}
              autoCapitalize={'words'}
              error={
                !isString(values.firstName) ? 'Enter a valid name.' : undefined
              }
              placeholder="Name"
              highlighted={
                submitted &&
                (!isString(values.firstName) || !values?.firstName?.length)
              }
              maxLength={20}
            />
          

            <CountryPickerComponent
              showIcon={true}
              iconSource={data?.isPhoneVerified ? ICON_NAMES.verified : ''}
              placeholder="Phone"
              editable={!data?.isPhoneVerified}
              countryName={countryName}
              countryCode={countryCode}
              setCountryName={setCountryName}
              setCountryCode={setCountryCode}
              value={values.phoneNumber}
              onChange={(val: string) => {
                setValues({...values, phoneNumber: val.trim()});
              }}
              error={
                !isNumber(values.phoneNumber) || values.phoneNumber?.length < 7
                  ? 'Enter a valid phone number.'
                  : undefined
              }
              highlighted={
                submitted &&
                (!isNumber(values.phoneNumber) ||
                  values?.phoneNumber?.length < 7)
              }
              customContainerStyle={{borderBottomWidth: 0.9}}
            />

            <Input
              keyboardType={'email-address'}
              disabled={data?.isEmailVerified}
              value={values.email}
              onChange={(val: string) => {
                setValues({...values, email: val.trim()});
              }}
              autoCapitalize={'none'}
              placeholder="Enter Your Email"
              error={
                !IsValidEmail(values.email) ? 'Not a valid email.' : undefined
              }
              highlighted={
                submitted &&
                (!IsValidEmail(values.email) || !values?.email?.length)
              }
              showRightIcon
              customIconLeft={data?.isEmailVerified ? ICON_NAMES.verified : ''}
            />
            <CountryPickerComponent
              editable
              placeholder="Alternative Phone Number"
              countryName={alternativeCountryName}
              countryCode={alternativeCountryCode}
              setCountryName={setAlternativeCountryName}
              setCountryCode={setAlternativeCountryCode}
              value={values.alternativePhoneNo}
              onChange={(val: string) => {
                setValues({...values, alternativePhoneNo: val.trim()});
              }}
              error={
                !isNumber(values.alternativePhoneNo)
                  ? 'Enter a valid phone number.'
                  : undefined
              }
              customContainerStyle={{borderBottomWidth: 0.9}}
            />
            {type == 'google' ? (
              <View style={{}}>
                <View style={{}}>
                  <PlacesAutocomplete
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                    width={screenWidth / 1.1}
                    bottom={3}
                    borderBottomWidth={1}
                    addressFeilds={addressName}
                    getLocationData={getLocAddress}
                    setAddressFeilds={setAddress}
                    placeholder="Location"
                    highlighted={
                      (submitted && addressName == null) ||
                      (submitted && addressName == '')
                    }
                    containerStyle={{
                      width: screenWidth / 1.06,
                    }}
                    customContainerStyle={{
                      width: screenWidth / 2,
                      marginHorizontal: 30,
                      alignSelf: 'flex-start',
                      right: 15,
                      fontFamily: fonts.REGULAR,
                      fontSize: 14,
                    }}
                  />
                </View>
                <View style={{bottom: 20}}>
                  <CustomDropdown
                    highlighted={submitted && selectedVen == ''}
                    showLeftImage
                    setVendors={setVendors}
                    items={vendors}
                    value={selectedVen}
                    setValue={setSelectedVen}
                    placeholder="Campus Store"
                    bottom={true}
                  />
                </View>
                <View style={{bottom: 20}}>
                  <Input
                    maxLength={5}
                    keyboardType={'numeric'}
                    value={roomNo}
                    onChange={(val: any) => {
                      if (val !== '.' && val !== ' ' && val !== ',') {
                        setRoomNo(val);
                      } else {
                        setRoomNo('');
                      }
                    }}
                    // blackPlaceholder
                    placeholder="Room No"
                    error={
                      roomNo?.trim() == '' ? 'Enter your room no.' : undefined
                    }
                    highlighted={
                      submitted && (roomNo === '' || roomNo == undefined)
                    }
                    customContainerStyle={{borderBottomWidth: 0.9}}
                  />
                </View>
              </View>
            ) : null}
            {type !== 'google' ? (
              <View>
                <Input
                  value={password}
                  onChange={(val: string) => {
                    if (val === ' ' || val === '.') {
                    } else {
                      setPassword(val);
                    }
                  }}
                  // autoCapitalize={'words'}
                  error={
                    !isValidPassword(password)
                      ? 'Must contain 8 or more characters, one uppercase, one lowercase, one number and one special character.'
                      : undefined
                  }
                  isPasswordInput
                  placeholder="Password"
                  highlighted={
                    submitted &&
                    (!isValidPassword(password) || !password?.length)
                  }
                  maxLength={20}
                />

                <Input
                  value={conPassword}
                  onChange={(val: string) => {
                    if (val === ' ' || val === '.') {
                    } else {
                      setConPassword(val);
                    }
                  }}
                  isPasswordInput
                  // autoCapitalize={'words'}
                  error={
                    !conPassword?.length
                      ? 'Enter a valid password.'
                      : conPassword !== password
                      ? "Password doesn't match"
                      : undefined
                  }
                  placeholder="Confirm Password"
                  highlighted={
                    submitted &&
                    (!conPassword?.length || conPassword !== password)
                  }
                  maxLength={20}
                />
              </View>
            ) : null}
          </View>
          <View style={{paddingVertical: 50, bottom: 10}}>
            <Button
              customStyle={{
                borderRadius: 50,
              }}
              onPress={() => handleSubmit()}
              value="Submit"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 0,
    paddingHorizontal: 18,
    justifyContent: 'space-around',
  },
  profileHead: {
    paddingTop: 15,
  },
  profile: {
    width: 105,
    height: 105,
  },
  profileInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGrey,
    marginBottom: 5,
  },
});

export default ProfileSetupView;
