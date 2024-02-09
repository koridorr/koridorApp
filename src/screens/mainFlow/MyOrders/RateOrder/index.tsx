import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  getKeyFromStorage,
  removeKeyFromStorage,
} from '../../../../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../../../../helpers/constants';
import {useAppDispatch} from '../../../../hooks/store';
import {navigate, replace} from '../../../../navigation';
import {setCredentials} from '../../../../reducers/authSlice';
import {usePostGiveRatingMutation} from '../../../../services/booking';
import ShowToast from '../../../../utils/Toast';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import RateOrderView from './RateOrderView';

const RateOrder = (props: any) => {
  var {data} = props?.route?.params;
  const dispatch = useAppDispatch();
  const [ratingApi] = usePostGiveRatingMutation();
  const [loading, setLoading] = useState(false);
  const [starCount, setStarCount] = useState(1);
  const [description, setDescription] = useState('');

  const addRating = async () => {
    let data1 = {
      orderId: data,
      rating: starCount,
      description: description,
      appkey: moment.utc().valueOf().toString(),
    };

    const encryptedKey = generateEncryptedKey(data1) || {sek: '', hash: ''};
    const body = {
      sek: encryptedKey.sek || '',
      hash: encryptedKey.hash || '',
    };
    try {
      setLoading(true);
      const payload = await ratingApi(body).unwrap();

      setLoading(false);
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        ShowToast(payload?.message);
        navigate('HomeScreen', undefined);
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
    // }
  };
  return (
    <RateOrderView
      loading={loading}
      addRating={addRating}
      description={description}
      setDescription={setDescription}
      starCount={starCount}
      setStarCount={setStarCount}
    />
  );
};

export default RateOrder;
