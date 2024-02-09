import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {MyAddressCard, Text, Touchable} from '../../../../components';

import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {ProfileListType} from '../../../../types/ProfileList.d.types';

import {Button, Header} from '../../../../widgets';
import {goBack, navigate} from '../../../../navigation';
import FastImage from 'react-native-fast-image';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import Loader from '../../../../widgets/Loader';
import React,{Dispatch, SetStateAction} from 'react';
type addressType = {
  _id: string;
  address1: string;
  address2: string;
  addressType: number;
  apartmentNo: number;
  area: string;
  buildingNo: number;
  city: string;
};
type ProfileFlowViewType = {
  loading: boolean;
  GeneralList: ProfileListType[];
  editAddress: (item: any) => void;
  deleteAddress: (id: number) => void;
  setAddress: () => void;
  selctedAddress: addressType;
  setSelctedAddress: Dispatch<SetStateAction<addressType>>;
};

export const MyAddressesView = ({
  GeneralList,
  loading,
  editAddress,
  deleteAddress,
  selctedAddress,
  setSelctedAddress,
  setAddress,
}: ProfileFlowViewType) => (
  <>
    <View style={styles.header}>
      <Loader loading={loading} />
      <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
        <Touchable onPress={() => goBack()}>
          <FastImage
            source={IMAGE_NAMES.arrow_left}
            style={{height: 25, width: 25, right: 7}}
            resizeMode="contain"
          />
        </Touchable>
        <Text fontSize={18} fontFamily={fonts.BOLD}>
          My Addresses
        </Text>
      </View>
    </View>
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={
          {
            // paddingBottom: screenHeight / 10,
          }
        }>
        {GeneralList?.length > 0 ? (
          <View style={{paddingTop: 15}}>
            {GeneralList?.map((item, index) => {              
              return (
                <View style={{paddingVertical: 8}} key={index}>
                  <View
                    style={{
                      // backgroundColor:
                      //   selctedAddress == item?._id ? colors.green : '#F7FFE9',
                      justifyContent: 'center',
                      borderRadius: 5,
                      paddingVertical: 18,
                    }}>
                    <Touchable
                      onPress={() => 
                        console.log('dsd')
                        
                        // setAddress(item?._id)
                      }
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        alignSelf: 'center',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <FastImage
                            source={
                              item.addressType === '1'
                                ? ICON_NAMES.home
                                : item.addressType === '2'
                                ? ICON_NAMES.building
                                : ICON_NAMES.locationIcn
                            }
                            style={{
                              height: 18,
                              width: 18,
                              top: 5,
                            }}
                          />
                        </View>
                        {/* <View style={{paddingLeft: 11}}>
                          <Text
                            fontSize={14}
                            color="#292D32"
                            fontFamily={fonts.REGULAR}>
                            {item.addressType === '1'
                              ? 'Home'
                              : item.addressType === '2'
                              ? 'Work'
                              : 'Others'}
                          </Text>
                          <Text
                            customStyle={{width: screenWidth / 1.7}}
                            fontSize={12}
                            color="#84869A">
                            {item.apartmentNo ||
                            '' + ' ' + item?.address1?.length > 30
                              ? `${item?.buildingNo?item?.buildingNo:''} ${item?.address1?.slice(0, 35)} ` + '..'
                              : `${item?.buildingNo?item?.buildingNo:''} ${item?.address1}`}
                          </Text>
                        </View> */}
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Touchable onPress={() => editAddress(item)}>
                          <FastImage
                            source={ICON_NAMES.pencil}
                            style={{
                              height: 23,
                              width: 23,
                              paddingLeft: 2,
                            }}
                            resizeMode="contain"
                          />
                        </Touchable>
                        <Touchable 
                        onPress={() => 
                        deleteAddress(item?.id)}>
                          <FastImage
                            source={ICON_NAMES.delete}
                            style={{
                              height: 23,
                              width: 23,
                              left: 12,
                            }}
                            resizeMode="contain"
                          />
                        </Touchable>
                      </View>
                    </Touchable>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={{alignSelf: 'center', paddingTop: screenHeight / 2.7}}>
            <Text fontFamily={fonts.BOLD}>No data found</Text>
          </View>
        )}
      </ScrollView>

      <View style={{paddingVertical: 10, bottom: 11}}>
        <Button
          onPress={() => navigate('AddAddress', {data: null})}
          value="Add New"
        />
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  header: {
    backgroundColor: 'white',
    elevation: 5, // Adjust the value to control the shadow intensity
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
