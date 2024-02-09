import {useCallback, useEffect, useState} from 'react';

import {SplashView} from './SplashView';

import {getKeyFromStorage} from '../../../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../../../helpers/constants';
import useAuth from '../../../hooks/useAuth';
import {getToken, setCredentials} from '../../../reducers/authSlice';
import {useAppDispatch, useAppSelector} from '../../../hooks/store';
import {useLazyGetProfileQuery} from '../../../services/auth';
import {User} from '../../../types/User';
import {useLazyGetcmsQuery} from '../../../services/cms';
import {setCmsData} from '../../../reducers/commonSlice';

const Splash = (props: any) => {
  const [getCmsMethod] = useLazyGetcmsQuery();

  const [userData, setUserData] = useState<User>();
  const dispatch = useAppDispatch();
  const [getProfile] = useLazyGetProfileQuery();

  const checkToken = async () => {
    const token = await getKeyFromStorage(STORAGE_KEYS.token);
    const isVisited = await getKeyFromStorage(STORAGE_KEYS.appVisited);
    const profile = await getKeyFromStorage(STORAGE_KEYS.isProfileComplete);
    console.log(token, 'tokensplashhhhh');
    
    if (token &&profile) {
      props.navigation.replace('MainFlow', {screen: 'HomeScreen'});
    } else {
      props.navigation.replace('SignUp', {isVisited});
    }
    if (token?.length) {
      // const parsedToken = await JSON.parse(token);
      dispatch(
        setCredentials({
          user: userData || null,
          token: JSON.parse(token) || null,
        }),
      );
      return;

      try {
        const payload = await getProfile({}).unwrap();

        if (payload?.statusCode === 200) {
          setUserData(payload?.data);
          dispatch(
            setCredentials({
              user: payload?.data || null,
              token: token || null,
            }),
          );
          if (payload?.data?.isProfileCompleted) {
            props.navigation.replace('MainFlow', {screen: 'HomeScreen'});
          } else {
            props.navigation.replace('SignUp', {isVisited});
          }
        }
      } catch (error) {
        dispatch(
          setCredentials({
            user: null,
            token: null,
          }),
        );
        props.navigation.replace('SignUp', {isVisited});
      }
    } else {
      props.navigation.replace('SignUp', {isVisited});
    }
  };

  const getCmsData = async () => {
    try {
      const res = await getCmsMethod({}).unwrap();


      if (res?.statusCode === 200) {
        dispatch(
          setCmsData({
            cms: res?.data || undefined,
          }),
        );
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    setTimeout(function () {
      checkToken();
    }, 2000);
    getCmsData();
  }, []);

  return <SplashView />;
};

export default Splash;
