import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {getKeyFromStorage} from '../../../../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../../../../helpers/constants';
import {CouponTypes} from '../../../../helpers/constants/types';
import {navigate} from '../../../../navigation';
import {
  useGetCouponsMutation,
  useLazyGetCartCouponDetailsQuery,
} from '../../../../services/home';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import AddCouponView from './AddCouponView';

const AddCoupon = () => {
  const [loading, setLoading] = useState(false);
  const [couponsData, setCouponsData] = useState<CouponTypes[] | undefined>();
  const [getCoupons] = useGetCouponsMutation();
;

  const getCouponsHandler = async () => {
    try {
      let data = {
      
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

  return <AddCouponView couponsData={couponsData} loading={loading} />;
};

export default AddCoupon;
