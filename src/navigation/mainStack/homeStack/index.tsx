import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StyleSheet} from 'react-native';
import {colors} from '../../../helpers/styles';
import Screens from '../../../screens';

const HomeStackNav = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <>
      <HomeStackNav.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: styles.container,
          animation: 'slide_from_right',
        }}>
        <HomeStackNav.Screen component={Screens.HomeScreen} name="HomeScreen" />
        <HomeStackNav.Screen
          component={Screens.SeeAllCategory}
          name="SeeAllCategory"
        />
        <HomeStackNav.Screen
          component={Screens.SeeAllRecentlyVisited}
          name="SeeAllRecentlyVisited"
        />
        <HomeStackNav.Screen
          component={Screens.SeeAllBestSelling}
          name="SeeAllBestSelling"
        />
        <HomeStackNav.Screen component={Screens.MyWishlist} name="MyWishlist" />
        <HomeStackNav.Screen
          component={Screens.Notification}
          name="Notification"
        />
        <HomeStackNav.Screen
          component={Screens.ChangeAddress}
          name="ChangeAddress"
        />
        <HomeStackNav.Screen
          component={Screens.SearchScreen}
          name="SearchScreen"
        />
        <HomeStackNav.Screen
          component={Screens.AllCategories}
          name="AllCategories"
        />
        <HomeStackNav.Screen
          component={Screens.FilterScreen}
          name="FilterScreen"
        />
      </HomeStackNav.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
});
