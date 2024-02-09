import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {addKeyToStorage, getKeyFromStorage} from '../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../helpers/constants';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {navigate} from '../navigation';
import {useEffect} from 'react';

const requestPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted) {
      try {
        let fcmToken = await getKeyFromStorage(STORAGE_KEYS.fcmToken);

        if (!fcmToken) {
          // await messaging().registerDeviceForRemoteMessages();
          fcmToken = await messaging().getToken();
          if (fcmToken) {
            // user has a device token
            console.log(fcmToken, '<===fcmToken');

            await addKeyToStorage(STORAGE_KEYS.fcmToken, fcmToken);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error, 'RRRR');
  }
};

const getToken = async () => {
  try {
    let fcmToken = await getKeyFromStorage(STORAGE_KEYS.fcmToken);

    if (!fcmToken) {
      // await messaging().registerDeviceForRemoteMessages();
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log(fcmToken, '<===fcmToken');

        await addKeyToStorage(STORAGE_KEYS.fcmToken, fcmToken);
      }
    }
  } catch (error) {
    console.log(error, 'eeee');
  }
};

export const checkPermission = async () => {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    requestPermissions();
  }
};

PushNotification.configure({
  onRegister: async function () {
    PushNotification.getDeliveredNotifications((callback: string | any[]) => {
      if (callback.length > 0) {
        console.log('badge number', callback);
      }
    });

    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'default channel',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (channel: any) => {
        console.log(`channel created: ${channel}`);
      },
    );

    messaging().onMessage(async remoteMessage => {
      //   console.log(remoteMessage, '<====9090909090909');
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: remoteMessage?.data?.title || '',
        message: remoteMessage?.data?.message || '',
        picture: '',
        userInfo: '',
        playSound: true,
        icon: 'image',
        soundName: 'default',
        number: 0,
        priority: 'high',
        visibility: 'private',
        channelName: 'default channel',
        channelDescription: 'A channel to categorise your notifications',
        importance: 'high',
        vibrate: true,
      });
    });
  },

  onNotification: async function (notification: {
    foreground: any;
    userInteraction: any;
    finish: (arg0: string) => void;
  }) {
    if (notification?.foreground) {
    }

    if (notification?.userInteraction) {
      const userToken = await getKeyFromStorage(STORAGE_KEYS.token);
      // console.log(notification, 'isForeground');
      if (userToken !== null) {
        navigate('HomeStack', {
          screen: 'Notification',
        });
      }
    }

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});
