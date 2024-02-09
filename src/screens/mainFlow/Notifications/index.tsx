import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {useAppDispatch} from '../../../hooks/store';
import {
  useGetClearNotificationMutation,
  useGetNotificationMutation,
} from '../../../services/home';
import NotificationView from './NotificationView';

const Notification = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [getNotificationApi] = useGetNotificationMutation();
  const [clearNotificationApi] = useGetClearNotificationMutation();

  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const payload: any = await getNotificationApi({}).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        setNotificationData(payload?.data?.notification);
      }
    } catch (error) {
      setLoading(false);

      console.log({error});
    }
  };

  const clearAll = async () => {
    try {
      setLoading(true);
      const payload = await clearNotificationApi({}).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        await getData();
      }
    } catch (error) {
      setLoading(false);

      console.log({error});
    }
  };
  return (
    <View style={{flex: 1}}>
      <NotificationView
        clearAll={clearAll}
        loading={loading}
        notificationData={notificationData}
      />
    </View>
  );
};

export default Notification;
