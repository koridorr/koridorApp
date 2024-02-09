import React, {Dispatch, SetStateAction} from 'react';
import {OtpInput, Button, Header} from '../../../widgets';
import {StyleSheet, View, Image, Alert} from 'react-native';
import {Text, Touchable} from '../../../components';
import {colors, fonts} from '../../../helpers/styles';
import Loader from '../../../widgets/Loader';
import {User} from '../../../types/User';

type OtpVerifyPropTypes = {
  otp: string;
  data: User;
  phone: boolean;
  method: string;
  loading: boolean;
  handleSubmitForVerifyOtp: () => void;
  resendOtpHandle: () => void;
  countDown: number;

  setOtp: Dispatch<SetStateAction<string>>;
};

const OtpVerifyView = ({
  otp,
  data,
  phone,
  method,
  loading,
  countDown,
  setOtp,
  resendOtpHandle,
  handleSubmitForVerifyOtp,
}: OtpVerifyPropTypes) => {
  return (
    <>
      <Header />
      <Loader loading={loading} />
      <View style={styles.container}>
        <Text customStyle={{fontSize: 24, fontWeight: 'bold', paddingTop: 30}}>
          Verify OTP
        </Text>
        <View style={{width: '100%'}}>
          <Text customStyle={{fontSize: 12, color: '#A2A2A2', paddingTop: 10}}>
            {!phone
              ? `Enter 4 digit code sent on your registered Email at ${data?.email}`
              : `Enter 4 digit code sent on your registered phone number at ${
                  data?.dialCode + ' ' + data?.phoneNo
                }`}
          </Text>
        </View>
        <View style={styles.otpView}>
          <OtpInput otp={otp} setOtp={setOtp} />
        </View>

        <View style={styles.confirmBtn}>
          <Button
            customStyle={{borderRadius: 50}}
            value="Continue"
            onPress={() => handleSubmitForVerifyOtp()}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {countDown === 0 ? (
            <Touchable style={{top: 5}} onPress={() => resendOtpHandle()}>
              <Text
                fontSize={16}
                color="#404040"
                customStyle={{textAlign: 'center', paddingTop: 15}}>
                Resend
              </Text>
            </Touchable>
          ) : null}
          {countDown !== 0 ? (
            <View style={{alignItems: 'flex-end', paddingTop: 20, right: 3}}>
              {countDown < 10 ? (
                <View style={{flexDirection: 'row'}}>
                  <Text fontSize={12}>The verify code will expire in</Text>
                  <Text
                    fontSize={12}
                    fontFamily={fonts.REGULAR}
                    color={colors.red}>
                    {`  00:0${countDown}`}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text fontSize={12} fontFamily={fonts.REGULAR}>
                    {`The verify code will expire in  00:${countDown}`}
                  </Text>
                </View>
              )}
            </View>
          ) : undefined}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 18,
  },
  confirmBtn: {
    paddingTop: 45,
  },
  otpView: {
    paddingTop: 40,
  },
});

export default OtpVerifyView;
