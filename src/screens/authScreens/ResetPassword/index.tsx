import React, {useState} from 'react';
import ResetPasswordView from './ResetPasswordView';
import ShowToast from '../../../utils/Toast';
import {navigate} from '../../../navigation';
import {usePostResetPasswordMutation} from '../../../services/auth';
import {generateEncryptedKey} from '../../../widgets/CryptoPrivacy';
import {getKeyFromStorage} from '../../../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../../../helpers/constants';
import moment from 'moment';

const ResetPassword = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [postResetPassword] = usePostResetPasswordMutation();
  const [values, setValues] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async () => {
    setSubmitted(true);
    if (values.newPassword !== values.confirmPassword) {
      ShowToast(
        !values.newPassword.length
          ? 'Please enter password'
          : "Password doesn't match",
      );
    } else if (!values?.newPassword?.length || !values?.newPassword?.length) {
      ShowToast('Marked fields are required !');
    } else {
      const body = {
        newPassword: values.newPassword,
        appkey: moment.utc().valueOf().toString(),
      };
      const encryptedKey = generateEncryptedKey(body) || {sek: '', hash: ''};
      const encryptedBody = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      try {
        setLoading(true);
        const payload = await postResetPassword(encryptedBody).unwrap();
        setLoading(false);
        const isVisited = await getKeyFromStorage(STORAGE_KEYS.appVisited);

        if (payload?.statusCode === 200) {
          props.navigation.replace('SignUp', {isVisited});
        }
        ShowToast(payload?.message || '');
      } catch (error: any) {
        setLoading(false);
        ShowToast(error?.data?.message || '');
      }
    }
  };

  return (
    <ResetPasswordView
      values={values}
      setValues={setValues}
      loading={loading}
      submitted={submitted}
      handleSubmit={handleSubmit}
    />
  );
};

export default ResetPassword;
