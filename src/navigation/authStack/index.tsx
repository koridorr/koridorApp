import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Screens from '../../screens';

import {colors} from '../../helpers/styles';
import {StyleSheet} from 'react-native';

const AuthStackNav = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <AuthStackNav.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: styles.container,
        animation: 'slide_from_right',
      }}
      initialRouteName="Splash">
      <AuthStackNav.Screen component={Screens.Splash} name="Splash" />
      <AuthStackNav.Screen component={Screens.SignUp} name="SignUp" />
      <AuthStackNav.Screen component={Screens.OtpVerify} name="OtpVerify" />
      <AuthStackNav.Screen
        component={Screens.OtpVerification}
        name="OtpVerification"
      />

      <AuthStackNav.Screen
        component={Screens.ProfileSetup}
        name="ProfileSetup"
      />
      <AuthStackNav.Screen
        component={Screens.WelcomeScreen}
        name="WelcomeScreen"
      />

      <AuthStackNav.Screen
        component={Screens.ForgotPassword}
        name="ForgotPassword"
      />
      <AuthStackNav.Screen
        component={Screens.ResetPassword}
        name="ResetPassword"
      />
    </AuthStackNav.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
});
