import React, {Dispatch, SetStateAction} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  ImagePickerModal,
  Text,
  Touchable,
  PlacesAutocomplete,
} from '../../../../components';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {CountryPickerComponent} from '../../../../components/CountryPickerComponent';
import {Button, CustomDropdown, Input} from '../../../../widgets';
import {goBack, navigate} from '../../../../navigation';
import {IsValidEmail, isNumber, isString} from '../../../../utils/Validations';
import {ImageResponse, User} from '../../../../types/User';
import Loader from '../../../../widgets/Loader';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useAuth from '../../../../hooks/useAuth';

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
  submitCampus: boolean;
  alternativeCountryCode: string;
  alternativeCountryName: string;
  countryName: string;
  countryCode: string;
  addressName: string;
  setCountryCode: Dispatch<SetStateAction<string>>;
  setAlternativeCountryCode: Dispatch<SetStateAction<string>>;
  setAlternativeCountryName: Dispatch<SetStateAction<string>>;
  setCountryName: Dispatch<SetStateAction<string>>;
  handleSubmit: () => void;
  updateCampus: () => void;
  loading: boolean;
  handleCameraImage: () => void;
  handleGalleryImage: () => void;
  isModalVisible: boolean;
  profileImage: ImageResponse | undefined;
  toggleModal: () => void;
  userData: User | undefined;
  // setAddressFeilds: Dispatch<SetStateAction<AddressType>>;
  setAddress: Dispatch<SetStateAction<string>>;
  getLocAddress: (
    data: {description: React.SetStateAction<string>; terms: string | any[]},
    details: any,
  ) => void;
  selectedVen: string;
  setVendors: Dispatch<SetStateAction<any>>;
  setSelectedVen: Dispatch<SetStateAction<string>>;
  vendors: {label: string; value: string}[];
  roomNo: string | undefined;
  setRoomNo: Dispatch<SetStateAction<string | undefined>>;
};

const EditProfileView = ({
  setVendors,
  selectedVen,
  setSelectedVen,
  vendors,
  roomNo,
  setRoomNo,
  countryCode,
  handleCameraImage,
  handleGalleryImage,
  isModalVisible,
  profileImage,
  toggleModal,
  countryName,
  submitted,
  setCountryCode,
  values,
  setCountryName,
  userData,
  setValues,
  handleSubmit,
  setAlternativeCountryCode,
  alternativeCountryName,
  setAlternativeCountryName,
  alternativeCountryCode,
  loading,
  setAddress,
  addressName,
  getLocAddress,
  updateCampus,
  submitCampus,
}: ProfileSetupPropTypes) => {
  const user = useAuth();

  return (
    <View style={{height: screenHeight}}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Touchable onPress={() => goBack()}>
            <FastImage
              source={IMAGE_NAMES.arrow_left}
              style={{height: 25, width: 25, right: 7}}
              resizeMode="contain"
            />
          </Touchable>
          <Text fontSize={18} fontFamily={fonts.BOLD}>
            Edit Profile
          </Text>
        </View>
      </View>
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
          <View style={{alignItems: 'center'}}>
            <ImagePickerModal
              profileImage={profileImage?.image}
              handleCameraImage={handleCameraImage}
              handleGalleryImage={handleGalleryImage}
              isModalVisible={isModalVisible}
              toggleModal={toggleModal}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text fontFamily={fonts.BOLD} fontSize={14}>
              Add Profile Picture
            </Text>
          </View>
          <View>
            <Input
              value={values.firstName || ''}
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
              customContainerStyle={
                submitted
                  ? {
                      borderBottomWidth: 0.9,
                      borderBottomColor:
                        submitted &&
                        (!isString(values.firstName) ||
                          !values?.firstName?.length)
                          ? colors.red
                          : colors.lightGrey,
                      marginBottom: 5,
                    }
                  : {
                      borderBottomWidth: 0.9,
                      marginBottom: 5,
                    }
              }
            />

            <CountryPickerComponent
              showIcon={true}
              iconSource={userData?.isPhoneVerified ? ICON_NAMES.checked : ''}
              placeholder="Phone"
              editable={!userData?.isPhoneVerified}
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
              customContainerStyle={
                submitted
                  ? {
                      borderBottomWidth: 0.9,
                      borderBottomColor:
                        submitted &&
                        (!isNumber(values.phoneNumber) ||
                          !values?.phoneNumber?.length)
                          ? colors.red
                          : colors.lightGrey,
                      marginBottom: 5,
                    }
                  : {
                      borderBottomWidth: 0.9,
                      marginBottom: 5,
                    }
              }
            />

            <Input
              disabled={userData?.isEmailVerified}
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
              customContainerStyle={
                submitted
                  ? {
                      borderBottomWidth: 0.9,
                      borderBottomColor:
                        (submitted && !IsValidEmail(values.email)) ||
                        !values?.email?.length
                          ? colors.red
                          : colors.lightGrey,
                    }
                  : {
                      borderBottomWidth: 0.9,
                    }
              }
              showRightIcon
              customIconLeft={
                userData?.isEmailVerified === true ? ICON_NAMES.checked : ''
              }
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
            />
          </View>
          <View>
            <PlacesAutocomplete
              addressFeilds={addressName}
              getLocationData={getLocAddress}
              setAddressFeilds={setAddress}
              placeholder="Country,State,City"
              highlighted={
                (submitted && addressName == null) ||
                (submitted && addressName == '')
              }
              borderBottomWidth={1}
              containerStyle={{}}
            />
          </View>

          <View
            style={{
              paddingTop: 40,
            }}>
            <Button
              onPress={() => handleSubmit()}
              customStyle={{
                borderRadius: 50,
              }}
              value="Update"
            />
          </View>
        </View>

        <View style={{paddingTop: 20, paddingHorizontal: 11}}>
          <View style={{}}>
            <CustomDropdown
              bottom
              items={vendors}
              value={selectedVen}
              setValue={setSelectedVen}
              placeholder="Campus Store"
              setVendors={setVendors}
              showLeftImage={false}
            />
          </View>
          <View style={{}}>
            <Input
              keyboardType={'numeric'}
              value={roomNo}
              onChange={(val: any) => {
                if (val !== '.' && val !== ' ' && val !== ',') {
                  setRoomNo(val);
                } else {
                  setRoomNo('');
                }
              }}
              highlighted={
                submitCampus && (roomNo == undefined || !roomNo?.length)
              }
              blackPlaceholder
              placeholder="Room No"
              customContainerStyle={{
                borderBottomWidth: 1,
                borderRadius: 12,
                paddingLeft: 7,
              }}
            />
          </View>
        </View>
        <View
          style={{
            paddingTop: 40,
            paddingHorizontal: 15,
          }}>
          <Button
            onPress={() => updateCampus()}
            customStyle={{
              borderRadius: 50,
            }}
            value="Update Campus"
          />
        </View>
        <View style={{paddingVertical: 20}}>
          {user && !user?.isSocialLogin ? (
            <Touchable
              onPress={() => {
                navigate('ChangePassword', undefined);
              }}
              style={{
                backgroundColor: '#F7FFE9',
                alignItems: 'center',
                marginTop: 30,
                height: 50,
                justifyContent: 'center',
                bottom: Platform.OS === 'ios' ? 45 : 40,
              }}>
              <Text
                customStyle={{textDecorationLine: 'underline'}}
                fontSize={14}>
                Change Password
              </Text>
            </Touchable>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 18,
    justifyContent: 'space-around',
  },
  profileHead: {
    paddingTop: 40,
  },
  profile: {
    width: 140,
    height: 140,
  },
  profileInput: {
    borderBottomWidth: 0.4,
    borderBottomColor: colors.grey,
    marginVertical: 2,
  },
  header: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditProfileView;
