import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Text, Touchable} from '../../../../components';

import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {ProfileListType} from '../../../../types/ProfileList.d.types';

import FastImage from 'react-native-fast-image';
import {Header} from '../../../../widgets';
import React = require('react');

type ProfileFlowViewType = {
  GeneralList: any[];
  contactHandler: (id: number) => void;
};

export const ContactUsView = ({
  GeneralList,
  contactHandler,
}: ProfileFlowViewType) => (
  <>
    <Header title="Contact us" />

    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={{
          paddingBottom: screenHeight / 10,
        }}>
        <View>
          <FastImage
            source={IMAGE_NAMES.contactUs}
            style={{
              height: screenHeight / 2.8,
              width: screenWidth / 1,

              marginRight: 20,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            paddingVertical: 15,
          }}>
          <Text fontFamily={fonts.BOLD} fontSize={12}>
            FACING ANY ISSUE?
          </Text>
          <View style={{width: '60%', top: 8}}>
            <Text customStyle={{textAlign: 'center'}} fontSize={12}>
              Please get in touch and we will be happy to help you
            </Text>
          </View>
        </View>
        <View style={{top: 10}}>
          {GeneralList.map((item, index) => (
            
            <Touchable
              onPress={() => contactHandler(item.id)}
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: 12,
              }}>
              <View style={{}}>
                <FastImage
                  source={item.icon}
                  style={{height: 20, width: 20, top: 4}}
                  resizeMode="contain"
                />
              </View>
              <View style={{left: 10}}>
                <Text fontSize={14} fontFamily={fonts.BOLD}>
                  {item.name}
                </Text>
                <Text color="#908FA1" fontSize={10}>
                  {item.text}
                </Text>
              </View>
            </Touchable>
          ))}
        </View>
      </ScrollView>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
