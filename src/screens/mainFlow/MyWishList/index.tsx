import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ICON_NAMES, IMAGE_NAMES} from '../../../helpers/constants';
import {
  useAddFavoriteProductMutation,
  useGetFavoriteProductMutation,
} from '../../../services/home';
import {generateEncryptedKey} from '../../../widgets/CryptoPrivacy';
import MyWishListView from './MyWishListView';

const MyWishlist = () => {
  const [currentTab, setCurrentTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [getWishlistApi] = useGetFavoriteProductMutation();
  const [addFavoriteItem] = useAddFavoriteProductMutation();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [wishlistVendors, setWishlistVendors] = useState([]);
  useEffect(() => {
    getProductData();
  }, [currentTab]);

  const getProductData = async () => {
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
      const payload = await getWishlistApi({
        body,
        type: currentTab ? 'product' : 'vendor',
      }).unwrap();
      // console.log(payload?.data?.length,'<==payload',currentTab);

      setLoading(false);
      if (payload.statusCode === 200) {
        if (currentTab) {
          setWishlistProducts(payload?.data);
        } else {
          setWishlistVendors(payload?.data);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const removeFav = async (id: string) => {
    try {
      var data;
      if (currentTab) {
        data = {
          productId: id,
          appkey: moment.utc().valueOf().toString(),
        };
      } else {
        data = {
          vendorId: id,
          appkey: moment.utc().valueOf().toString(),
        };
      }

      setLoading(true);
      const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
      const body = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      const payload = await addFavoriteItem({
        body,
        type: 'product',
      }).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
        await getProductData();
      }
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  return (
    <MyWishListView
      loading={loading}
      setLoading={setLoading}
      removeFav={removeFav}
      products={wishlistProducts}
      wishlistVendors={wishlistVendors}
      favoriteItems={[]}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
    />
  );
};

export default MyWishlist;
