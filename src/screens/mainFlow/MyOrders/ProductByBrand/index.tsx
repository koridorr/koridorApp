import moment from 'moment';
import {useCallback, useEffect, useState} from 'react';
import {useAppDispatch} from '../../../../hooks/store';
import {
  useGetSubCategoryMutation,
  usePostAddFilterMutation,
  usePostProductMutation,
} from '../../../../services/home';
import ShowToast from '../../../../utils/Toast';
import {
  getKeyFromStorage,
  removeKeyFromStorage,
} from '../../../../helpers/AsyncStorage';

import {navigate, replace} from '../../../../navigation';
import {setCredentials} from '../../../../reducers/authSlice';

import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import {ProductByBrandView} from './ProductByBrandView';
import {STORAGE_KEYS} from '../../../../helpers/constants';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import useAuth from '../../../../hooks/useAuth';
const ProductByBrand = (props: any) => {
  var {data} = props?.route?.params;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [getProduct] = usePostProductMutation();
  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [like, setLike] = useState(false);
  const [favProducts, setFavProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [brandName, setBrandName] = useState('');
  const [allow, setallow] = useState(false);
  const [currentLoc, setCurrentLoc] = useState({} as any);
  const user = useAuth();

  useEffect(() => {
    checkFavProduct();
  }, [productData]);

  useFocusEffect(
    useCallback(() => {
      if (user?.latitude) {
        getProductData();
      }
      if (data) {
        setBrandName(data?.name);
      }
    }, [data, allow]),
  );

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {};

  const checkFavProduct = () => {
    const favIds = productData
      ?.filter((item: any) => item?.isFavourite)
      ?.map(item => item);
    setFavProducts(favIds);
  };

  const getProductData = async () => {
    let body = {
      // latitude:allow ? currentLoc?.lat : user?.latitude ,
      // longitude:allow ? currentLoc?.long : user?.longitude,
      brandId: data?._id,
      appkey: moment.utc().valueOf().toString(),
    };

    // console.log(body, '<====body===********=========data@@@@');
    const encryptedKey = generateEncryptedKey(body) || {sek: '', hash: ''};
    const body1 = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload: any = await getProduct(body1).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        setProductData(payload?.data?.product);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <ProductByBrandView
      brandName={brandName}
      setShow={setShow}
      search={search}
      setSearch={setSearch}
      show={show}
      favProducts={favProducts}
      setFavProducts={setFavProducts}
      loading={loading}
      setLike={setLike}
      like={like}
      setLoading={setLoading}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      favoriteItems={productData}
      foodCategory={[]}
      categoryName={''}
      goToFilter={function (): void {
        throw new Error('Function not implemented.');
      }}
      searchProduct={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default ProductByBrand;
