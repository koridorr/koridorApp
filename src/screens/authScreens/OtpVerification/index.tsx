import React, {useState, useEffect} from 'react';
import {
  usePostOtpVerifyMutation,
  usePostResendOtpMutation,
} from '../../../services/auth';

import {STORAGE_KEYS} from '../../../helpers/constants';
import {addKeyToStorage} from '../../../helpers/AsyncStorage';
import ShowToast from '../../../utils/Toast';
import {useAppDispatch} from '../../../hooks/store';
import {setCredentials} from '../../../reducers/authSlice';
import {generateEncryptedKey} from '../../../widgets/CryptoPrivacy';
import moment from 'moment';
import OtpVerificationView from './OtpVerificationView';

const OtpVerification = (props: any) => {
  const {data, phone, method} = props.route.params;

  const [otpVerification] = usePostOtpVerifyMutation();
  const [postResendOtp] = usePostResendOtpMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [countDown, setCountDown] = useState(30);
  const [otp, setOtp] = useState('');

  const handleSubmitForVerifyOtp = async () => {
    if (otp?.length !== 4) {
      ShowToast('Please enter 4 digit OTP');
    } else {
      let body = {};
      try {
        if (!data?.isPhoneVerified) {
          body = {
            phoneNo: data?.phoneNo || '',
            otp,
            dialCode: data?.dialCode || '',
            appkey: moment.utc().valueOf().toString(),
          };
        } else {
          body = {
            appkey: moment.utc().valueOf().toString(),

            email: data?.email || '',
            otp,
          };
        }
        console.log(body, '********body');

        const encryptedKey = generateEncryptedKey(body) || {sek: '', hash: ''};
        const encryptedBody = {
          sek: encryptedKey.sek || '',
          hash: encryptedKey.hash || '',
        };

        setLoading(true);
        const payload = await otpVerification(encryptedBody).unwrap();
        setLoading(false);

        if (payload.statusCode === 200) {
          const authToken = JSON.stringify(payload?.data?.accessToken);
          await addKeyToStorage(STORAGE_KEYS.token, authToken);
          ShowToast(payload?.message);
          dispatch(
            setCredentials({
              user: null,
              token: payload?.data?.accessToken || null,
            }),
          );
          props.navigation.replace(
            method === 'login'
              ? 'ProfileSetup'
              : method === 'Home'
              ? 'WelcomeScreen'
              : 'ResetPassword',
            {
              data: payload?.data,
              type: '',
            },
          );
        }
      } catch (error: any) {
        setLoading(false);
        ShowToast(error?.data?.message);
      }
    }
  };

  const resendOtpHandle = async () => {
    let body = {};
    if (!data?.isPhoneVerified) {
      body = {
        phoneNo: data?.phoneNo || '',
        dialCode: data?.dialCode || '',
        appkey: moment.utc().valueOf().toString(),
      };
    } else {
      body = {
        email: data.email || '',
        appkey: moment.utc().valueOf().toString(),
      };
    }
    console.log(body, '@@@body');

    const encryptedKey = generateEncryptedKey(body) || {sek: '', hash: ''};
    const encryptedBody = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };

    try {
      setLoading(true);
      const payload = await postResendOtp(encryptedBody).unwrap();
      setLoading(false);
      if (payload?.statusCode === 200) {
        setCountDown(30);
        ShowToast(payload.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const timeOut = () => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    } else {
      // setCountDown(0);
    }
  };

  useEffect(() => {
    timeOut();
  });

  return (
    <OtpVerificationView
      data={data}
      loading={loading}
      otp={otp}
      setOtp={setOtp}
      phone={phone}
      method={method}
      handleSubmitForVerifyOtp={handleSubmitForVerifyOtp}
      resendOtpHandle={resendOtpHandle}
      countDown={countDown}
    />
  );
};

export default OtpVerification;
