import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  getKeyFromStorage,
  removeKeyFromStorage,
} from '../../../../helpers/AsyncStorage';
import {
  ICON_NAMES,
  IMAGE_NAMES,
  STORAGE_KEYS,
} from '../../../../helpers/constants';
import {CouponTypes} from '../../../../helpers/constants/types';
import {useAppDispatch} from '../../../../hooks/store';
import useAuth from '../../../../hooks/useAuth';
import {navigate, replace} from '../../../../navigation';
import {setCredentials} from '../../../../reducers/authSlice';
import {
  useLazyGetCardQuery,
  usePostPlaceOrderMutation,
} from '../../../../services/booking';
import {
  useGetCouponsMutation,
  useLazyGetCartCouponDetailsQuery,
  usePostaddCartMutation,
  usePostgetAddressMutation,
  usePostgetCartMutation,
} from '../../../../services/home';
import ShowToast from '../../../../utils/Toast';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import ViewCartScreen from './ViewCartScreen';

const ViewCart = (props: any) => {
  const [getCouponDetails] = useLazyGetCartCouponDetailsQuery();
  const [couponsData, setCouponsData] = useState<CouponTypes[] | undefined>();
  const [getCoupons] = useGetCouponsMutation();
  const user = useAuth();
  // const {code} = props.route.params;
  const dispatch = useAppDispatch();
  const [getAddressApi] = usePostgetAddressMutation();
  const [getCardApi] = useLazyGetCardQuery();
  const [getCartApi] = usePostgetCartMutation();
  const [placeOrderApi] = usePostPlaceOrderMutation();
  const [removeCartApi] = usePostaddCartMutation();
  const [addCartApi] = usePostaddCartMutation();
  const [cartData, setCartData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [applyCode, setApplyCode] = useState('');
  const [selectedAddress, setSelectedAddress] = useState({} as any);
  const [isFocused, setIsFocused] = useState(false);
  const [paymentMeth, setPaymentMeth] = useState(0);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');

  useFocusEffect(
    useCallback(() => {
      getCart(applyCode !== '' && applyCode ? applyCode : false);
      getCardData();
    }, []),
  );

  const getCouponsHandler = async () => {
    try {
      let data = {
        venderId: user?.vendorId,
        appkey: moment.utc().valueOf().toString(),
      };
      const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
      const body = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };

      setLoading(true);
      const payload = await getCoupons(body).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        setCouponsData(payload?.data?.coupons);
      }
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    getCouponsHandler();
  }, []);

  const getCardData = async () => {
    try {
      setLoading(true);
      const payload: any = await getCardApi({}).unwrap();
      setLoading(false);
      if (payload.statusCode === 200) {
        setCardData(payload?.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getaddressData();
    }, []),
  );

  const getaddressData = async () => {
    let data = {
      appkey: moment.utc().valueOf().toString(),
    };
    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload: any = await getAddressApi(body).unwrap();
      setLoading(false);
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        setAddressData(payload?.data?.address);
        const address = await getKeyFromStorage(STORAGE_KEYS.Address);
        const addressData = payload?.data?.address?.filter(
          (item: any) => item?._id === address,
        );
        setSelectedAddress(addressData[0]);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const applyCoupon = (code: string) => {
    setApplyCode(code);
    getCart(code);
  };

  const getCart = async (code: string | boolean) => {
    try {
      var payload;
      if (Boolean(code)) {
        setLoading(true);
        payload = await getCouponDetails({
          code: code,
        }).unwrap();
        setLoading(false);
      } else {
        setLoading(true);
        payload = await getCartApi({}).unwrap();
        setLoading(false);
      }

      if (payload.statusCode === 200) {
        setCartData(payload?.data as []);
      }
    } catch (error: any) {
      setApplyCode('');
      console.log(error, '<=****==error');
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

  const removeFromcart = async (item: any) => {
    Alert.alert('', 'Are you sure you want to remove this?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          removeNow(item);
        },
      },
    ]);
  };

  const removeNow = async (item: any) => {
    let data = {
      productId: item?.productId?._id,
      removeItem: true,
      appkey: moment.utc().valueOf().toString(),
    };
    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };

    try {
      setLoading(true);
      const payload = await removeCartApi(body).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        getCart(applyCode !== '' && applyCode ? applyCode : false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const decrementCount = async (item: any) => {
    if (item?.quantity > 0) {
      let data = {
        vendorId: item?.vendorId?._id,
        quantity: 1,
        images: item?.images,
        productName: item?.productName,
        productId: item?.productId?._id,
        type: 2,
        removeAllProducts: false,
        removeItem: false,
        appkey: moment.utc().valueOf().toString(),
      };

      const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
      const body = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      try {
        setLoading(true);
        const payload = await addCartApi(body).unwrap();

        setLoading(false);

        if (payload.statusCode === 200) {
          getCart(applyCode !== '' && applyCode ? applyCode : false);
        }
      } catch (error) {
        ShowToast(error?.data?.message || '');
        setLoading(false);
      }
    }
  };

  const incrementCount = async (item: any) => {
    let data = {
      vendorId: item?.vendorId?._id,
      quantity: 1,
      images: item?.images,
      productName: item?.productName,
      productId: item?.productId?._id,
      type: 1,
      removeAllProducts: false,
      removeItem: false,
      appkey: moment.utc().valueOf().toString(),
    };
    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload = await addCartApi(body).unwrap();

      setLoading(false);

      if (payload.statusCode === 200) {
        getCart(applyCode !== '' && applyCode ? applyCode : false);
      }
    } catch (error) {
      ShowToast(error?.data?.message || '');
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    let data = {
      notes: note,
      deliveryAddress: {},
      card: selectedCard,
      PAYMENT_TYPE: selectedCard === '' ? 1 : 2,
      appkey: moment.utc().valueOf().toString(),
    };

    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    var payload: any;
    try {
      if (!loading) {
        setLoading(true);
        payload = await placeOrderApi({
          body,
          code: applyCode ? applyCode : null,
        }).unwrap();
      }

      setLoading(false);
      if (payload.statusCode === 200) {
        replace('PaymentCompleted', payload?.data);
      }
    } catch (error: any) {
      console.log(error, 'error');

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

  return (
    <ViewCartScreen
      setSelectedCard={setSelectedCard}
      selectedCard={selectedCard}
      cardData={cardData}
      loading={loading}
      placeOrder={placeOrder}
      applyCode={applyCode}
      applyCoupon={applyCoupon}
      incrementCount={incrementCount}
      decrementCount={decrementCount}
      removeFromcart={removeFromcart}
      selectedAddress={selectedAddress}
      cartData={cartData}
      setNote={setNote}
      note={note}
      setIsFocused={setIsFocused}
      isFocused={isFocused}
      setPaymentMeth={setPaymentMeth}
      paymentMeth={paymentMeth}
      couponsData={couponsData}
    />
  );
};

export default ViewCart;
