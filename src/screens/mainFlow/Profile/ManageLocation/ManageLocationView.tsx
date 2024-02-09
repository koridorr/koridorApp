import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';
import { PlacesAutocomplete } from '../../../../components';
import { ICON_NAMES, IMAGE_NAMES } from '../../../../helpers/constants';
import { colors, fonts, screenHeight, screenWidth } from '../../../../helpers/styles';
import { Button, Dropdown, Header, Input } from '../../../../widgets';
import { ImageResponse, User } from '../../../../types/User';
import Loader from '../../../../widgets/Loader';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type ProfileSetupPropTypes = {
  submitted: boolean;
  handleSubmit: () => void;
  loading: boolean;
  setAddress: Dispatch<SetStateAction<string>>;
  addressName: string;
  getLocAddress: (data: { description: React.SetStateAction<string>; terms: string | any[]; }, details: any) => void,

  setLocation: Dispatch<SetStateAction<string>>;
  selectedVen: string;
  setVendors: Dispatch<SetStateAction<{ label: string; value: string; }[]>>;
  setSelectedVen: Dispatch<SetStateAction<string>>;
  vendors: { label: string; value: string; }[]
};

export const ManageLocationView = ({
  setSelectedVen,
  selectedVen,
  setVendors,
  submitted,
  vendors,
  handleSubmit,
  loading,
  setAddress,
  addressName,
  getLocAddress
}: ProfileSetupPropTypes) => {

  return (
    <View style={{ height: screenHeight }}>
      <View style={styles.header}>
        <Header title='Edit Location' />

      </View>
      <Loader loading={loading} />
      <View style={{ paddingVertical: 11 }} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraScrollHeight={40}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={true}
        style={{ height: screenHeight / 11 }}
      >
        <View style={styles.container}>


          <View>
            <View style={{
              borderWidth: 1, borderRadius: 12, borderColor: '#F3F3F3',
              paddingVertical: 2,
              flexDirection: "row"
            }}>
              <FastImage
                source={ICON_NAMES.locations}
                resizeMode='contain'
                style={{
                  height: 38,
                  width: 38,
                  alignSelf: 'flex-start',
                  left: 11,
                  top: 5.2
                }}
              />
              <PlacesAutocomplete
                width={screenWidth / 1.2}
                bottom={0}
                borderBottomWidth={0}
                addressFeilds={addressName}
                getLocationData={getLocAddress}
                setAddressFeilds={setAddress}
                placeholder="Country,State,City"
                highlighted={submitted && addressName == null || submitted && addressName == ''}
                containerStyle={{ width: screenWidth / 1.2 }} customContainerStyle={{
                  width: screenWidth / 2,
                  marginHorizontal: 30,
                  alignSelf: "flex-start",
                  right: 15,
                  fontFamily: fonts.REGULAR,
                  fontSize: 14

                }} />
            </View>
            <View >
              {/* <FastImage
              source={ICON_NAMES.locations}
              resizeMode='contain'
              style={{
                height: 40,
                width:  40,
                alignSelf:"center",
                left:11,
              }}
              /> */}
            </View>
            <View style={{ paddingVertical: 12 }} />
            <View
            // style={{
            //   alignItems:"center",
            //   borderWidth:1,
            //   flexDirection:"row",
            //   borderRadius:12,
            // }}
            >
              {/* <View style={{
              alignSelf:"flex-start",
              paddingTop:11,
              left:8
              }}>

            <FastImage
            source={ICON_NAMES.shop}
            resizeMode='contain'
            style={{
              height: 40,
              width:  40,
              alignSelf:"center"
            }}
            />
            </View> */}


              <View style={{}}>
                <Dropdown
                  customIconLeft={IMAGE_NAMES.mail}
                  value={selectedVen}
                  setValue={setSelectedVen}
                  items={vendors}
                  setItems={setVendors}
                  placeholder="Campus Store"
                />
              </View>
            </View>

            <View style={{ paddingVertical: 12 }} />
            <View style={{
              borderWidth: 1,
              height: screenHeight / 15,
              borderRadius: 12,
              paddingHorizontal: 11,
              borderColor: '#F3F3F3'
            }}>

              <Input
                keyboardType={'numeric'}
                autoCapitalize={'words'}
                placeholder="Room No"
                maxLength={8}
                customContainerStyle={{ borderBottomWidth: 0 }}
              />
            </View>
          </View>

        </View>

      </KeyboardAwareScrollView>
      <View
        style={{
          paddingBottom: screenHeight / 12,
          paddingHorizontal: 18
        }}>
        <Button
          onPress={() => handleSubmit()}
          customStyle={{
            borderRadius: 50,
          }}
          value="Save"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },

  header: {
    backgroundColor: 'white',
    elevation: 5,
    padding: 18,

  },
});


