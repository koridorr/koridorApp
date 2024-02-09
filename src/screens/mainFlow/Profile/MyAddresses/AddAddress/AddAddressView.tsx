import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../../helpers/styles';
import MapView, {PROVIDER_GOOGLE, Marker, LatLng, Region} from 'react-native-maps';
import {Button, Header, Input} from '../../../../../widgets';
import {navigate} from '../../../../../navigation';
import FastImage from 'react-native-fast-image';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../../helpers/constants';
import {PlacesAutocomplete, Text, Touchable} from '../../../../../components';
import {Dispatch, SetStateAction, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import Loader from '../../../../../widgets/Loader';
import {Platform} from 'react-native';
import React from 'react';
type addressTypes = {
  id: number;
  name: string;
  image: string;
};
type Geometry = {
  lat: string;
  lng: string;
};

type AddressType = {
  address_line1: string;
  address_line2: string;
  state: string;
  city: string;
  zipcode: string;
  id: number;
};
type coordinatesType = {
  mapRegion: Region | undefined;
  markerCoordinate: LatLng;
  lat: string;
  long: string;
};
type addressPropTypes = {
  addressFeilds: AddressType;
  city: string;
  region: string;
  buildingno: string;
  apartmentno: string;
  home: string;
  selectedAdrsType: string;
  addressType: addressTypes[];
  area: string;
  location: string;
  loading: boolean;
  geometry: Geometry;
  coordinates: coordinatesType;
  addressName: string;
  setAddressFeilds: Dispatch<SetStateAction<AddressType>>;
  setGeometry: Dispatch<SetStateAction<Geometry>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setLocation: Dispatch<SetStateAction<string>>;
  setBuildingno: Dispatch<SetStateAction<string>>;
  setApartmentno: Dispatch<SetStateAction<string>>;
  setRegion: Dispatch<SetStateAction<string>>;
  setArea: Dispatch<SetStateAction<string>>;
  setSelectedAdrsType: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
  addAddress: () => void;
  getLocAddress: () => void;
  selectAddressType: () => void;
};

export const AddAddressView = ({
  setLocation,
  addressName,
  setAddress,
  loading,
  location,
  addressFeilds,
  setAddressFeilds,
  city,
  selectedAdrsType,
  setSelectedAdrsType,
  setApartmentno,
  setBuildingno,
  setRegion,
  coordinates,
  area,
  setArea,
  addAddress,
  setGeometry,
  region,
  buildingno,
  apartmentno,
  home,
  addressType,
  setCity,
  getLocAddress,
}: addressPropTypes) => {
  return (
    <View>
      <Loader loading={loading} />
      <Header title="Add New Addresses" />
      <KeyboardAwareScrollView
        style={{marginBottom: 40}}
        extraScrollHeight={200}
        keyboardShouldPersistTaps="always"
        listViewDisplayed={false}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <View style={styles.container}>
       
            <View style={{}}>
              <MapView
                mapType={Platform.OS == 'android' ? 'none' : 'standard'}
                style={{
                  height: 250,
                  width: screenWidth/1.1,
                  alignSelf: 'center',
                  borderRadius:8,
                }}
                // provider={PROVIDER_GOOGLE}
                region={coordinates?.mapRegion}
                initialRegion={coordinates?.mapRegion}
                customMapStyle={{height: 100, width: 100}}>
                <Marker coordinate={coordinates.markerCoordinate}>
                  <FastImage
                    source={IMAGE_NAMES.mapLocation}
                    style={{width: 40, height: 40}}
                    resizeMode="contain"
                  />
                </Marker>
              </MapView>
            </View>
          </View>
          <View style={{paddingVertical: 8}} />
          <View style={{flexDirection: 'row'}}>
            {addressType?.map((item, index) => {
              return (
                <View key={index}>
                  <Touchable
                    onPress={() => setSelectedAdrsType(item?.id)}
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          selectedAdrsType === item?.id
                            ? colors.green
                            : '#F7FFE9',
                      },
                    ]}>
                    <FastImage
                      source={item?.image}
                      style={{
                        height: 13,
                        width: 12,
                      }}
                      resizeMode="contain"
                    />
                    <Text fontSize={14} customStyle={{left: 3}}>
                      {item?.name}
                    </Text>
                  </Touchable>
                </View>
              );
            })}
          </View>

       
          <View>
            <View>
              <PlacesAutocomplete
                borderBottomWidth={1}
                width={screenWidth / 1.09}
                bottom={-5}
                highlighted={false}
                addressFeilds={addressName}
                getLocationData={getLocAddress}
                setAddressFeilds={setAddress}
                placeholder="Add location" 
                customContainerStyle={{}}
                 containerStyle={{}} isFocused={false} 
                setIsFocused={function (value: SetStateAction<boolean>): void {
                  throw new Error('Function not implemented.');
                } }              />
              <View
                style={{
                  borderBottomWidth: 0,
                  paddingVertical: 4,
                }}
              />
            </View>

            <Input
             maxLength={4}
              placeholder="Building Number"
              customContainerStyle={{
                borderBottomWidth: 0.6,
              }}
              value={buildingno}
              onChange={val => setBuildingno(val)}
              keyboardType={'numeric'}
            />
            <Input
             maxLength={4}
              placeholder="Apartment Number"
              customContainerStyle={{
                borderBottomWidth: 0.6,
              }}
              value={apartmentno}
              onChange={val => setApartmentno(val)}
              keyboardType={'numeric'}
            />
            <Input
              disabled={false}
              placeholder="City"
              customIconLeft={ICON_NAMES.greyArrow}
              rightIcon
              customContainerStyle={{
                borderBottomWidth: 0.6,
              }}
              value={city}
              onChange={val => setCity(val)}
            />
            <Input
              disabled={true}
              placeholder="Region"
              customIconLeft={ICON_NAMES.greyArrow}
              rightIcon
              customContainerStyle={{
                borderBottomWidth: 0.6,
              }}
              value={region}
              onChange={val => setRegion(val)}
            />
            <Input
              disabled={true}
              placeholder="Area"
              customContainerStyle={{
                borderBottomWidth: 0.6,
              }}
              value={area}
              onChange={val => setArea(val)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 15, top: 20,paddingBottom:22}}>
          <Button onPress={() => addAddress()} value="Add" />
        </View>
        <View style={{paddingVertical: 22}} />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  profileInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.black,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FFE9',
    height: 45,
    width: 110,
    justifyContent: 'center',
    borderRadius: 50,
    margin: 4,
    borderWidth: 0.8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    height: 45,
    width: 110,
    justifyContent: 'center',
    borderRadius: 50,
    margin: 4,
  },
});
