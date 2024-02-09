import {StyleSheet, View} from 'react-native';
import {Text} from '../../../../components';
import {screenHeight} from '../../../../helpers/styles';
import {Header} from '../../../../widgets';
import WebView from 'react-native-webview';
import React from 'react';
import {goBack} from '../../../../navigation';

type ViewPropType = {
  termsAndConditions: string;
};

export const TermsAndConditionsView = ({termsAndConditions}: ViewPropType) => (
  <>
    <Header onLeftIconPress={() => goBack()} title="Terms & Conditions" />

    {termsAndConditions ? (
      <View style={{flex: 1}}>
        <WebView
          originWhitelist={['*']}
          automaticallyAdjustContentInsets={false}
          source={{
            html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${termsAndConditions}</body></html>`,
          }}
          containerStyle={{padding: 10}}
          scalesPageToFit={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    ) : (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: screenHeight / 1.3,
        }}>
        <Text>No Data Found</Text>
      </View>
    )}
  </>
);

const styles = StyleSheet.create({});
