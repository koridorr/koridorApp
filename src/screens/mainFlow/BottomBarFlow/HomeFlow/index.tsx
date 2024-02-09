import {
  ICON_NAMES,
  IMAGE_NAMES,
  STORAGE_KEYS,
} from '../../../../helpers/constants';
import {HomeScreenView} from './HomeScreenView';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {User} from '../../../../types/User';
import {useLazyGetProfileQuery} from '../../../../services/auth';
import useAuth from '../../../../hooks/useAuth';
import {PermissionsAndroid, Platform} from 'react-native';

import {setCredentials} from '../../../../reducers/authSlice';
import {
  addKeyToStorage,
  getKeyFromStorage,
  removeKeyFromStorage,
} from '../../../../helpers/AsyncStorage';
import {useAppDispatch} from '../../../../hooks/store';
import {
  useAddFavoriteProductMutation,
  usePostBrandsMutation,
  usePostCategoryMutation,
  usePostgetCartMutation,
  usePostProductMutation,
  usePostVendorMutation,
} from '../../../../services/home';
import moment from 'moment';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import {navigate, replace} from '../../../../navigation';
import ShowToast from '../../../../utils/Toast';
import screens from '../../..';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = (props: any) => {
  const dispatch = useAppDispatch();
  const [addFavoriteItem] = useAddFavoriteProductMutation();
  const [getCartApi] = usePostgetCartMutation();
  const [cartData, setCartData] = useState<any>();
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [getProfile] = useLazyGetProfileQuery();
  const [getCategory] = usePostCategoryMutation();
  const [getBarands] = usePostBrandsMutation();
  const [getProduct] = usePostProductMutation();
  const [getVendor] = usePostVendorMutation();
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([] as any);
  const [productData, setProductData] = useState([]);
  const [bestSellingData, setBestSellingData] = useState([] as any);
  const [vendorData, setVendorData] = useState([]);
  const [like, setLike] = useState(false);
  const [favProducts, setFavProducts] = useState([]);
  const [favItems, setFavItems] = useState([]);
  const [favItemId, setFavItemId] = useState([]);
  const [favVendors, setFavVendors] = useState([]);
  const [selectedInd, setSelectedInd] = useState(-1);
  const [currentLoc, setCurrentLoc] = useState({} as any);
  const [allow, setallow] = useState(false);
  const user = useAuth();

  useEffect(() => {
    checkFavProduct();
  }, [bestSellingData]);
  useEffect(() => {
    if (bestSellingData?.length === 0) {
      checkFavProduct();
    }
  }, [productData]);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const payload = await getProfile({}).unwrap();
      setLoading(false);
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        dispatch(
          setCredentials({
            user: payload?.data || null,
            token: JSON.parse(token) || null,
          }),
        );
        setUserData(payload?.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (userData) {
        getCategoryData();
        getBrandData();
        getVendorData();
      }
    }, [userData, allow]),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (userData) {
        getProductData();
        getBestSellingPro();
        checkFavProduct();
      }
    }, [userData, allow]),
  );

  useFocusEffect(
    useCallback(() => {
      checkFavVendor();
    }, [vendorData]),
  );

  const [vendors, setVendors] = useState([
    {label: 'HDFC Bank', value: 'HDFC'},
    {label: 'PUNB Bank', value: 'PUNB'},
    {label: 'ICI Bank', value: 'ICI'},
  ]);

  const checkFavVendor = () => {
    const favVendors = vendorData
      .filter((item: any) => item.isFavourite)
      .map(item => item);
    setFavVendors(favVendors);
  };

  const checkFavProduct = () => {
    setLoading(true);
    if (bestSellingData?.length === 0) {
      const fav_data = productData
        .filter((item: any) => item?.isFavourite)
        .map((item: any) => item);
      setFavItems(fav_data);
    } else {
      const fav_data = bestSellingData
        .filter((item: any) => item?.isFavourite)
        .map((item: any) => item);
      setFavItems(fav_data);
    }

    setLoading(false);
  };

  const getBrandData = async () => {
    let data = {
      // latitude:currentLoc?.lat ?currentLoc?.lat:userData?.latitude ,
      // longitude:currentLoc?.long ?currentLoc?.long:userData?.longitude,
      appkey: moment.utc().valueOf().toString(),
    };

    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload: any = await getBarands(body).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        setBrandData(payload?.data?.brand);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const getCategoryData = async () => {
    let data = {
      // latitude:currentLoc?.lat ?currentLoc?.lat:userData?.latitude ,
      // longitude:currentLoc?.long ?currentLoc?.long:userData?.longitude,
      appkey: moment.utc().valueOf().toString(),
    };

    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload: any = await getCategory(body).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        setCategoryData(payload?.data?.category);
      }
    } catch (error: any) {
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

  const getProductData = async () => {
    let data = {
      // latitude:currentLoc?.lat ?currentLoc?.lat:userData?.latitude ,
      // longitude:currentLoc?.long ?currentLoc?.long:userData?.longitude,

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
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        setProductData(payload?.data?.product);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  type payloadType = {
    data: any;
    statusCode: number;
    product: {};
  };
  const getBestSellingPro = async () => {
    let data = {
      // latitude:currentLoc?.lat ?currentLoc?.lat:userData?.latitude ,
      // longitude:currentLoc?.long ?currentLoc?.long:userData?.longitude,
      isBestSellingProduct: true,
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
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        setBestSellingData(payload?.data?.product);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getVendorData = async () => {
    let data = {
      // latitude:currentLoc?.lat ?currentLoc?.lat:userData?.latitude ,
      // longitude:currentLoc?.long ?currentLoc?.long:userData?.longitude,
      appkey: moment.utc().valueOf().toString(),
    };
    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload: any = await getVendor(body).unwrap();
      setLoading(false);
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        setVendorData(payload?.data?.Vendor);
      }
    } catch (error: any) {
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

  const _onRefresh = () => {
    getVendorData();
    getBestSellingPro();
    getProductData();
    getCart();
    getCategoryData();
    getUserDetails();
    getBrandData();
  };

  useEffect(() => {
    // if (!user) {
    getUserDetails();
    // }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCart();
      setSelectedInd(-1);
    }, []),
  );

  const getCart = async () => {
    try {
      setLoading(true);
      const payload: any = await getCartApi({}).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        const sumOfQuantities = (payload?.data?.products || []).reduce(
          (total, product) => total + (product.quantity || 0),
          0,
        );
        setCartData(sumOfQuantities);
      }
    } catch (error: any) {
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

  const checkWithBrand = async (data: any) => {
    navigate('OrderStack', {
      screen: 'ProductByBrand',
      params: {
        data,
      },
    });
  };

  return (
    <HomeScreenView
      bestSellingData={bestSellingData}
      cartData={cartData}
      foodCategory={categoryData}
      productData={productData}
      favProducts={favProducts}
      favVendors={favVendors}
      favItemId={favItemId}
      setFavProducts={setFavProducts}
      brands={brandData}
      checkWithBrand={checkWithBrand}
      setFavVendors={setFavVendors}
      vendorData={vendorData}
      userData={userData}
      loading={loading}
      user={user}
      setLike={setLike}
      like={like}
      setLoading={setLoading}
      favItems={favItems}
      setSelectedInd={setSelectedInd}
      selectedInd={selectedInd}
      getCart={getCart}
      vendors={vendors}
      _onRefresh={_onRefresh}
    />
  );
};

export default HomeScreen;
