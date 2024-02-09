import AppWrapper from './src/app/AppWrapper';
import SafeAreaContext from './src/app/context/SafeAreaContext';
import {useEffect} from 'react';
import {checkPermission} from './src/utils/Notifications';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';

const App = () => {
  const handleNotifications = async () => {
    await checkPermission();
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      handleNotifications();
    }
  }, []);
  return (
    <SafeAreaContext>
      <AppWrapper />
      {/* <PushController/> */}
    </SafeAreaContext>
  );
};

export default App;
