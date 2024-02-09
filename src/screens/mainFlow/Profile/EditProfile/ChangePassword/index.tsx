import {useState} from 'react';
import {ChangePasswordView} from './ChangePasswordView';
import {navigate} from '../../../../../navigation';
import ShowToast from '../../../../../utils/Toast';
import {useChangePasswordPasswordMutation} from '../../../../../services/auth';
import {IsValidEmail, isValidPassword} from '../../../../../utils/Validations';
import { generateEncryptedKey } from '../../../../../widgets/CryptoPrivacy';
import moment from 'moment';

const ChangePassword = (props: any) => {
  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [postChangePassword] = useChangePasswordPasswordMutation();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!values?.currentPassword?.length) {
      ShowToast('Please enter current password');
    } else if (
      !values?.newPassword.length ||
      !isValidPassword(values?.newPassword)
    ) {
      ShowToast('Please enter new password');
    } else if (
      !values.currentPassword.length ||
      values.newPassword !== values.confirmPassword
    ) {
      ShowToast(
        !values.currentPassword.length
          ? 'Please enter password'
          : "Password doesn't match",
      );
    } else if (values.currentPassword === values.newPassword) {
      ShowToast('New password cannot be same as old password.');
    } else {
      const body = {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
   appkey: moment.utc().valueOf().toString()

      };
      const encryptedKey = generateEncryptedKey(body) || {sek:'' , hash:'' };
      const encryptedBody = {
        sek: encryptedKey.sek || '' ,
        hash: encryptedKey.hash  || '',
      } ;
      try {
        setLoading(true);
        const payload = await postChangePassword(encryptedBody).unwrap();
        setLoading(false);

        if (payload?.statusCode === 200) {
          navigate('ProfileScreen', undefined);
          ShowToast(payload?.message);
        }
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        ShowToast(error?.data?.message || '');
      }
    }
  };

  return (
    <ChangePasswordView
      values={values}
      setValues={setValues}
      handleSubmit={handleSubmit}
      loading={loading}
      submitted={submitted}
    />
  );
};

export default ChangePassword;
