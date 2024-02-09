import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StyleSheet} from 'react-native';
import {colors} from '../../../helpers/styles';
import Screens from '../../../screens';

const OrderStackNav = createNativeStackNavigator();

export const OrderStack = () => {
  return (
    <>
      <OrderStackNav.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: styles.container,
          animation: 'slide_from_right',
        }}>
        <OrderStackNav.Screen
          component={Screens.MyOrderTabs}
          name="MyOrderTabs"
        />
        <OrderStackNav.Screen
          component={Screens.OrderDetails}
          name="OrderDetails"
        />
        <OrderStackNav.Screen
          component={Screens.OrderSummary}
          name="OrderSummary"
        />
        <OrderStackNav.Screen
          component={Screens.ChatSection}
          name="ChatSection"
        />

        <OrderStackNav.Screen
          component={Screens.ProductByBrand}
          name="ProductByBrand"
        />
        <OrderStackNav.Screen
          component={Screens.GetDirection}
          name="GetDirection"
        />
        <OrderStackNav.Screen
          component={Screens.PaymentCompleted}
          name="PaymentCompleted"
        />

        <OrderStackNav.Screen component={Screens.RateOrder} name="RateOrder" />
        <OrderStackNav.Screen component={Screens.MyCart} name="MyCart" />
        <OrderStackNav.Screen component={Screens.ViewCart} name="ViewCart" />
        <OrderStackNav.Screen component={Screens.AddCoupon} name="AddCoupon" />
        <OrderStackNav.Screen
          component={Screens.ConfirmCompleteOrder}
          name="ConfirmCompleteOrder"
        />
        <OrderStackNav.Screen
          component={Screens.VisitedStores}
          name="VisitedStores"
        />
      </OrderStackNav.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
});
