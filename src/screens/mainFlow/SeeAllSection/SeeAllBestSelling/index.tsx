import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import useAuth from '../../../../hooks/useAuth';
import {usePostProductMutation} from '../../../../services/home';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import SeeAllBestSellingView from './SeeAllBestSellingView';

const SeeAllBestSelling = (props: any) => {
  const [getProduct] = usePostProductMutation();
  const [BestSellingProd, setBestSellingProd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [limit, setLimit] = useState(10);
  const [favProduct, setFavProduct] = useState([]);
  const [allow, setallow] = useState(false);
  const [currentLoc, setCurrentLoc] = useState({} as any);
  const user = useAuth();

  const onRefresh = () => {
    setrefreshing(true);
    setLimit(10);
    getProductData();
  };

  useEffect(() => {
    getData();
  }, [allow]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {};

  useEffect(() => {
    checkFavData();
  }, [BestSellingProd]);

  const getData = async () => {
    let data = {
      limit: limit,
      appkey: moment.utc().valueOf().toString(),
      isBestSellingProduct: true,
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
        setBestSellingProd(payload?.data?.product);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const checkFavData = () => {
    const fav_data = BestSellingProd.filter(
      (item: any) => item?.isFavourite,
    ).map(item => item);
    setFavProduct(fav_data);
    setLoading(false);
  };

  const getProductData = async () => {
    let data = {
      appkey: moment.utc().valueOf().toString(),
      limit: limit,
      isBestSellingProduct: true,
    };
    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      // setLoading(true);
      const payload: any = await getProduct(body).unwrap();

      // setLoading(false);
      setrefreshing(false);
      if (payload.statusCode === 200) {
        setBestSellingProd(payload?.data?.product);
      }
    } catch (error) {
      // setLoading(false);
      setrefreshing(false);
    }
  };
  const getMoreData = () => {
    setLimit(limit + 10);
    getData();
  };
  return (
    <SeeAllBestSellingView
      setFavProduct={setFavProduct}
      favProduct={favProduct}
      getMoreData={getMoreData}
      onRefresh={onRefresh}
      refreshing={refreshing}
      setLike={setLike}
      loading={loading}
      setLoading={setLoading}
      BestSellingProd={BestSellingProd}
    />
  );
};

export default SeeAllBestSelling;
