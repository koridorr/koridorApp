import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from '../../../../components';
import {IMAGE_NAMES} from '../../../../helpers/constants';
import ShowToast from '../../../../utils/Toast';
import {fonts, screenHeight, screenWidth} from '../../../../helpers/styles';
import {Button} from '../../../../widgets';
import {navigate, replace} from '../../../../navigation';

type PaymentType={
  orderDetails:any
}
const PaymentCompletedView = ({orderDetails}:PaymentType) => {


  
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <FastImage
          source={IMAGE_NAMES.clouds}
          resizeMode="contain"
          style={{width: screenWidth / 1.2, height: screenHeight / 3, top: 30}}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <FastImage
          source={IMAGE_NAMES.greenCart}
          resizeMode="contain"
          style={{width: screenWidth / 2.4, height: screenHeight / 5}}
        />
      </View>
      <View style={{alignItems: 'center', paddingTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text fontSize={16} fontFamily={fonts.REGULAR}>
            Payment for the Order no.
          </Text>
          <Text
            customStyle={{paddingHorizontal: 4}}
            fontSize={16}
            fontFamily={fonts.BOLD}>
              {`#${orderDetails?.OrderNo}`}
          </Text>
        </View>

        <Text fontSize={16} fontFamily={fonts.REGULAR}>
          done Successfully!
        </Text>
      </View>
      <View
        style={{paddingHorizontal: 18, paddingTop: 30, alignItems: 'center'}}>
        <Button
          // onPress={() => replace('OrderDetails', orderDetails)}
          onPress={() => replace('OrderStack', {screen: 'MyOrderTabs'})}

          customStyle={{borderRadius: 50, width: 200}}
          value="Order Details"
        />
      </View>


      <View style={{alignItems: 'flex-end'}}>
        <FastImage
          source={IMAGE_NAMES.whiteCircle}
          resizeMode="contain"
          style={{
            width: screenWidth / 1,
            height: screenHeight / 4,
            left: 85,
            top: 50,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PaymentCompletedView;
