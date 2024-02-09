import moment from 'moment';
import React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  getKeyFromStorage,
  removeKeyFromStorage,
} from '../../../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../../../helpers/constants';
import {useAppDispatch} from '../../../hooks/store';
import useAuth from '../../../hooks/useAuth';
import {replace} from '../../../navigation';
import {setCredentials} from '../../../reducers/authSlice';
import {usePostAddFilterMutation} from '../../../services/home';
import ShowToast from '../../../utils/Toast';
import {generateEncryptedKey} from '../../../widgets/CryptoPrivacy';
import {SearchScreenView} from './SearchScreenView';

const SearchScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAuth();
  const [loading, setLoading] = useState(false);
  const [addFilter] = usePostAddFilterMutation();
  const [search, setSearch] = useState('');
  const [productData, setProductData] = useState([]);
  const [favProducts, setFavProducts] = useState([]);

  useEffect(() => {
    searchProduct();
  }, [search]);

  const searchProduct = async () => {
    let data = {
      search: search ? search : '',
      page: 1,
      limit: 500,
      startRange: 1,
      vendorId: user?.vendorId,
      endRange: 10000,
      appkey: moment.utc().valueOf().toString(),
    };

    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body1 = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload = await addFilter(body1).unwrap();
      setLoading(false);
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        setProductData(payload?.data?.product);
      }
    } catch (error) {
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
    checkFavProduct();
  }, [productData]);

  const checkFavProduct = () => {
    const favIds = productData
      .filter(item => item.isFavourite)
      .map(item => item);
    setFavProducts(favIds);
  };
  return (
    <View style={{flex: 1}}>
      <SearchScreenView
        loading={loading}
        favProducts={favProducts}
        setFavProducts={setFavProducts}
        productData={productData}
        setSearch={setSearch}
        search={search}
      />
    </View>
  );
};

export default SearchScreen;
