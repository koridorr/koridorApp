import React, {useEffect, useState} from 'react';
import EditProfileView from './EditProfileView';
import {
  addKeyToStorage,
  getKeyFromStorage,
} from '../../../../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../../../../helpers/constants';
import {setCredentials} from '../../../../reducers/authSlice';
import {useAppDispatch} from '../../../../hooks/store';
import {
  useLazyGetProfileQuery,
  usePutProfileSetupMutation,
} from '../../../../services/auth';
import {ImageResponse, User} from '../../../../types/User';
import {ImagePicker} from '../../../../widgets';
import {UploadImage} from '../../../../utils/ImageUpload';
import ShowToast from '../../../../utils/Toast';
import {goBack, navigate} from '../../../../navigation';
import useAuth from '../../../../hooks/useAuth';
import {IsValidEmail, isString} from '../../../../utils/Validations';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import moment from 'moment';
import {PermissionsAndroid, Platform} from 'react-native';
import {useGetGetAllVendorsMutation} from '../../../../services/home';

const EditProfile = (props: any) => {
  const [countryName, setCountryName] = useState('IN');
  const user = useAuth();
  // console.log(user, '===>USERDATA');
  const [countryCode, setCountryCode] = useState('+91');
  const [userData, setUserData] = useState<User>();
  const [allowLoc, setAllowLoc] = useState(false);
  const [getAllVendors] = useGetGetAllVendorsMutation();

  const [roomNo, setRoomNo] = useState(
    user ? JSON.stringify(user?.roomNo) : undefined,
  );
  const [vendors, setVendors] = useState([]);
  const [selectedVen, setSelectedVen] = useState<any>('');
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: userData?.email || '',
    phoneNumber: userData?.phoneNo || '',
    alternativePhoneNo: '',
    city: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitCampus, setSubmitCampus] = useState(false);
  const [profileImage, setProfileImage] = useState<ImageResponse>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [alternativeCountryName, setAlternativeCountryName] = useState('IN');
  const [alternativeCountryCode, setAlternativeCountryCode] = useState('+91');
  const [vendor, setVendor] = useState<any>(user?.vendorId | '');
  const [region, setRegion] = useState('');
  const [addressName, setAddress] = useState('');
  const [location, setLocation] = useState('' as any);
  const [profileSetup] = usePutProfileSetupMutation();
  const [getProfile] = useLazyGetProfileQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getVendors();
  }, []);

  useEffect(() => {
    if (vendor !== '') {
      getSelctedVendor();
    }
  }, [vendors, vendor]);
  const getSelctedVendor = () => {
    const storeName = vendors?.filter((item: any) => item?._id == vendor);
    if (selectedVen === '' || selectedVen == undefined) {
      setSelectedVen(storeName[0]);
    }
  };

  const getVendors = async () => {
    try {
      setLoading(true);
      const payload: any = await getAllVendors({}).unwrap();

      setLoading(false);
      if (payload.statusCode === 200) {
        setVendors(payload?.data?.Vendor);
        // console.log(payload?.data?.Vendor, '=====Data');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (
      !values.firstName.length ||
      !isString(values?.firstName) ||
      !values.email.length ||
      !IsValidEmail(values?.email) ||
      values.phoneNumber.length < 7 ||
      location == '' ||
      addressName === null
    ) {
      ShowToast('Marked fields are required !');
    } else {
      const body = {
        firstName: values.firstName,
        phoneNo: values.phoneNumber,
        email: userData?.email || values.email,
        dialCode: userData?.dialCode || countryCode,
        emergencyDialCode: alternativeCountryCode,
        emergencyPhoneNo: values.alternativePhoneNo,
        image: profileImage?.image,
        isoCode: countryName,
        emergengyIsoCode: alternativeCountryName,
        city: addressName,
        appkey: moment.utc().valueOf().toString(),
      };

      const encryptedKey = generateEncryptedKey(body) || {sek: '', hash: ''};
      const encryptedBody: any = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };

      try {
        setLoading(true);
        const payload = await profileSetup(encryptedBody).unwrap();

        const token = await getKeyFromStorage(STORAGE_KEYS.token);

        setLoading(false);

        if (payload.statusCode === 200) {
          dispatch(
            setCredentials({
              user: payload?.data || null,
              token: JSON.parse(token) || null,
            }),
          );
          ShowToast(payload.message);
          goBack();
          // navigate('ProfileScreen', undefined);
        }
      } catch (error: any) {
        ShowToast(error?.data?.message || '');

        setLoading(false);
        console.log({error});
      }
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleImageUpload = async (isCamera: boolean) => {
    setLoading(true);
    try {
      let image = null;
      if (isCamera) {
        image = await ImagePicker.OpenCameraForImage();
      } else {
        image = await ImagePicker.SingleImagePicker();
      }
      if (image && image !== '') {
        toggleModal();
        const res = await UploadImage(image);

        if (res.statusCode === 200) {
          setProfileImage(res?.data);
        }
      }
      setLoading(false);
      toggleModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCameraImage = async () => {
    handleImageUpload(true);
    if (Platform.OS === 'android') {
      toggleModal();
    }
  };

  const updateCampus = async () => {
    setSubmitCampus(true);
    if (
      roomNo == undefined ||
      !roomNo?.length ||
      selectedVen == '' ||
      selectedVen == undefined
    ) {
      ShowToast('Marked fields are required !');
    } else {
      const body = {
        roomNo,
        vendorId: selectedVen?._id,
        appkey: moment.utc().valueOf().toString(),
      };

      const encryptedKey = generateEncryptedKey(body) || {sek: '', hash: ''};
      const encryptedBody: any = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };

      try {
        setLoading(true);
        const payload = await profileSetup(encryptedBody).unwrap();

        const token = await getKeyFromStorage(STORAGE_KEYS.token);

        setLoading(false);

        if (payload.statusCode === 200) {
          getUserDetails();
          // dispatch(
          //   setCredentials({
          //     user: payload?.data || null,
          //     token: JSON.parse(token) || null,
          //   }),
          // );
          ShowToast(payload.message);
          goBack();
          // navigate('ProfileScreen', undefined);
        }
      } catch (error: any) {
        ShowToast(error?.data?.message || '');

        setLoading(false);
        console.log({error});
      }
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

  const handleGalleryImage = async () => {
    handleImageUpload(false);
    if (Platform.OS === 'android') {
      toggleModal();
    }
  };

  const getUserDetails = async () => {
    const token = await getKeyFromStorage(STORAGE_KEYS.token);
    try {
      setLoading(true);
      const payload = await getProfile({}).unwrap();

      setLoading(false);

      if (payload.statusCode === 200) {
        dispatch(
          setCredentials({
            user: payload?.data || null,
            token: JSON.parse(token) || null,
          }),
        );
        setUserData(payload?.data);
        setValues({
          ...values,
          firstName: payload?.data?.firstName || '',
          lastName: payload?.data?.lastName || '',
          email: payload?.data?.email || '',
          phoneNumber: payload?.data?.phoneNo || '',
          alternativePhoneNo: payload?.data?.emergencyPhoneNo || '',
          city: payload?.data?.city || '',
        });

        setAddress(payload?.data?.city);
        setCountryCode(payload?.data?.dialCode || '+91');
        setCountryName(payload?.data?.isoCode || 'IN');
        setAlternativeCountryCode(payload?.data?.emergencyDialCode || '+91');
        setProfileImage(payload?.data as any);
        setAlternativeCountryName(payload?.data?.emergengyIsoCode || 'IN');
        setRoomNo(JSON.stringify(payload?.data?.roomNo));
        setVendor(payload?.data?.vendorId);

        setLocation({
          lat: payload?.data?.latitude,
          long: payload?.data?.longitude,
        });
      }
    } catch (error) {
      setLoading(false);

      console.log({error});
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <EditProfileView
      roomNo={roomNo}
      setRoomNo={setRoomNo}
      setVendors={setVendors}
      vendors={vendors}
      setSelectedVen={setSelectedVen}
      selectedVen={selectedVen}
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
      handleSubmit={handleSubmit}
      setAlternativeCountryCode={setAlternativeCountryCode}
      alternativeCountryCode={alternativeCountryCode}
      handleCameraImage={handleCameraImage}
      handleGalleryImage={handleGalleryImage}
      isModalVisible={isModalVisible}
      profileImage={profileImage}
      toggleModal={toggleModal}
      userData={userData}
      getLocAddress={getLocAddress}
      addressName={addressName}
      setAddress={setAddress}
      updateCampus={updateCampus}
      submitCampus={submitCampus}
    />
  );
};

export default EditProfile;
