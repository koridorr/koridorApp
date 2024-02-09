import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../../components';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {CouponTypes} from '../../../../helpers/constants/types';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {goBack, navigate} from '../../../../navigation';
import Loader from '../../../../widgets/Loader';

type AddCouponPropTypes = {
  couponsData: CouponTypes[] | undefined;
  loading: boolean;
};
const AddCouponView = ({couponsData, loading}: AddCouponPropTypes) => {
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.header}>
        <Touchable onPress={() => goBack()}>
          <FastImage
            source={IMAGE_NAMES.arrow_left}
            style={{height: 25, width: 25}}
            resizeMode="contain"
          />
        </Touchable>

        <Text fontSize={18} fontFamily={fonts.BOLD}>
          Promo Code
        </Text>
      </View>

      <View style={{padding: 15, paddingTop: 22, top: 8}}>
        <Text fontFamily={fonts.BOLD} fontSize={14}>
          Available Coupons
        </Text>
      </View>

      {couponsData?.map((items, index) => (
        <View key={index} style={styles.coupon}>
          <View style={{gap: 7}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text fontSize={12} fontFamily={fonts.BOLD}>
                {/* {`Enjoy an additional `} */}
                {items?.couponName + ' '}
              </Text>
              {items.percentage ? (
                <Text fontSize={12} fontFamily={fonts.BOLD}>
                  {items?.discountType == 2
                    ? `${items.percentage || 0}% off`
                    : `$${items.percentage || 0} off`}
                </Text>
              ) : (
                <Text fontSize={12} fontFamily={fonts.BOLD}>
                  {`$${items.discount || 0} off`}
                </Text>
              )}
            </View>

            <Text
              customStyle={{bottom: 4}}
              color={colors.grey}
              fontSize={12}
              fontFamily={fonts.REGULAR}>
              {items?.description}
              {/* On your 1st order from Koridorr app! */}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: screenWidth / 1.8,
              }}>
              <Text fontSize={15} fontFamily={fonts.BOLD}>
                {items.code}
              </Text>
              <Touchable
                onPress={() => navigate('ViewCart', {code: items?.code})}
                style={{
                  justifyContent: 'center',
                  width: screenWidth / 5,
                  alignItems: 'center',
                  height: screenHeight / 30,
                  borderRadius: 50,
                  backgroundColor: colors.black,
                }}>
                <Text
                  fontSize={12}
                  fontFamily={fonts.REGULAR}
                  customStyle={{
                    color: colors.white,
                  }}>
                  Apply
                </Text>
              </Touchable>
            </View>
          </View>

          {/* <View style={{alignItems: 'center', paddingTop: 10}}>
            <Text fontSize={14} fontFamily={fonts.BOLD}>
              SAVE
            </Text>
            <Text fontSize={13} fontFamily={fonts.BOLD}>
              {`EGP ${items?.discount}`}
            </Text> */}
          {/* </View> */}
          {/* <View
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 100,
              width: 30,
              height: 30,
              position: 'absolute',
              borderStyle: 'dashed',
              backgroundColor: 'white',
              left: -20,
            }}></View> */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
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
    gap: 15,
  },
  coupon: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    borderColor: colors.lightGrey,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    alignItems: 'center',
  },
});

export default AddCouponView;
