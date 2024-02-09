import moment from 'moment';
import React, {useEffect, useState} from 'react';
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
import {
  useAddFavoriteProductMutation,
  usePostgetCartMutation,
  usePostProductMutation,
} from '../../../../services/home';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import MyCartView from './MyCartView';
import {useFocusEffect} from '@react-navigation/native';
import {setCredentials} from '../../../../reducers/authSlice';
import {replace} from '../../../../navigation';
import ShowToast from '../../../../utils/Toast';
import Geolocation from '@react-native-community/geolocation';
import useAuth from '../../../../hooks/useAuth';
const MyCart = (props: any) => {
  const dispatch = useAppDispatch();
  const [getProduct] = usePostProductMutation();
  const [getCartApi] = usePostgetCartMutation();
  const [addFavoriteItem] = useAddFavoriteProductMutation();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [favProducts, setFavProducts] = useState([]);
  const [like, setLike] = useState(data?.isFavourite || false);
  const [addNew, setAddNew] = useState(false);
  const [allow, setallow] = useState(false);
  const [currentLoc, setCurrentLoc] = useState({} as any);
  const [limit, setLimit] = useState(10);
  const [refreshing, setrefreshing] = useState(false);
  const user = useAuth();
  var {data} = props?.route?.params;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {};

  useEffect(() => {
    if (data?._id !== undefined) {
      getProductData(data?._id);
    }
  }, [data, allow, addNew]);

  useEffect(() => {
    if (data?.isFavourite) {
      setLike(true);
    }
  }, []);

  const onRefresh = () => {
    setLimit(10);
    setrefreshing(true);
    if (data?._id !== undefined) {
      getProductData(data?._id);
    }
  };
  const getMoreData = async () => {
    setLimit(limit + 10);

    if (data?._id !== undefined) {
      getProductData(data?._id);
    }
  };

  const getProductData = async (id: string) => {
    let data = {
      // latitude: allow ? currentLoc?.lat : user?.latitude,
      // longitude: allow ? currentLoc?.long : user?.longitude,
      vendorId: id,
      limit: limit,
      appkey: moment.utc().valueOf().toString(),
    };

    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload: any = await getProduct(body).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        setrefreshing(false);
        setProductData(payload?.data?.product);
      }
    } catch (error: any) {
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
      setrefreshing(false);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCart();
    }, [addNew]),
  );

  useEffect(() => {
    checkFavProduct();
  }, [productData]);

  const checkFavProduct = () => {
    const favIds = productData
      .filter((item: any) => item.isFavourite)
      .map(item => item);
    setFavProducts(favIds);
  };

  const addFavoriteStore = async (id: string) => {
    try {
      let data = {
        vendorId: id,
        appkey: moment.utc().valueOf().toString(),
      };

      setLoading(true);
      const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
      const body = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      const payload = await addFavoriteItem({
        body,
        type: 'vendor',
      }).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        setLike(!like);
      }
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  const getCart = async () => {
    try {
      setLoading(true);
      const payload: any = await getCartApi({}).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        setCartData(payload?.data);
      }
    } catch (error) {
      console.log(error, '<===error');

      setLoading(false);
    }
  };
  return (
    <MyCartView
      routekey={props.route?.params?.fromClick}
      addNew={addNew}
      setAddNew={setAddNew}
      setFavProducts={setFavProducts}
      favProducts={favProducts}
      loading={loading}
      setLoading={setLoading}
      addFavoriteStore={addFavoriteStore}
      like={like}
      setLike={setLike}
      cartData={cartData}
      vendorDetails={data}
      refreshing={refreshing}
      onRefresh={onRefresh}
      getMoreData={getMoreData}
      productData={productData}
    />
  );
};

export default MyCart;
