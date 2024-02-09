import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Header, Input} from '../../../../../widgets';
import {colors, screenHeight} from '../../../../../helpers/styles';
import {navigate} from '../../../../../navigation';
import React,{Dispatch, SetStateAction} from 'react';
import {
  isValidComparedPassword,
  isValidPassword,
} from '../../../../../utils/Validations';
import Loader from '../../../../../widgets/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type ValueTypes = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ValueTypesProps = {
  values: ValueTypes;
  loading: boolean;
  submitted: boolean;
  setValues: Dispatch<SetStateAction<ValueTypes>>;
  handleSubmit: () => void;
};

export const ChangePasswordView = ({
  setValues,
  values,
  submitted,
  handleSubmit,
  loading,
}: ValueTypesProps) => {
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Header title="Change Password" />
      <KeyboardAvoidingView
        style={{flexGrow: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{height:screenHeight/1.3}}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 15,
            paddingBottom: Platform.OS === 'ios' ? 0 : 15,
          }}>
          <View style={{width: '100%', paddingVertical: 5, flex: 1}}>
            <View style={{paddingVertical: 5}}>
              <Input
                value={values.currentPassword}
                onChange={(val: string) => {
                  setValues({...values, currentPassword: val.trim()});
                }}
                placeholder="Current Password"
                error={
                  !isValidPassword(values.currentPassword)
                    ? 'Enter a valid password'
                    : undefined
                }
                isPasswordInput
                highlighted={
                  submitted &&
                  (!isValidPassword(values.currentPassword) ||
                    !values?.currentPassword?.length)
                }
                
              />
            </View>
            <View style={{paddingVertical: 5}}>
              <Input
                value={values.newPassword}
                onChange={(val: string) => {
                  setValues({...values, newPassword: val.trim()});
                }}
                placeholder="New Password"
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
              
              />
            </View>
            <View style={{paddingVertical: 5}}>
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
              
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => handleSubmit()} value="Update" />
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },

  buttonContainer: {
    width: '100%',
    paddingTop: 40,
  },
});
