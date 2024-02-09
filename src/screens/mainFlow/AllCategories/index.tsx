import moment from 'moment';
import React from 'react';
import {useEffect, useState} from 'react';
import {
  getKeyFromStorage,
  removeKeyFromStorage,
} from '../../../helpers/AsyncStorage';
import {
  ICON_NAMES,
  IMAGE_NAMES,
  STORAGE_KEYS,
} from '../../../helpers/constants';
import {useAppDispatch} from '../../../hooks/store';
import {navigate, replace} from '../../../navigation';
import {setCredentials} from '../../../reducers/authSlice';
import {
  useGetSubCategoryMutation,
  usePostAddFilterMutation,
  usePostgetCartMutation,
} from '../../../services/home';
import ShowToast from '../../../utils/Toast';
import {generateEncryptedKey} from '../../../widgets/CryptoPrivacy';
import {AllCategoriesView} from './AllCategoriesView';
const AllCategories = (props: any) => {
  var {body} = props?.route?.params;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [addFilter] = usePostAddFilterMutation();
  const [getCartApi] = usePostgetCartMutation();
  const [getSubCategory] = useGetSubCategoryMutation();
  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [like, setLike] = useState(false);
  const [favProducts, setFavProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [startRange, setStartRange] = useState(1);
  const [endRange, setEndRange] = useState(10000);
  const [rating, setRating] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  useEffect(() => {
    if (body) {
      setStartRange(body?.startRange);
      setEndRange(body?.endRange);
      setSortBy(body?.sortBy);
      setRating(body?.rating);
    }
  }, [body]);

  useEffect(() => {
    getCategoryDet();
  }, [categoryData, selectedCategory]);

  const getCategoryDet = () => {
    const selected = categoryData.find(
      category => category?._id === selectedCategory,
    );
    setCategoryName(selected?.name);
  };

  useEffect(() => {
    getCategoryData();
  }, []);
  useEffect(() => {
    if (!show) {
      getProductData();
    } else {
      searchProduct(search);
    }
  }, [body, selectedCategory, search, show]);

  useEffect(() => {
    getCart();
    searchProduct(search);
  }, [addNew]);

  useEffect(() => {
    checkFavProduct();
  }, [productData]);

  const checkFavProduct = () => {
    const favIds = productData
      .filter(item => item.isFavourite)
      .map(item => item);
    setFavProducts(favIds);
  };

  const goToFilter = () => {
    navigate('FilterScreen', {
      body: {
        categoryId: body?.categoryId,
        startRange: startRange,
        endRange: endRange,
        sortBy: sortBy,
        rating: rating,
        vendorId: body?.vendorId,
      },
    });
  };

  const getCategoryData = async () => {
    let data = body?.categoryId;
    try {
      setLoading(true);
      const payload = await getSubCategory(data).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        setSelectedCategory(payload?.data?.subCategory[0]?._id);
        setCategoryData(payload?.data?.subCategory);
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

  const searchProduct = async (text: string) => {
    setSearch(text);
    let data = {
      search: text,
      categoryId: body?.categoryId,
      startRange: body?.startRange == undefined ? startRange : body?.startRange,
      endRange: body?.endRange == undefined ? endRange : body?.endRange,
      vendorId: body?.vendorId,
      appkey: moment.utc().valueOf().toString(),
    };

    body?.sortBy && body?.sortBy != '' ? (data['sortBy'] = body?.sortBy) : '';
    body?.rating && body?.rating != '' ? (data['rating'] = body?.rating) : '';

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

  const getProductData = async () => {
    let data = {
      subCategoryId:
        selectedCategory === '' ? body?.categoryId : selectedCategory,
      startRange: body?.startRange == undefined ? startRange : body?.startRange,
      endRange: body?.endRange == undefined ? endRange : body?.endRange,
      vendorId: body?.vendorId,
      appkey: moment.utc().valueOf().toString(),
    };

    body?.sortBy && body?.sortBy != '' ? (data['sortBy'] = body?.sortBy) : '';
    body?.rating && body?.rating != '' ? (data['rating'] = body?.rating) : '';

    const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
    const body1 = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload = await addFilter(body1).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        setProductData(payload?.data?.product);
      }
    } catch (error) {
      setLoading(false);
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

  const viewCart = () => {
    navigate('OrderStack', {
      screen: 'ViewCart',
      params: {code: false},
    });
    // navigate('OrderStack', {screen: 'ViewCart'}, {params: {code: false}});
  };

  return (
    <AllCategoriesView
      cartData={cartData}
      setCartData={setCartData}
      addNew={addNew}
      setAddNew={setAddNew}
      setShow={setShow}
      searchProduct={searchProduct}
      search={search}
      setSearch={setSearch}
      show={show}
      categoryName={categoryName}
      favProducts={favProducts}
      setFavProducts={setFavProducts}
      loading={loading}
      setLike={setLike}
      like={like}
      setLoading={setLoading}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      foodCategory={categoryData}
      favoriteItems={productData}
      goToFilter={goToFilter}
      setIsFocused={setIsFocused}
      isFocused={isFocused}
      viewCart={viewCart}
    />
  );
};

export default AllCategories;
