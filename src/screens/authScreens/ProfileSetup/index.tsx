import React, {SetStateAction, useEffect, useState} from 'react';
import ProfileSetupView from './ProfileSetupView';
import ShowToast from '../../../utils/Toast';
import {
  addKeyToStorage,
  getKeyFromStorage,
} from '../../../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../../../helpers/constants';
import {useAppDispatch} from '../../../hooks/store';
import {PermissionsAndroid, Platform, Linking, Alert} from 'react-native';
import {usePutProfileSetupMutation} from '../../../services/auth';
import {setCredentials} from '../../../reducers/authSlice';
import {ImagePicker} from '../../../widgets';
import {UploadImage} from '../../../utils/ImageUpload';
import {ImageResponse} from '../../../types/User';
import {navigate, replace} from '../../../navigation';
import {IsValidEmail, isValidPassword} from '../../../utils/Validations';
import {generateEncryptedKey} from '../../../widgets/CryptoPrivacy';
import moment from 'moment';
import {useGetGetAllVendorsMutation} from '../../../services/home';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
type AddressType = {
  address_line1: string;
  address_line2: string;
  state: string;
  city: string;
  zipcode: string;
  id: number;
};
const ProfileSetup = (props: any) => {
  const {data, type, photo} = props.route.params;
  const dispatch = useAppDispatch();
  const [profileSetup] = usePutProfileSetupMutation();
  const [getAllVendors] = useGetGetAllVendorsMutation();
  const [roomNo, setRoomNo] = useState(undefined);
  const [vendors, setVendors] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [addressName, setAddress] = useState('');
  const [selectedVen, setSelectedVen] = useState<any>('');
  const [search, setSearch] = useState('');
  const [values, setValues] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    phoneNumber: data?.phoneNo || '',
    alternativePhoneNo: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [profileImage, setProfileImage] = useState<ImageResponse>({
    image: photo,
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [countryName, setCountryName] = useState(data?.isoCode || 'IN');
  const [alternativeCountryName, setAlternativeCountryName] = useState('IN');
  const [countryCode, setCountryCode] = useState(data?.dialCode || '+91');
  const [alternativeCountryCode, setAlternativeCountryCode] = useState('+91');
  const [location, setLocation] = useState('' as any);
  const [allowLoc, setAllowLoc] = useState(false);
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [permission, setPermission] = useState(false);

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

  const handleSubmit = async () => {
    const facmToken = await getKeyFromStorage(STORAGE_KEYS.fcmToken);
    setSubmitted(true);

    if (
      !values.firstName.length ||
      !values.email.length ||
      !IsValidEmail(values?.email) ||
      values.phoneNumber.length < 7 ||
      (roomNo == undefined && type === 'google') ||
      (!roomNo?.length && type === 'google') ||
      (selectedVen == '' && type === 'google') ||
      (selectedVen == undefined && type === 'google')
    ) {
      ShowToast('Marked fields are required !');
    } else if (
      type !== 'google' &&
      (!password?.length || !conPassword?.length)
    ) {
      ShowToast('Please enter password and confirm password');
    } else if (!isValidPassword(password)) {
      ShowToast(
        'Must contain 8 or more characters, one uppercase, one lowercase, one number and one special character.',
      );
    } else if (password !== conPassword) {
      ShowToast("Password doesn't match");
    } else {
      const input = {
        firstName: values.firstName,
        phoneNo: values.phoneNumber,
        email: data?.email || values.email,
        dialCode: data?.country_code || countryCode,
        emergencyDialCode: alternativeCountryCode,
        emergencyPhoneNo: values.alternativePhoneNo,
        image: profileImage?.image,
        isoCode: countryName,
        emergengyIsoCode: alternativeCountryName,
        deviceToken: facmToken,
        deviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
        latitude: location?.lat,
        longitude: location?.long,
        newPassword: conPassword,
        profileSetup: type == 'google' ? true : false,
        appkey: moment.utc().valueOf().toString(),
      };
      type == 'google' ? (input['roomNo'] = roomNo) : '';
      type == 'google' ? (input['vendorId'] = selectedVen?._id) : '';
      type == 'google' ? (input['city'] = addressName) : '';

      const encryptedKey = generateEncryptedKey(input) || {sek: '', hash: ''};
      const body: any = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      try {
        setLoading(true);
        const payload = await profileSetup(body).unwrap();
        const token = await getKeyFromStorage(STORAGE_KEYS.token);
        setLoading(false);
        if (payload.statusCode === 200) {
          await addKeyToStorage(STORAGE_KEYS.isProfileComplete, true);
          dispatch(
            setCredentials({
              user: payload?.data || null,
              token: JSON.parse(token) || null,
            }),
          );
          ShowToast(payload.message);
          replace('OtpVerification', {
            data: payload?.data,
            phone: data?.isPhoneVerified,
            method: 'Home',
            type: 'noSocial',
          });
          // replace('AuthFlow', {screen: 'WelcomeScreen'});
        }
      } catch (error: any) {
        console.log(error, 'errrrr');
        ShowToast(error?.data?.message || 'Please try again');
        setLoading(false);
      }
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleImageUpload = async (isCamera: boolean) => {
    try {
      let image = null;
      if (isCamera) {
        image = await ImagePicker.OpenCameraForImage();
      } else {
        image = await ImagePicker.SingleImagePicker();
      }
      toggleModal();
      setLoading(true);
      if (image && image !== '') {
        const res = await UploadImage(image);
        if (res.statusCode === 200) {
          setProfileImage(res?.data);
        }
      }

      setLoading(false);
      toggleModal();
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCameraImage = () => {
    handleImageUpload(true);
    if (Platform.OS === 'android') {
      toggleModal();
    }
  };

  const handleGalleryImage = async () => {
    handleImageUpload(false);
    if (Platform.OS === 'android') {
      toggleModal();
    }
  };

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
    setValues({
      ...values,
      city:
        data.terms.length > 2 ? data.terms[data.terms.length - 3].value : '',
    });
  };

  return (
    <ProfileSetupView
      setConPassword={setConPassword}
      conPassword={conPassword}
      password={password}
      setPassword={setPassword}
      loading={loading}
      setCountryCode={setCountryCode}
      setCountryName={setCountryName}
      countryName={countryName}
      countryCode={countryCode}
      values={values}
      alternativeCountryName={alternativeCountryName}
      setAlternativeCountryName={setAlternativeCountryName}
      setValues={setValues}
      submitted={submitted}
      isMobileDisabled={data?.phoneNo ? true : false}
      isEmailDisabled={data?.email ? true : false}
      handleSubmit={handleSubmit}
      setAlternativeCountryCode={setAlternativeCountryCode}
      alternativeCountryCode={alternativeCountryCode}
      handleCameraImage={handleCameraImage}
      handleGalleryImage={handleGalleryImage}
      isModalVisible={isModalVisible}
      profileImage={profileImage}
      toggleModal={toggleModal}
      data={data}
      type={type}
      // getLocAddress={getLocAddress}
      setAddress={setAddress}
      addressName={addressName}
      setAddressFeilds={function (value: SetStateAction<AddressType>): void {
        throw new Error('Function not implemented.');
      }}
      getLocAddress={getLocAddress}
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
    />
  );
};

export default ProfileSetup;
