import moment = require('moment');
import React from 'react';
import {useEffect, useState} from 'react';
import {
  getKeyFromStorage,
  removeKeyFromStorage,
} from '../../../../helpers/AsyncStorage';
import {
  ICON_NAMES,
  IMAGE_NAMES,
  STORAGE_KEYS,
} from '../../../../helpers/constants';
import {useAppDispatch} from '../../../../hooks/store';
import {navigate, replace} from '../../../../navigation';
import {setCredentials} from '../../../../reducers/authSlice';
import {useLazyGetOrderQuery} from '../../../../services/booking';
import ShowToast from '../../../../utils/Toast';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import MyOrderTabView from './MyOrderTabView';

const MyOrderTabs = () => {
  const dispatch = useAppDispatch();
  const [getOrderApi] = useLazyGetOrderQuery();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([] as any);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [refreshing, setrefreshing] = useState(false);

  const handleNavigate = () => {
    navigate('OrderDetails', undefined);
  };
  useEffect(() => {
    getOrderData(limit);
  }, []);

  const onRefresh = () => {
    setLimit(10);
    setPage(1);
    setrefreshing(true);
    getOrderData(10);
  };
  const getMoreData = async () => {
    getOrderData(limit + 10);
    setLimit(limit + 10);
  };

  const getOrderData = async (limit: number) => {
    try {
      setLoading(true);
      const body = {
        limit: limit,
      };

      const payload = await getOrderApi(body).unwrap();

      setLoading(false);
      if (payload.statusCode === 200) {
        if (payload?.data?.order?.length > 0) {
          setOrderData(payload?.data?.order);
        }
        setrefreshing(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error, 'error');

      setrefreshing(false);
      if (error?.data?.statusCode === 401) {
        const isVisited = true;
        await removeKeyFromStorage(STORAGE_KEYS.token);
        ShowToast('Session expired');
        replace('AuthFlow', {screen: 'SignUp', params: {isVisited}});
        dispatch(
          setCredentials({
            token: null,
            user: null,
          }),
        );
      }
    }
  };
  return (
    <MyOrderTabView
      loading={loading}
      orderData={orderData}
      refreshing={refreshing}
      onRefresh={onRefresh}
      getMoreData={getMoreData}
      handleNavigate={handleNavigate}
    />
  );
};

export default MyOrderTabs;
