import React, {Dispatch, SetStateAction} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, Touchable} from '../../../components';
import {colors, fonts} from '../../../helpers/styles';
import {goBack, navigate} from '../../../navigation';
import {Button, Header, Input} from '../../../widgets';
import {
  isValidComparedPassword,
  isValidPassword,
} from '../../../utils/Validations';
import Loader from '../../../widgets/Loader';

type ValueTypes = {
  newPassword: string;
  confirmPassword: string;

};

type ViewTypesProps = {
  values: ValueTypes;
  loading: boolean;
  submitted: boolean;
  setValues: Dispatch<SetStateAction<ValueTypes>>;
  handleSubmit: () => void;
  
};

const ResetPasswordView = ({
  values,
  setValues,
  loading,
  submitted,
  handleSubmit,
  
}: ViewTypesProps) => {
  return (
    <>
      <Header title="" />
      <Loader loading={loading} />
      <View style={styles.container}>
        <View style={{flex: 0}}>
          <Text
            fontFamily={fonts.BOLD}
            customStyle={{fontSize: 24, paddingTop: 20}}>
            Reset Password
          </Text>
          <Text customStyle={{fontSize: 12, color: colors.grey}}>
            Set your new password to access your account
          </Text>
        </View>
        <View style={{paddingTop: 0, flex: 0}}>
          <Input
            value={values.newPassword}
            onChange={(val: string) => {
              setValues({...values, newPassword: val.trim()});
            }}
            placeholder="Enter New Password"
            error={
              !isValidPassword(values.newPassword)
                ? 'Must contain 8 or more characters, one uppercase, one lowercase, one number and one special character.'
                : undefined
            }
            isPasswordInput
            highlighted={
              submitted &&
              (!isValidPassword(values.newPassword) ||
                !values?.newPassword?.length)
            }
            customContainerStyle={{
              borderBottomWidth: 0.5,
              marginTop: 10,
            }}
          />
          <Input
            value={values.confirmPassword}
            onChange={(val: string) => {
              setValues({...values, confirmPassword: val.trim()});
            }}
            placeholder="Confirm New Password"
            error={
              isValidComparedPassword(
                values.newPassword,
                values.confirmPassword,
              )
                ? 'Passwords must match'
                : undefined
            }
            isPasswordInput
            highlighted={
              submitted &&
              (!isValidPassword(values.confirmPassword) ||
                !values?.confirmPassword?.length)
            }
            customContainerStyle={{
              borderBottomWidth: 0.5,
              marginTop: 10,
            }}
          />
        </View>
        <View style={{paddingTop: 35, flex: 0}}>
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
    // flex: 1,
    margin: 0,
    paddingHorizontal: 15,
    // justifyContent: 'space-between',
  },
});

export default ResetPasswordView;
