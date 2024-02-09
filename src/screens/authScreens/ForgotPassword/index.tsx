import React, {useState} from 'react';
import ForgotPasswordView from './ForgotPasswordView';
import {IsValidEmail, isValidPhoneNumber} from '../../../utils/Validations';
import ShowToast from '../../../utils/Toast';
import {navigate} from '../../../navigation';
import {usePostForgetPasswordMutation} from '../../../services/auth';
import {generateEncryptedKey} from '../../../widgets/CryptoPrivacy';
import moment from 'moment';

const ForgotPassword = (props: any) => {
  const {phone} = props.route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [postForgotPassword] = usePostForgetPasswordMutation();
  const [countryName, setCountryName] = useState('IN');
  const [withEmail, setWithEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const options = () => {
    setWithEmail(!withEmail);
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    if (!phone && !email.length || !phone && !IsValidEmail(email)) {
      ShowToast(`Please enter${email.length ===0?'':' a valid'} email`);
    } else if (phone && phoneNumber.length< 7) {
      ShowToast( `Please enter${phoneNumber.length===0?'':' a valid'} phone number`);
    } else {
      let data = {};

      if (!phone) {
        data = {
          email,
          isForget: true,
          appkey: moment.utc().valueOf().toString(),
        };
      } else {
        data = {
          phoneNo: phoneNumber,
          dialCode: countryCode,
          isForget: true,
          isoCode: countryName,
          appkey: moment.utc().valueOf().toString(),
        };
      }

      const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
      const body = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      try {
        setLoading(true);
        const payload = await postForgotPassword(body).unwrap();

        setLoading(false);
        if (payload.statusCode === 200) {
          navigate('OtpVerify', {
            phone: phone,
            data: data,
            method: 'forgotPassword',
          });
          ShowToast(payload?.message || '');
        }
      } catch (error: any) {
        setLoading(false);
        ShowToast(error?.data?.message || 'Please try again');
      }
    }
  };

  return (
    <ForgotPasswordView
      loading={loading}
      submitted={submitted}
      countryName={countryName}
      countryCode={countryCode}
      setCountryName={setCountryName}
      setCountryCode={setCountryCode}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      handleSubmit={handleSubmit}
      options={options}
      withEmail={withEmail}
      setEmail={setEmail}
      email={email}
      phone={phone}
    />
  );
};

export default ForgotPassword;
