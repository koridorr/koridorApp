import {useEffect} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {colors} from '../helpers/styles';
import Splash from '../screens/authScreens/Splash';

import {AuthStack} from './authStack';

export const navigationRef = createNavigationContainerRef();

import {Alert, BackHandler} from 'react-native';
import {MainStack} from './mainStack';

const exitApp = () => {
  BackHandler.exitApp();
};

const handleBackButtonClick = () => {
  if (!navigationRef.canGoBack()) {
    Alert.alert('Hold on!', `Are you sure you want to exit the application?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel'),
      },
      {
        text: 'Yes',
        onPress: () => exitApp(),
      },
    ]);
  }
  return !navigationRef.canGoBack();
};

export function navigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    navigationRef?.navigate(name as never, params as never);
  }
}

export function replace(name: string, params: any) {
  navigationRef.dispatch(StackActions.replace(name as never, params as never));
}

export function goBack() {
  if (navigationRef.isReady()) {
    try {
      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
      } else {
        handleBackButtonClick();
      }
    } catch (error) {
    }
  }
}

const RootStackNav = createNativeStackNavigator();

export const AppNavigation = () => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackNav.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {backgroundColor: colors.bg},
        }}>
        {/* <RootStackNav.Screen component={Splash} name={'SplashFlow'} /> */}
        <RootStackNav.Screen component={AuthStack} name={'AuthFlow'} />
        <RootStackNav.Screen component={MainStack} name={'MainFlow'} />
      </RootStackNav.Navigator>
    </NavigationContainer>
  );
};
