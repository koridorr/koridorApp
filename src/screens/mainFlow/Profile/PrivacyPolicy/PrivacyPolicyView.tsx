import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from '../../../../components';

import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';

import FastImage from 'react-native-fast-image';

import {Header} from '../../../../widgets';
import WebView from 'react-native-webview';

type ViewPropType = {
  privacyPolicy: string;
};

export const PrivacyPolicyView = ({privacyPolicy}: ViewPropType) => (
  <>
    <Header title="Privacy Policy" />

    {privacyPolicy ? (
      <View style={{flex: 1}}>
        <WebView
          originWhitelist={['*']}
          automaticallyAdjustContentInsets={false}
          source={{
            html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${privacyPolicy}</body></html>`,
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
