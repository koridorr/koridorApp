import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import {PlacesAutocomplete, Text, Touchable} from '../../../components';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../helpers/styles';
import {Button, CustomDropdown, Dropdown, Input} from '../../../widgets';
import CheckBox from '../../../widgets/Checkbox';
import {ICON_NAMES, IMAGE_NAMES} from '../../../helpers/constants';
import {navigate, replace} from '../../../navigation';
import FastImage from 'react-native-fast-image';
import {
  IsValidEmail,
  isNumber,
  isValidPassword,
} from '../../../utils/Validations';
import {CountryPickerComponent} from '../../../components/CountryPickerComponent';
import Loader from '../../../widgets/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type SignUpViewPropType = {
  setChecked: Dispatch<SetStateAction<boolean>>;
  setWithEmail: Dispatch<SetStateAction<boolean>>;
  setLogin: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setCountryName: Dispatch<SetStateAction<string>>;
  setCountryCode: Dispatch<SetStateAction<string>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  toggleSwitch: () => void;
  _isGoogleLogin: () => void;
  setAddress: Dispatch<SetStateAction<string>>;
  addressName: string;
  getLocAddress: (
    data: {description: React.SetStateAction<string>; terms: string | any[]},
    details: any,
  ) => void;
  loginOption: () => void;
  handleSubmitForPhone: () => void;
  handleSubmitForEmail: () => void;
  onAppleButtonPress: () => void;
  loginHandler: () => void;
  isChecked: boolean;
  withEmail: boolean;
  isEnabled: boolean;
  login: boolean;
  email: string;
  phoneNumber: string;
  countryName: string;
  countryCode: string;
  submitted: boolean;
  password: string;
  loading: boolean;
  isVisited: boolean;
  selectedVen: string;
  setVendors: Dispatch<SetStateAction<never[]>>;
  setSelectedVen: Dispatch<SetStateAction<string>>;
  vendors: {label: string; value: string}[];
  roomNo: string | undefined;
  setRoomNo: Dispatch<SetStateAction<string | undefined>>;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
};

const SignUpView = ({
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
  isChecked,
  email,
  password,
  submitted,
  phoneNumber,
  countryName,
  countryCode,
  login,
  isEnabled,
  withEmail,
  loading,
  setCountryName,
  setCountryCode,
  setPhoneNumber,
  setChecked,
  setEmail,
  toggleSwitch,
  setPassword,
  loginOption,
  setWithEmail,
  handleSubmitForPhone,
  handleSubmitForEmail,
  loginHandler,
  onAppleButtonPress,
  _isGoogleLogin,
}: SignUpViewPropType) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Loader loading={loading} />
        <View style={{alignItems: 'center', paddingBottom: 40}}>
          <FastImage
            source={IMAGE_NAMES.logo}
            style={{
              width: screenWidth / 4.6,
              height: screenHeight / 8,
              top: 5,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.tabContainer}>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
              }}>
              <Touchable
                onPress={() => setWithEmail(true)}
                style={{
                  justifyContent: 'center',
                  width: screenWidth / 2.5,
                  alignItems: 'center',
                  height: screenHeight / 17,
                  borderRadius: 50,
                  backgroundColor: withEmail ? colors.white : colors.black,
                }}>
                <Text
                  fontSize={15}
                  customStyle={{
                    color: !withEmail ? colors.white : colors.black,
                  }}>
                  Email
                </Text>
              </Touchable>

              <Touchable
                onPress={() => setWithEmail(false)}
                style={{
                  justifyContent: 'center',
                  width: screenWidth / 2.5,
                  alignItems: 'center',
                  height: screenHeight / 17,
                  borderRadius: 50,
                  backgroundColor: !withEmail ? colors.white : colors.black,
                }}>
                <Text
                  fontSize={15}
                  customStyle={{
                    color: withEmail ? colors.white : colors.black,
                  }}>
                  Phone number
                </Text>
              </Touchable>
            </View>
          </View>
        </View>

        <View style={{paddingTop: 30}}>
          {withEmail ? (
            <View>
              <Input
                keyboardType={'email-address'}
                value={email}
                onChange={(val: string) => {
                  if (val === ' ' || val === '.') {
                  } else {
                    setEmail(val.trim());
                  }
                }}
                error={!IsValidEmail(email) ? 'Not a valid email.' : undefined}
                customIconLeft={IMAGE_NAMES.mail}
                showLeftIcon
                blackPlaceholder
                placeholder="Email"
                customContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 12,
                  paddingLeft: 7,
                }}
              />
            </View>
          ) : (
            <View style={{}}>
              <CountryPickerComponent
                fullBorder={true}
                editable
                countryName={countryName}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                setCountryName={setCountryName}
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={(val: string) => {
                  if (isNumber(val)) {
                    setPhoneNumber(val.trim());
                  }
                }}
                error={
                  !isNumber(phoneNumber) || phoneNumber?.length < 7
                    ? 'Enter a valid phone number'
                    : undefined
                }
                // customContainerStyle={{
                //   paddingVertical: Platform.OS === 'android' ? 0 : 2,
                // }}
              />
            </View>
          )}
        </View>
        {!login ? (
          <View style={{paddingTop: withEmail ? 5 : 10}}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 12,
                borderColor: isFocused ? colors.green : '#F3F3F3',
                flexDirection: 'row',
              }}>
              <FastImage
                source={ICON_NAMES.locations}
                resizeMode="contain"
                style={{
                  height: 48,
                  width: 45,
                  alignSelf: 'flex-start',
                  left: 7,
                  top: 6,
                }}
              />
              <View style={{left: 6}}>
                <PlacesAutocomplete
                  addressFeilds={addressName}
                  getLocationData={getLocAddress}
                  setAddressFeilds={setAddress}
                  placeholder="Country,State,City"
                  highlighted={
                    (submitted && addressName == null) ||
                    (submitted && addressName == '')
                  }
                  borderBottomWidth={0}
                  containerStyle={{
                    width: screenWidth / 1.3,
                    height:
                      Platform.OS == 'ios'
                        ? screenHeight / 18
                        : screenHeight / 15.5,
                    top: 2,
                  }}
                  customContainerStyle={{
                    width: screenWidth / 2,
                    marginHorizontal: 30,
                    alignSelf: 'flex-start',
                    right: 15,
                    fontFamily: fonts.REGULAR,
                    fontSize: 14,
                    backgroundColor: 'green',
                  }}
                />
              </View>
            </View>
            <View style={{paddingTop: 10, flex: 1}}>
              <CustomDropdown
                showLeftImage
                setVendors={setVendors}
                items={vendors}
                value={selectedVen}
                setValue={setSelectedVen}
                placeholder="Campus Store"
                bottom={false}
              />
            </View>
            <View style={{paddingTop: 10}}>
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
                blackPlaceholder
                placeholder="Room No"
                customContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 12,
                  paddingLeft: 7,
                }}
                customInputStyle={{left: 8}}
              />
            </View>
          </View>
        ) : null}
        {login ? (
          <View style={{paddingTop: 10}}>
            <Input
              blackPlaceholder
              value={password}
              onChange={(val: string) => {
                setPassword(val.trim());
              }}
              showLeftIcon
              customIconLeft={IMAGE_NAMES.lock}
              placeholder="Password"
              error={
                !isValidPassword(password) && !login
                  ? 'Must contain 8 or more characters, one uppercase, one lowercase, one number and one special character.'
                  : undefined
              }
              isPasswordInput
              customContainerStyle={{
                borderWidth: 1,
                // borderColor: '#F3F3F3',
                borderRadius: 12,
                paddingLeft: 7,
              }}
            />
          </View>
        ) : null}

        {login ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
              paddingTop: 20,
            }}>
            <View style={{flexDirection: 'row', right: 4}}>
              <Switch
                style={{
                  transform:
                    Platform.OS === 'android'
                      ? [{scaleX: 1}, {scaleY: 1}]
                      : [{scaleX: 0.8}, {scaleY: 0.8}],
                }}
                thumbColor={colors.black}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                Remember me
              </Text>
            </View>
            <View>
              <Touchable
                onPress={() =>
                  navigate('ForgotPassword', {phone: withEmail ? false : true})
                }>
                <Text fontSize={14} fontFamily={fonts.REGULAR}>
                  Forgot Password?
                </Text>
              </Touchable>
            </View>
          </View>
        ) : null}
        {!login ? (
          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={isChecked}
              setChecked={() => setChecked(!isChecked)}
            />
            <Text
              customStyle={{left: 5}}
              fontFamily={fonts.REGULAR}
              color="#9D9D9D"
              fontSize={14}>
              I accept all the
            </Text>
            <Touchable
              onPress={() =>
                navigate('MainFlow', {
                  screen: 'ProfileStack',
                  params: {
                    screen: 'TermsAndConditions',
                    data: 'signup',
                  },
                })
              }>
              <Text
                fontFamily={fonts.REGULAR}
                customStyle={{left: 8}}
                fontSize={14}>
                Terms & Conditions
              </Text>
            </Touchable>
          </View>
        ) : null}
        <View style={{paddingTop: 30}}>
          {!login ? (
            <Button
              value="Sign Up"
              onPress={withEmail ? handleSubmitForEmail : handleSubmitForPhone}
              customStyle={styles.signupBtn}
            />
          ) : (
            <Button
              value="Log In"
              onPress={() => loginHandler()}
              customStyle={styles.signupBtn}
            />
          )}
        </View>
        <View style={styles.orTextContainer}>
          <View style={styles.horizontalLine} />
          <View
            style={{
              width: '40%',
              display: 'flex',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Text fontSize={14} color="#A2A2A2">
              Or continue with
            </Text>
          </View>
          <View style={styles.horizontalLine} />
        </View>
        <View style={styles.socialIcons}>
          {/* <Touchable onPress={() => {}} style={styles.socialButton}>
            <Image
              resizeMode="contain"
              style={styles.icons}
              source={IMAGE_NAMES.faceBook}
            />
          </Touchable> */}

          <Touchable
            onPress={() => _isGoogleLogin()}
            style={styles.socialButton}>
            <Image
              resizeMode="contain"
              style={styles.icons}
              source={IMAGE_NAMES.google}
            />
          </Touchable>
          {Platform.OS === 'ios' ? (
            <Touchable
              onPress={() => onAppleButtonPress()}
              style={styles.socialButton}>
              <Image
                resizeMode="contain"
                style={styles.icons}
                source={IMAGE_NAMES.apple}
              />
            </Touchable>
          ) : undefined}
        </View>
        <Touchable
          onPress={loginOption}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 50,
            paddingVertical: 30,
          }}>
          <Text color="#9D9D9D" fontSize={14}>
            {!login ? ' Already have an account?' : "Don't have an account?"}
          </Text>
          <View style={{left: 5}}>
            <Text fontSize={14}>{!login ? 'Log In' : 'Sign Up'}</Text>
          </View>
        </Touchable>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 10,
    marginTop: 15,
    justifyContent: 'space-around',
  },
  buttons: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.black,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingTop: 20,
    left: 2,
  },
  tabButton: {
    width: 150,
    backgroundColor: colors.white,
    borderRadius: 50,
    paddingVertical: 10,
  },
  signupBtn: {
    width: '100%',
    paddingHorizontal: 'auto',
    borderRadius: 50,
    marginBottom: 20,
  },

  textField: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 12,
  },
  horizontalLine: {
    borderBottomWidth: 0.8,
    width: '30%',
    borderBottomColor: '#10365C33',
  },
  orTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continue: {
    textAlign: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 25,
    height: 25,
    marginHorizontal: 8,
  },

  tabContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    width: '100%',
    height: screenHeight / 14,
    borderRadius: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },

  socialButton: {
    padding: 12,
    borderWidth: 0.8,
    height: 52,
    width: 52,
    borderRadius: 25,
    alignItems: 'center',
    margin: 10,
    borderColor: '#10365C33',
  },
});
export default SignUpView;
