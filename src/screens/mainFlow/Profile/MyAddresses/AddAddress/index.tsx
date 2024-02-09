import React,{useEffect, useState} from 'react';
import moment from 'moment';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getKeyFromStorage} from '../../../../../helpers/AsyncStorage';
import {
  ICON_NAMES,
  IMAGE_NAMES,
  STORAGE_KEYS,
} from '../../../../../helpers/constants';
import {navigate} from '../../../../../navigation';
import {
  usePostaddAddressMutation,
  usePostupdateAddressMutation,
} from '../../../../../services/home';
import ShowToast from '../../../../../utils/Toast';
import {generateEncryptedKey} from '../../../../../widgets/CryptoPrivacy';
import {AddAddressView} from './AddAddressView';

const AddAddress = (props: any) => {
  var {data} = props?.route?.params;

  
  const dispatch = useDispatch();
  const [addAddressApi] = usePostaddAddressMutation();
  const [updateAddressApi] = usePostupdateAddressMutation();
  const [loading, setLoading] = useState(false);
  const [addressId, setaddressId] = useState(data?.id);
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [home, setHome] = useState(true);
  const [work, setWork] = useState(false);
  const [other, setOther] = useState(false);
  const [buildingno, setBuildingno] = useState('');
  const [apartmentno, setApartmentno] = useState('');
  const [area, setArea] = useState('');
  const [selectedAdrsType, setSelectedAdrsType] = useState(1);
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState(30.6543768740163);
  const [long, setLong] = useState(76.788462997417);

  const [addressName, setAddress] = useState('');
  const [coordinates, setcoordinates] = useState({
    mapRegion: {
      latitude: 10,
      longitude: 10,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markerCoordinate: {
      latitude: 10,
      longitude: 10,
    },
  });
  

  const [addressFeilds, setAddressFeilds] = useState({
    address_line1: data?.data?.address_line1 || '',
    address_line2: data?.data?.address_line2 || '',
    state: data?.data?.state || '',
    city: data?.data?.city || '',
    zipcode: data?.data?.zipcode || '',
  });
  const [addressType, setaddressType] = useState([
    {
      id: 1,
      name: 'Home',
      image: IMAGE_NAMES.home,
    },
    {
      id: 2,
      name: 'Work',
      image: ICON_NAMES.building,
    },
    {
      id: 3,
      name: 'Other',
      image: ICON_NAMES.locationIcn,
    },
  ]);

  useEffect(() => {
    if (data !== null) {
      setLocation(data?.address1);
      setApartmentno(data?.apartmentNo!==null? JSON.stringify(data?.apartmentNo) : '');
      setBuildingno(data?.buildingNo!==null?  JSON.stringify(data?.buildingNo) : '');
      setSelectedAdrsType(data?.addressType);
      setLat(JSON.parse(data?.latitude));
      setLong(JSON.parse(data?.longitude));
      setAddress(data?.address1);
      setCity(data?.city);
      setRegion(data.region);
      setArea(data.area);
      setSelectedAdrsType(JSON.parse(data?.addressType));

      setcoordinates({
        ...coordinates,
        mapRegion: {
          latitude: data?.latitude,
          longitude: data?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        markerCoordinate: {
          latitude: data?.latitude,
          longitude: data?.longitude,
        },
      });
    }
  }, []);

  const getLocAddress = (data, details) => {
    setLat(details?.geometry?.location?.lat);
    setLong(details?.geometry?.location?.lng);
   
    setAddress(data?.description);
    setCity(
      data.terms.length > 2 ? data.terms[data.terms.length - 3].value : '',
    );
    setRegion(data.terms[data.terms.length - 2].value);
    setArea(data.terms[data.terms.length - 1].value);
    setcoordinates({
      ...coordinates,
      mapRegion: {
        latitude: details?.geometry?.location?.lat,
        longitude: details?.geometry?.location?.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markerCoordinate: {
        latitude: details?.geometry?.location?.lat,
        longitude: details?.geometry?.location?.lng,
      },
    });
  };
  
  const addAddress = async () => {
    if (!addressName?.length||!city?.length) {
      ShowToast('Please add your location');
    } else {
      let data = {
        address1: addressName,
        buildingNo: buildingno,
        apartmentNo: apartmentno,
        city: city,
        area: area,
        region: region,
        latitude: lat,
        longitude: long,
        addressType: selectedAdrsType,

        appkey: moment.utc().valueOf().toString(),
      };
      const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
      const body = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      var payload;
      try {
        if (addressId === null || addressId === undefined) {
          setLoading(true);

          payload = await addAddressApi(body).unwrap();
        } else {
          setLoading(true);
         

          payload = await updateAddressApi({
            body,
            id: addressId,
          }).unwrap();
        }

        setLoading(false);

        const token = await getKeyFromStorage(STORAGE_KEYS.token);
        if (payload.statusCode === 200) {
          navigate('MyAddresses', undefined);
          // setVendorData(payload?.data?.Vendor);
        }
      } catch (error) {
        console.log(error, '<==dfdfd');

        setLoading(false);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <AddAddressView
        addressFeilds={addressFeilds}
        setAddressFeilds={setAddressFeilds}
        getLocAddress={getLocAddress}
        coordinates={coordinates}
        setAddress={setAddress}
        addressName={addressName}
        loading={loading}
        addAddress={addAddress}
        location={location}
        setLocation={setLocation}
        setSelectedAdrsType={setSelectedAdrsType}
        selectedAdrsType={selectedAdrsType}
        addressType={addressType}
        city={city}
        region={region}
        home={home}
        work={work}
        other={other}
        buildingno={buildingno}
        apartmentno={apartmentno}
        area={area}
        setCity={setCity}
        setRegion={setRegion}
        setHome={setHome}
        setWork={setWork}
        setOther={setOther}
        setBuildingno={setBuildingno}
        setApartmentno={setApartmentno}
        setArea={setArea}
      />
    </View>
  );
};

export default AddAddress;
