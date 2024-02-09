import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {navigate} from '../../../navigation';
import {colors, fonts, screenHeight} from '../../../helpers/styles';
import ChangeAddressCard from '../../../components/ChangeAddressCard';

import {Button, Header, Input} from '../../../widgets';
import {ICON_NAMES} from '../../../helpers/constants';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React from 'react';

type Addresses = {
  name: string;
  text: string;
  icon: any;
};

type ProfileFlowViewType = {
  Addresses: Addresses[];
};

export const ChangeAddressView = ({Addresses}: ProfileFlowViewType) => (
  <>
    <Header />
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          searchIcon
          placeholder="Search here"
          customContainerStyle={{
            borderWidth: 1,
            borderRadius: 50,
            height: 50,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}>
        <View>
          <FastImage
            source={ICON_NAMES.gps}
            style={{height: 30, width: 30}}
            resizeMode="contain"
          />
        </View>
        <Touchable
          onPress={() => {
            navigate('ProfileStack', {screen: 'AddAddress'});
          }}
          style={{left: 6}}>
          <Text fontFamily={fonts.SEMI_BOLD} fontSize={14}>
            Current Location
          </Text>
          <Text fontSize={12} color="#A2A2A2">
            Using GPS
          </Text>
        </Touchable>
      </View>
      <View style={styles.divider} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={{
          paddingBottom: screenHeight / 10,
        }}>
        <View>
          {Addresses.map((item, index) => (
            <ChangeAddressCard
              icon={item.icon}
              name={item.name}
              text={item.text}
              key={index} addressType={''} apartmentNo={''} address1={''}            />
          ))}
        </View>
        <View style={{padding: 20, left: 30}}>
          <Text fontSize={12}>VIEW MORE</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  inputContainer: {
    justifyContent: 'center',
    top: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  divider: {
    borderBottomWidth: 4,
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomColor: '#F6F6F6',
  },
});
