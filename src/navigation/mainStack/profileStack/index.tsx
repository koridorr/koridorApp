import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StyleSheet} from 'react-native';
import {colors} from '../../../helpers/styles';
import Screens from '../../../screens';

const ProfileStackNav = createNativeStackNavigator();

export const ProfileStack = () => {
  return (
    <>
      <ProfileStackNav.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: styles.container,
          animation: 'slide_from_right',
        }}>
        <ProfileStackNav.Screen
          component={Screens.ProfileScreen}
          name="ProfileScreen"
        />
        <ProfileStackNav.Screen
          component={Screens.ContactUs}
          name="ContactUs"
        />
        <ProfileStackNav.Screen
          component={Screens.TermsAndConditions}
          name="TermsAndConditions"
        />
        <ProfileStackNav.Screen
          component={Screens.MyAddresses}
          name="MyAddresses"
        />
        <ProfileStackNav.Screen
          component={Screens.ManageLocation}
          name="ManageLocation"
        />
        <ProfileStackNav.Screen
          component={Screens.AddAddress}
          name="AddAddress"
        />
        <ProfileStackNav.Screen
          component={Screens.PaymentMethods}
          name="PaymentMethods"
        />
        <ProfileStackNav.Screen
          component={Screens.AddNewCard}
          name="AddNewCard"
        />
        <ProfileStackNav.Screen
          component={Screens.PrivacyPolicy}
          name="PrivacyPolicy"
        />
        <ProfileStackNav.Screen component={Screens.Faqs} name="Faqs" />
        <ProfileStackNav.Screen
          component={Screens.EditProfile}
          name="EditProfile"
        />
        <ProfileStackNav.Screen
          component={Screens.ChangePassword}
          name="ChangePassword"
        />
      </ProfileStackNav.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
});
