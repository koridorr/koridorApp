import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../../components';
import {
  ICON_NAMES,
  IMAGE_NAMES,
  STORAGE_KEYS,
} from '../../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {goBack, navigate, replace} from '../../../../navigation';
import {Button, Header} from '../../../../widgets';
import OrderCard from '../../../../components/OrderCard';
import OrderSummaryCard from '../../../../components/OrderSummaryCard';
import Loader from '../../../../widgets/Loader';
import moment from 'moment';

type data = {
  item: any;
};

type OrderSummaryViewType = {
  data: data;
  rating: boolean;
  loading: boolean;
  note: string;
  reOrderItems: () => void;
  CancelOrder: () => void;
};
const OrderSummaryView = ({
  data,
  reOrderItems,
  loading,
  rating,
  note,
  CancelOrder,
}: OrderSummaryViewType) => {
  const orderDetails = [
    {
      key: 'Subtotal',
      value: data?.item?.totalPriceOfProducts,
    },
    {
      key: 'Total Discount',
      value: data?.item?.productDiscount + data?.item?.couponDiscount,
    },
    {
      key: 'Total Tax',
      value: data?.item?.totaltax,
    },
    // {
    //   key: 'Delivery Charge',
    //   value: '$ ' + data?.item?.deliveryCharges,
    // },
  ];

  return (
    <>
      <Header title="Order Summary" />

      <Loader loading={loading} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                customStyle={{
                  fontSize: 14,
                  fontFamily: fonts?.REGULAR,
                }}>
                Order ID :
              </Text>
              <Text
                customStyle={{
                  fontSize: 14,
                  fontFamily: fonts?.REGULAR,
                  color: '#548AE6',
                }}>{` ${data?.item?.OrderNo}`}</Text>
            </View>
            <Text
              customStyle={{
                fontSize: 10,
                fontFamily: fonts?.REGULAR,
                color: colors?.darkGrey,
              }}>
              {moment(data?.item?.createdAt).format('D / MM / YY') +
                ' at' +
                moment(data?.item?.createdAt).format(' h:mm A')}
            </Text>
          </View>

          <OrderCard
            page={data?.item?.orderproducts?.length + 1}
            handleNavigate={''}
            item={data}
          />

          {/* <OrderSummaryCard item={data} /> */}

          <View style={{flexDirection: 'row'}}></View>
          <View
            style={{
              backgroundColor: '#EEEEEE',
              borderRadius: 5,
              paddingVertical: 15,
            }}>
            <Text customStyle={{paddingLeft: 10}} fontSize={10}>
              Order Summary
            </Text>
          </View>
          {note && note[0] ? (
            <View style={{paddingVertical: 11}}>
              <Text>Notes</Text>
              <Text
                customStyle={{width: screenWidth / 1.1}}
                fontFamily={fonts.REGULAR}
                fontSize={12}>
                {note}
              </Text>
            </View>
          ) : null}
          {data?.item?.notes !== '' && data?.item?.notes !== undefined ? (
            <View style={{paddingTop: 8}}>
              <Text fontSize={14}>{`Notes : ${data?.item?.notes}`}</Text>
            </View>
          ) : null}
          <View style={{paddingTop: 15}}>
            {orderDetails?.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 2,
                  }}
                  key={index}>
                  <View>
                    <Text fontSize={14} fontFamily={fonts.REGULAR}>
                      {item?.key}
                    </Text>
                  </View>
                  <View>
                    <Text
                      customStyle={{
                        paddingTop: 8,
                      }}
                      fontSize={14}
                      fontFamily={fonts.REGULAR}>
                      {'$' + item?.value}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.horizontalLineDashed} />
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 20,
              justifyContent: 'space-between',
              paddingVertical: 11,
            }}>
            <Text fontSize={14}>Grand Total</Text>

            <Text fontSize={16} fontFamily={fonts.SEMI_BOLD}>
              {`$ ${data?.item?.total}`}
            </Text>
          </View>
          <View style={styles.horizontalLineDashed} />
        </ScrollView>
        {data?.item?.orderStatus == 7 ? (
          ''
        ) : (
          <View>
            <View style={{alignItems: 'center'}}>
              <Touchable
                onPress={CancelOrder}
                style={{
                  justifyContent: 'center',
                  width: screenWidth / 2.3,
                  alignItems: 'center',
                  height: screenHeight / 16,
                  borderRadius: 50,
                  backgroundColor: colors.green,
                  marginBottom: 25,
                }}>
                <Text
                  customStyle={{
                    color: colors.black,
                  }}>
                  Cancel order
                </Text>
              </Touchable>
            </View>
            {!loading && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: !data?.item?.ratedByUser
                    ? 'space-between'
                    : 'center',
                  paddingBottom: 12,
                  bottom: 11,
                }}>
                {!data?.item?.ratedByUser && (
                  <Touchable
                    onPress={() =>
                      navigate('RateOrder', {
                        data: data?.item?.orderproducts[0]?.orderId,
                      })
                    }
                    style={{
                      justifyContent: 'center',
                      width: screenWidth / 2.3,
                      alignItems: 'center',
                      height: screenHeight / 16,
                      borderRadius: 50,
                      backgroundColor: colors.green,
                    }}>
                    <Text
                      customStyle={{
                        color: colors.black,
                      }}>
                      Rate us
                    </Text>
                  </Touchable>
                )}
                <Touchable
                  onPress={() => reOrderItems()}
                  style={{
                    justifyContent: 'center',
                    width: screenWidth / 2.3,
                    alignItems: 'center',
                    height: screenHeight / 16,
                    borderRadius: 50,
                    backgroundColor: colors.black,
                  }}>
                  <Text
                    customStyle={{
                      color: colors.white,
                    }}>
                    Re-Order
                  </Text>
                </Touchable>
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 18,
  },
  horizontalLine: {
    borderBottomWidth: 0.8,
    width: '100%',
    borderBottomColor: colors.grey,
    paddingVertical: 4,
    top: 5,
  },
  horizontalLineDashed: {
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    top: 6,
    margin: -2,
    marginTop: 0,
  },
});
export default OrderSummaryView;
