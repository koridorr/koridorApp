import React, {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

import SignUpView from './signUpView';
import {
  usePostLoginMutation,
  usePostSignUpMutation,
  usePostSocialLoginMutation,
} from '../../../services/auth';
import {useFocusEffect} from '@react-navigation/native';
import ShowToast from '../../../utils/Toast';
import {
  IsValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from '../../../utils/Validations';
import {navigate, replace} from '../../../navigation';

import {useAppDispatch} from '../../../hooks/store';
import {
  addKeyToStorage,
  getKeyFromStorage,
  removeKeyFromStorage,
} from '../../../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../../../helpers/constants';
import {setCredentials} from '../../../reducers/authSlice';
import {generateEncryptedKey} from '../../../widgets/CryptoPrivacy';
import appleAuth from '@invertase/react-native-apple-authentication';
import moment from 'moment';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {socialLoginType} from '../../../types/User';
import Geolocation from '@react-native-community/geolocation';
import {useGetGetAllVendorsMutation} from '../../../services/home';
const SignUp = (props: any) => {
  const {isVisited} = props?.route?.params;
  const [getAllVendors] = useGetGetAllVendorsMutation();
  const [roomNo, setRoomNo] = useState(undefined);
  const [vendors, setVendors] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [withEmail, setWithEmail] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryName, setCountryName] = useState('IN');
  const [countryCode, setCountryCode] = useState('+91');
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(isVisited ? true : false);
  const [check, setCheck] = useState(false);
  const [addressName, setAddress] = useState('');
  const [selectedVen, setSelectedVen] = useState<any>('');
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState<{
    long: any;
    lat: any | string;
  }>('');
  const [isFocused, setIsFocused] = useState(false);
  const [postLogin] = usePostLoginMutation();
  const dispatch = useAppDispatch();
  const [signUp] = usePostSignUpMutation();
  const [socialLogin] = usePostSocialLoginMutation();
  const loginOption = () => {
    setLogin(!login);
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      GoogleSignin.configure({
        iosClientId:
          '297413013468-ff1cc8q9qhul73u8unbmtd964g7tn0d4.apps.googleusercontent.com',
        offlineAccess: false,
      });
    } else {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId:
          '297413013468-d2feoaihj1k62r5bdbplmmana0cmctsq.apps.googleusercontent.com',
        offlineAccess: true,
      });
    }
  }, []);
  const _isGoogleLogin = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      GoogleSignin.signIn().then(data => {
        var googleuser = data;
        const currentUser = GoogleSignin.getTokens().then(async res => {
          const token = JSON.stringify(res.accessToken);

          await addKeyToStorage(STORAGE_KEYS.token, token);
          var postData = {
            access_token: res.accessToken,
            code: '',
            id_token: data.idToken,
          };
          googleLogin(googleuser as unknown as socialLoginType);
        });
      });
    } catch (error) {
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
  };
  async function googleLogin(data: socialLoginType) {
    const facmToken = await getKeyFromStorage(STORAGE_KEYS.fcmToken);

    const body = {
      email: data?.user?.email,
      firstName: data?.user?.givenName,
      lastName: data?.user?.familyName,
      googleId: data?.user?.id,
      deviceType: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
      deviceToken: facmToken || 'dadasd',
      appkey: moment.utc().valueOf().toString(),
    };
    try {
      const encryptedKey = generateEncryptedKey(body) || {
        sek: '',
        hash: '',
      };
      const params = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      setLoading(true);
      const payload = await socialLogin(params).unwrap();
      setLoading(false);
      if (payload.statusCode === 200) {
        await addKeyToStorage(
          STORAGE_KEYS.isProfileComplete,
          payload?.data?.isProfileCompleted,
        );
        const authToken = JSON.stringify(payload?.data?.accessToken);
        await addKeyToStorage(STORAGE_KEYS.token, authToken);
        ShowToast(payload?.message);
        dispatch(
          setCredentials({
            user: null,
            token: payload?.data?.accessToken || null,
          }),
        );
        if (payload?.data?.isProfileCompleted) {
          replace('MainFlow', {screen: 'HomeScreen'});
        } else {
          props.navigation.navigate('ProfileSetup', {
            data: payload?.data,
            photo: data?.user?.photo,
            type: 'google',
          });
        }
      }
    } catch (error: any) {
      setLoading(false);
      ShowToast(error?.data?.message);
    }
  }

  const getVendors = async () => {
    try {
      setLoading(true);
      const payload: any = await getAllVendors({}).unwrap();

      setLoading(false);
      if (payload.statusCode === 200) {
        setVendors(payload?.data?.Vendor);
      }
    } catch (error) {
      console.log(error, 'error');

      setLoading(false);
    }
  };

  useEffect(() => {
    getVendors();
  }, []);

  const handleSubmitForPhone = async () => {
    setSubmitted(true);
    if (
      !phoneNumber.length ||
      !addressName?.length ||
      selectedVen === '' ||
      roomNo == undefined ||
      roomNo == ''
    ) {
      ShowToast('All fields are required');
    } else if (phoneNumber?.length < 7) {
      ShowToast(
        `Please enter${
          phoneNumber.length === 0 ? '' : ' a valid'
        } phone number`,
      );
    } else if (!isChecked) {
      ShowToast('Please read and accept all the Terms & Conditions');
    } else {
      try {
        let data = {
          phoneNo: phoneNumber,
          verify: 1,
          // password,
          roomNo,
          vendorId: selectedVen?._id,
          latitude: location?.lat,
          longitude: location?.long,
          dialCode: countryCode,
          isoCode: countryName,
          appkey: moment.utc().valueOf().toString(),
          city: addressName,
        };
        const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
        const body: any = {
          sek: encryptedKey.sek || '',
          hash: encryptedKey.hash || '',
        };

        setLoading(true);
        const payload = await signUp(body).unwrap();
        setLoading(false);

        if (payload.statusCode === 200) {
          navigate('OtpVerify', {
            data: payload?.data,
            phone: true,
            method: 'login',
          });
        }
      } catch (error: any) {
        setLoading(false);
        ShowToast(error?.data?.message);
      }
    }
  };
  const handleSubmitForEmail = async () => {
    setSubmitted(true);
    if (
      !email?.length ||
      !addressName?.length ||
      selectedVen === '' ||
      roomNo == null
    ) {
      ShowToast('All fields are required');
    } else if (!IsValidEmail(email)) {
      ShowToast('Please enter a valid email');
    } else if (!isChecked) {
      ShowToast('Please read and accept all the Terms & Conditions');
    } else {
      try {
        {
          let data = {
            email,
            verify: 0,
            // password,
            roomNo,
            vendorId: selectedVen?._id,
            latitude: location?.lat,
            longitude: location?.long,
            appkey: moment.utc().valueOf().toString(),
            city: addressName,
          };

          const encryptedKey = generateEncryptedKey(data) || {
            sek: '',
            hash: '',
          };

          const body: any = {
            sek: encryptedKey.sek || '',
            hash: encryptedKey.hash || '',
          };

          setLoading(true);

          const payload = await signUp(body).unwrap();
          setLoading(false);

          if (payload.statusCode === 200) {
            navigate('OtpVerify', {
              data: payload?.data,
              phone: false,
              method: 'login',
              type: 'noSocial',
            });
          }
        }
      } catch (error: any) {
        setLoading(false);
        ShowToast(error?.data?.message);
      }
    }
  };

  const loginHandler = async () => {
    const facmToken = await getKeyFromStorage(STORAGE_KEYS.fcmToken);

    if (withEmail && !email.length) {
      ShowToast('Please enter email');
    } else if (withEmail && !IsValidEmail(email)) {
      ShowToast('Please enter a valid email');
    } else if (!withEmail && phoneNumber?.length < 7) {
      ShowToast(
        `Please enter${
          phoneNumber.length === 0 ? '' : ' a valid'
        } phone number`,
      );
    } else if (!password?.length) {
      ShowToast('Please enter password');
    } else if (!isValidPassword(password)) {
      ShowToast('Please enter a valid password');
    } else {
      try {
        let data = {} as {
          phoneNo?: string;
          verify?: number;
          password: string;
          dialCode?: string;
          email?: string;
          isoCode?: string;
          appkey?: string;
        };
        {
          if (withEmail) {
            data = {
              email,
              password,
              deviceToken: facmToken || 'fsdfs',
              deviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
              appkey: moment.utc().valueOf().toString(),
            };
          } else {
            data = {
              phoneNo: phoneNumber,
              dialCode: countryCode,
              isoCode: countryName,
              password,
              deviceToken: facmToken || 'sdfsdf',
              deviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
              appkey: moment.utc().valueOf().toString(),
            };
          }
          roomNo ? (data[roomNo && 'roomNo'] = roomNo) : '';
          selectedVen !== ''
            ? (data[selectedVen?._id && 'vendorId'] = selectedVen?._id)
            : '';
          location ? (data[location?.lat && 'latitude'] = location?.lat) : '';

          location
            ? (data[location?.long && 'longitude'] = location?.long)
            : '';

          addressName !== '' ? (data[addressName && 'city'] = addressName) : '';

          const encryptedKey = generateEncryptedKey(data) || {
            sek: '',
            hash: '',
          };
          const body: any = {
            sek: encryptedKey.sek || '',
            hash: encryptedKey.hash || '',
          };

          if (isEnabled) {
            await addKeyToStorage(
              STORAGE_KEYS.credentials,
              JSON.stringify(data),
            );
          } else {
            await removeKeyFromStorage(STORAGE_KEYS.credentials);
          }
          setLoading(true);
          const payload = await postLogin(body).unwrap();
          setLoading(false);

          if (payload.statusCode === 200) {
            await addKeyToStorage(
              STORAGE_KEYS.isProfileComplete,
              payload?.data?.isProfileCompleted,
            );
            const token = JSON.stringify(payload?.data?.accessToken);
            await addKeyToStorage(STORAGE_KEYS.token, token);
            ShowToast(payload?.message);

            dispatch(
              setCredentials({
                user: payload?.data || null,
                token: payload?.data?.accessToken || null,
              }),
            );
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            setCountryCode('+91');
            setCountryName('IN');

            if (payload?.data?.isProfileCompleted) {
              replace('MainFlow', {screen: 'HomeScreen'});
            } else {
              navigate('ProfileSetup', {
                data: payload?.data,
                type: '',
              });
            }
          }
        }
      } catch (error: any) {
        if (error?.data?.message) {
          ShowToast(error?.data?.message);
        }
        setLoading(false);
      }
    }
  };

  const getCredentials = async () => {
    const creds = await getKeyFromStorage(STORAGE_KEYS.credentials);
    if (creds) {
      const credentials = await JSON.parse(creds);
      setEmail(credentials?.email || '');
      setPassword(credentials?.password || '');
      setPhoneNumber(credentials?.phoneNo || '');
      setCountryCode(credentials?.dialCode || '+91');
      setCountryName(credentials?.isoCode || 'IN');
      setIsEnabled(true);
      if (!login) {
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setCountryCode('+91');
        setCountryName('IN');
      }
    }
  };

  useEffect(() => {
    getCredentials();
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setCountryCode('+91');
    setCountryName('IN');
  }, [login]);

  const register = async () => {
    await addKeyToStorage(STORAGE_KEYS.appVisited, 'true');
  };
  useEffect(() => {
    register();
  }, []);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //------------------------------ login with apple ---------------------------------------
  async function onAppleButtonPress() {
    const facmToken = await getKeyFromStorage(STORAGE_KEYS.fcmToken);

    if (appleAuth.isSupported) {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      if (credentialState === appleAuth.State.AUTHORIZED) {
        var body = {};
        if (
          appleAuthRequestResponse?.email === null ||
          appleAuthRequestResponse?.fullName?.givenName === null
        ) {
          body = {
            appleId: appleAuthRequestResponse?.user,
            deviceType: 'IOS',
            deviceToken: facmToken || 'fsdfdf',
            appkey: moment.utc().valueOf().toString(),
          };
        } else {
          body = {
            email: appleAuthRequestResponse?.email,
            firstName: appleAuthRequestResponse?.fullName?.givenName,
            lastName: '',
            appleId: appleAuthRequestResponse?.user,
            deviceType: 'IOS',
            deviceToken: facmToken || 'vfdsfsdf',
            appkey: moment.utc().valueOf().toString(),
          };
        }

        try {
          const encryptedKey = generateEncryptedKey(body) || {
            sek: '',
            hash: '',
          };
          const params = {
            sek: encryptedKey.sek || '',
            hash: encryptedKey.hash || '',
          };
          setLoading(true);
          const payload = await socialLogin(params).unwrap();
          setLoading(false);
          if (payload.statusCode === 200) {
            await addKeyToStorage(
              STORAGE_KEYS.isProfileComplete,
              payload?.data?.isProfileCompleted,
            );
            const authToken = JSON.stringify(payload?.data?.accessToken);
            await addKeyToStorage(STORAGE_KEYS.token, authToken);
            ShowToast(payload?.message);
            dispatch(
              setCredentials({
                user: null,
                token: payload?.data?.accessToken || null,
              }),
            );
            if (payload?.data?.isProfileCompleted) {
              replace('MainFlow', {screen: 'HomeScreen'});
            } else {
              props.navigation.navigate('ProfileSetup', {
                data: payload?.data,
                type: 'google',
              });
            }
          }
        } catch (error: any) {
          setLoading(false);
          ShowToast(error?.data?.message);
        }
      }
    }
  }
  const getLocAddress = (
    data: {description: React.SetStateAction<string>; terms: string | any[]},
    details: any,
  ) => {
    if (details?.geometry?.location) {
      setLocation({
        lat: details?.geometry?.location?.lat,
        long: details?.geometry?.location?.lng,
      });
    }

    setAddress(data?.description);
  };

  return (
    <SignUpView
      isFocused={isFocused}
      setIsFocused={setIsFocused}
      roomNo={roomNo}
      setRoomNo={setRoomNo}
      setVendors={setVendors}
      setSearch={setSearch}
      search={search}
      vendors={vendors}
      setSelectedVen={setSelectedVen}
      selectedVen={selectedVen}
      getLocAddress={getLocAddress}
      addressName={addressName}
      setAddress={setAddress}
      onAppleButtonPress={onAppleButtonPress}
      isChecked={isChecked}
      withEmail={withEmail}
      isEnabled={isEnabled}
      login={login}
      email={email}
      phoneNumber={phoneNumber}
      countryName={countryName}
      countryCode={countryCode}
      submitted={submitted}
      password={password}
      setWithEmail={setWithEmail}
      setChecked={setChecked}
      toggleSwitch={toggleSwitch}
      setLogin={setLogin}
      loginOption={loginOption}
      setEmail={setEmail}
      setPassword={setPassword}
      setCountryName={setCountryName}
      setCountryCode={setCountryCode}
      setPhoneNumber={setPhoneNumber}
      handleSubmitForPhone={handleSubmitForPhone}
      handleSubmitForEmail={handleSubmitForEmail}
      loading={loading}
      loginHandler={loginHandler}
      isVisited={isVisited}
      _isGoogleLogin={_isGoogleLogin}
    />
  );
};

export default SignUp;
