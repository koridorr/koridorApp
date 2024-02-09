import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { addKeyToStorage, getKeyFromStorage } from '../../../../helpers/AsyncStorage';
import {ICON_NAMES, STORAGE_KEYS} from '../../../../helpers/constants';
import { useDeleteAddressMutation, usePostgetAddressMutation } from '../../../../services/home';
import { generateEncryptedKey } from '../../../../widgets/CryptoPrivacy';
import {useFocusEffect} from '@react-navigation/native';
import {MyAddressesView} from './MyAddressesView';
import { navigate } from '../../../../navigation';
import React from 'react';

const MyAddresses = (props: any) => {
  const [getAddressApi] = usePostgetAddressMutation();
  const [deleteAddressApi] = useDeleteAddressMutation();
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState([])
  const [selctedAddress, setSelctedAddress] = useState('')

  

  useFocusEffect(
    useCallback(() => {
        getaddressData()
    }, []),
  );

  const getaddressData = async () => {
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
      const payload :any = await getAddressApi( body).unwrap();
      setLoading(false);
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      if (payload.statusCode === 200) {
        setAddressData(payload?.data?.address)
        const address = await getKeyFromStorage(STORAGE_KEYS.Address);
        if (address?.length &&address) {
          setSelctedAddress(address)
        } else {
          
          await addKeyToStorage(STORAGE_KEYS.Address ,payload?.data?.address[0]?._id);
        }
      }
    } catch (error) {
      
      setLoading(false);
    }


  };

  
  const editAddress =(item:any)=>{
    navigate('AddAddress', {data:item})
  }
  const deleteAddress =async(id :any)=>{
    try {
      setLoading(true);
      const payload = await deleteAddressApi( id).unwrap();
      setLoading(false);
      
      const token = await getKeyFromStorage(STORAGE_KEYS.token);
      
      if (payload.statusCode === 200) {
        // setAddressData(payload?.data?.address)
        getaddressData()
      }
    } catch (error) {
      console.log(error,'<==delete==');
      
      setLoading(false);
    }
  }

const setAddress=async(id:string)=>{
  await addKeyToStorage(STORAGE_KEYS.Address ,id);
  setSelctedAddress(id)
}

  return <MyAddressesView editAddress={setAddress} setSelctedAddress={setSelctedAddress} selctedAddress={selctedAddress}  deleteAddress={deleteAddress} editAddress={editAddress} loading={loading} GeneralList={addressData} />;
};

export default MyAddresses;
