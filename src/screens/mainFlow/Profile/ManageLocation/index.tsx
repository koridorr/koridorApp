import React, {SetStateAction, useEffect, useState} from 'react';
import {addKeyToStorage, getKeyFromStorage} from '../../../../helpers/AsyncStorage';
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
import {navigate} from '../../../../navigation';
import useAuth from '../../../../hooks/useAuth';
import {IsValidEmail, isString} from '../../../../utils/Validations';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import moment from 'moment';
import {PermissionsAndroid, Platform} from 'react-native';
import { ManageLocationView } from './ManageLocationView';

const ManageLocation = (props: any) => {
  const [vendors, setVendors] = useState([
    { label: 'HDFC Bank', value: 'HDFC' },
    { label: 'PUNB Bank', value: 'PUNB' },
    { label: 'ICI Bank', value: 'ICI' },
  ])
  const [addressName, setAddress] = useState('');
const [selectedVen, setSelectedVen] = useState('')
  const [loading, setLoading] = useState(false);
 const [location, setLocation] = useState('' as any)
  const [getProfile] = useLazyGetProfileQuery();
  const dispatch = useAppDispatch();


  const handleSubmit = async () => {
 
  };


  const getLocAddress = (data: { description: React.SetStateAction<string>; terms: string | any[]; },details: any) => { 
    if (details?.geometry?.location) {
      
      setLocation({
        lat:details?.geometry?.location?.lat,
        long:details?.geometry?.location?.lng
      })
    }
    setAddress(data?.description);
  };



  const getUserDetails = async () => {
    const token = await getKeyFromStorage(STORAGE_KEYS.token);
    try {
      setLoading(true);
      const payload = await getProfile({}).unwrap();
      setLoading(false);

      
    } catch (error) {
      setLoading(false);

      console.log({error});
    }
  };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  return (
    <ManageLocationView    
      loading={loading}
      handleSubmit={handleSubmit}
      getLocAddress={getLocAddress}
      addressName={addressName}
      setAddress={setAddress}
      setVendors={setVendors}
      vendors={vendors}
      setSelectedVen={setSelectedVen}
      selectedVen={selectedVen}
       submitted={false} setLocation={function (value: SetStateAction<string>): void {
        throw new Error('Function not implemented.');
      } }    />
  );
};

export default ManageLocation;
