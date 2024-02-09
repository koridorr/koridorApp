import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {colors} from '../../helpers/styles';
import {StyleSheet} from 'react-native';
import {BottomBar} from '../../components';
import {HomeStack} from './homeStack';
// import { BookingsStack } from './bookingsStack';
// import { NotificationsStack } from './notificationsStack';
import {ProfileStack} from './profileStack';
import {OrderStack} from './orderStack';

const MainStackNav = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <>
      <MainStackNav.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: styles.container,
          animation: 'fade',
        }}
        initialRouteName="HomeScreen">
        <MainStackNav.Screen component={HomeStack} name="HomeStack" />
        <MainStackNav.Screen component={ProfileStack} name="ProfileStack" />
        <MainStackNav.Screen component={OrderStack} name="OrderStack" />
        {/* <MainStackNav.Screen
          component={NotificationsStack}
          name="NotificationsStack"
        /> */}
      </MainStackNav.Navigator>
      <BottomBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
});
