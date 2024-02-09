import React, {Dispatch, SetStateAction} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, Touchable} from '../../../components';
import {IMAGE_NAMES} from '../../../helpers/constants';
import {colors} from '../../../helpers/styles';
import {goBack, navigate} from '../../../navigation';
import {Button, Header, Input} from '../../../widgets';
import {CountryPickerComponent} from '../../../components/CountryPickerComponent';
import {IsValidEmail, isNumber} from '../../../utils/Validations';
import Loader from '../../../widgets/Loader';

type ViewPropTypes = {
  submitted: boolean;
  loading: boolean;
  setCountryName: Dispatch<SetStateAction<string>>;
  setCountryCode: Dispatch<SetStateAction<string>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  countryName: string;
  countryCode: string;
  phoneNumber: string;
  handleSubmit: () => void;
  options: () => void;
  withEmail: boolean;
  email: string;
  phone:boolean
};

const ForgotPasswordView = ({
  loading,
  submitted,
  email,
  withEmail,
  countryName,
  countryCode,
  phoneNumber,
  setCountryName,
  setCountryCode,
  setPhoneNumber,
  handleSubmit,
  options,
  setEmail,
  phone,
}: ViewPropTypes) => {
  return (
    <>
      <Header />
      <Loader loading={loading} />
      <View style={styles.container}>
        <View>
          <Text
            customStyle={{fontSize: 25, fontWeight: 'bold', paddingTop: 20}}>
            Forgot Password
          </Text>
          <Text customStyle={{fontSize: 12, color: colors.grey}}>
            {`Enter your ${phone ? 'Phone number' : 'email'} to verify your account`}
          </Text>
        </View>
        {!phone ? (
          <View style={{paddingTop: 10}}>
            <Input
              keyboardType={'email-address'}
              value={email}
              onChange={(val: string) => {
                if (val === ' ' || val === '.') {
                } else {
                  setEmail(val.trim());
                }
              }}
              // highlighted={
              //   submitted && (!IsValidEmail(email) || !email?.length)
              // }
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
          <View style={{paddingTop: 10}}>
            <CountryPickerComponent
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
                !isNumber(phoneNumber) ||phoneNumber?.length <7
                  ? 'Enter a valid phone number'
                  : undefined
              }
              customContainerStyle={
                {  borderBottomWidth: 0.9}
              }
            />
          </View>
        )}

   
        <View style={{paddingTop: 100}}>
          <Button
            customStyle={{borderRadius: 50}}
            onPress={() => handleSubmit()}
            value="Continue"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 15,
  },
});

export default ForgotPasswordView;
