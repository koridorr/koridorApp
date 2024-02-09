import React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  addKeyToStorage,
  getKeyFromStorage,
  removeKeyFromStorage,
} from '../../../../helpers/AsyncStorage';
import {ICON_NAMES, STORAGE_KEYS} from '../../../../helpers/constants';
import useAuth from '../../../../hooks/useAuth';
import {ProfileFlowView} from './ProfileFlowView';
import {
  useLazyGetLogoutQuery,
  useLazyGetProfileQuery,
} from '../../../../services/auth';
import {User} from '../../../../types/User';
import {setCredentials} from '../../../../reducers/authSlice';
import ShowToast from '../../../../utils/Toast';
import {useAppDispatch, useAppSelector} from '../../../../hooks/store';
import {getCms} from '../../../../reducers/commonSlice';
import {useLazyGetcmsQuery} from '../../../../services/cms';
import {ProfileListType} from '../../../../types/ProfileList.d.types';
import {setCmsData} from '../../../../reducers/commonSlice';
import {navigate, replace} from '../../../../navigation';
import {useDeleteAccountMutation} from '../../../../services/home';
import {useFocusEffect} from '@react-navigation/native';
const ProfileFlow = (props: any) => {
  const dispatch = useAppDispatch();
  const user = useAuth();
  const [deleteAccountApi] = useDeleteAccountMutation();
  const cmsData = useAppSelector(getCms);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [getProfile] = useLazyGetProfileQuery();
  const [logoutQuery] = useLazyGetLogoutQuery();
  const [getCmsMethod] = useLazyGetcmsQuery();
  const GeneralList = [
    // {
    //   name: 'Manage Address',
    //   text: 'Manage Address',
    //   icon: ICON_NAMES.manageCard,
    //   navigateTo: 'MyAddresses',
    // },
    // {
    //   name: 'Manage Location',
    //   text: 'Manage Location',
    //   icon: ICON_NAMES.manageCard,
    //   navigateTo: 'ManageLocation',
    // },
    {
      name: 'Manage Payment Methods',
      text: 'Manage Payment Methods',
      icon: ICON_NAMES.manageCard,
      navigateTo: 'PaymentMethods',
    },

    {
      name: 'My Wishlist',
      text: 'Manage Wishlist',
      icon: ICON_NAMES.starA,
      navigateTo: 'MyWishlist',
    },
  ] as ProfileListType[];

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const payload = await getProfile({}).unwrap();
      setLoading(false);

      if (payload.statusCode === 200) {
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
      }
    } catch (error: any) {
      setLoading(false);
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
      console.log({error});
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getUserDetails();
  //   }, [user]),
  // );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const getUserDetails = async () => {
  //   try {
  //     setLoading(true);
  //     const payload = await getProfile({}).unwrap();
  //     setLoading(false);
  //     const token = await getKeyFromStorage(STORAGE_KEYS.token);
  //     if (payload.statusCode === 200) {
  //       dispatch(
  //         setCredentials({
  //           user: payload?.data || null,
  //           token: JSON.parse(token) || null,
  //         }),
  //       );
  //       setUserData(payload?.data);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  const logout = async () => {
    toggleModal();
    try {
      setLoading(true);
      const payload = await logoutQuery('').unwrap();
      setLoading(false);
      const isVisited = true;
      if (payload.statusCode === 200) {
        ShowToast(payload.message);
        await removeKeyFromStorage(STORAGE_KEYS.token);
        await addKeyToStorage(STORAGE_KEYS.isProfileComplete, false);
        navigate('AuthFlow', {screen: 'SignUp', params: {isVisited}});
        dispatch(
          setCredentials({
            token: null,
            user: null,
          }),
        );
      }
    } catch (error) {
      setLoading(false);
      console.log({error});
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
      console.log(error);
    }
  };

  const askToDelete = () => {
    Alert.alert('', 'Are you sure you want to delete your account?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          deteleAccount();
        },
      },
    ]);
  };

  const deteleAccount = async () => {
    try {
      setLoading(true);
      const payload: any = await deleteAccountApi({}).unwrap();
      setLoading(false);
      if (payload.statusCode === 200) {
        ShowToast(payload?.message || '');
        const isVisited = true;
        await removeKeyFromStorage(STORAGE_KEYS.token);
        replace('AuthFlow', {screen: 'SignUp', params: {isVisited}});
        dispatch(
          setCredentials({
            token: null,
            user: null,
          }),
        );
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
  useEffect(() => {
    if (!user) {
      getUserDetails();
    }
    if (!cmsData) {
      getCmsData();
    }
  }, []);

  return (
    <ProfileFlowView
      GeneralList={GeneralList}
      logout={logout}
      userData={userData}
      isModalVisible={isModalVisible}
      toggleModal={toggleModal}
      askToDelete={askToDelete}
      loading={loading}
      user={user}
    />
  );
};

export default ProfileFlow;
