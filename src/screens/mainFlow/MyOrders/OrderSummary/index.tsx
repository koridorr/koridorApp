import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  getKeyFromStorage,
  removeKeyFromStorage,
} from '../../../../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../../../../helpers/constants';
import {useAppDispatch} from '../../../../hooks/store';
import {navigate, replace} from '../../../../navigation';
import {setCredentials} from '../../../../reducers/authSlice';
import {
  useLazyGetOrderQuery,
  usePostCancelOrderMutation,
  useReOrderMutation,
} from '../../../../services/booking';
import {usePostaddCartMutation} from '../../../../services/home';
import ShowToast from '../../../../utils/Toast';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import OrderSummaryView from './OrderSummaryView';

const OrderSummary = (props: any) => {
  var {data} = props?.route?.params;

  const dispatch = useAppDispatch();

  const transformedArray = data?.item?.orderproducts?.map(item => ({
    images: item.images[0], // Assuming there's only one image URL in the array
    productId: item.productId,
    vendorId: item.vendorId,
    productName: item.name,
    quantity: item.quantity,
    type: 1,
    removeAllProducts: false,
    removeItem: false,
  }));

  const [loading, setLoading] = useState(false);
  const [addCartApi] = usePostaddCartMutation();
  const [getOrderApi] = useLazyGetOrderQuery();
  const [cancelOrderMutation] = usePostCancelOrderMutation();
  const [reOrderMutation] = useReOrderMutation();
  const [rating, setRating] = useState(false);
  const [orderId, setOrderId] = useState(data?.item?.orderproducts[0]?.orderId);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [note, setNote] = useState('');

  const CancelOrder = async () => {
    Alert.alert('', 'Are you sure you want to cancel this order?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          CancelNow();
        },
      },
    ]);
  };

  const CancelNow = async () => {
    try {
      let res = {
        status: 7,
        orderId: orderId,
        appkey: moment.utc().valueOf().toString(),
      };
      const encryptedKey = generateEncryptedKey(res) || {sek: '', hash: ''};
      const body = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      setLoading(true);
      const payload = await cancelOrderMutation({
        body,
      }).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        ShowToast('Your order is cancelled');
        setIsCancelled(true);
        replace('OrderStack', {screen: 'MyOrderTabs'});
      }
    } catch (error) {
      setLoading(false);
      console.log(error, '<==dfdfd');
    }
  };

  const reOrderItems = async () => {
    let data1 = {
      products: transformedArray,
      appkey: moment.utc().valueOf().toString(),
    };

    // return false;

    const encryptedKey = generateEncryptedKey(data1) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload = await reOrderMutation(body).unwrap();

      setLoading(false);
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        navigate('ViewCart', {code: false});
      }
    } catch (error: any) {
      if (error?.data?.message) {
        ShowToast(error?.data?.message);
      }
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
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderData();
  }, []);

  const getOrderData = async () => {
    const body = {
      limit: 20,
    };
    try {
      setLoading(true);
      const payload = await getOrderApi(body).unwrap();
      setLoading(false);
      if (payload.statusCode === 200) {
        const giveRate = payload?.data?.order
          .filter((item: any) => item?._id === data?.item?.orderId)
          .map((item: any) => item?.ratedByUser);

        const orderNotes = payload?.data?.order
          .filter((item: any) => item?._id === data?.item?.orderId)
          .map((item: any) => item?.notes);
        setNote(orderNotes);
        setRating(giveRate[0]);
      }
    } catch (error) {
      setLoading(false);

      console.log({error}, 'DFSFDF');
    }
  };

  return (
    <OrderSummaryView
      note={note}
      rating={rating}
      loading={loading}
      reOrderItems={reOrderItems}
      data={data}
      CancelOrder={CancelOrder}
    />
  );
};

export default OrderSummary;
