import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';
import Touchable from './Touchable';
import {navigate} from '../navigation';
import moment from 'moment';
import React = require('react');
import Text from './Text';

type OrderCardPropTypes = {
  item: any;
  handleNavigate: any;
  page: number;
};

const OrderCard = ({item, page}: OrderCardPropTypes) => {
  return (
    <Touchable
      style={{}}
      onPress={() => {
        page === 1
          ? navigate('OrderSummary', {data: item})
          : console.log('fdf');
      }}>
      {item?.item?.orderproducts?.slice(0, page).map((value, index) => (
        <View key={index} style={styles.foodCard3}>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              source={{uri: value?.images[0]}}
              style={{
                height: screenHeight / 7,
                width: screenWidth / 3.5,
                right: 12,
              }}
              resizeMode="contain"
            />
            <View style={{width: '60%'}}>
              {page === 1 ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      right: 3,
                    }}>
                    <View>
                      <Text fontSize={12} color="#548AE6">
                        {` Order ID : ${item?.item?.OrderNo}`}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                ''
              )}
              <Text color="#292D32" fontSize={14} fontFamily={fonts.SEMI_BOLD}>
                {value?.name}
              </Text>
              {page === 1 ? (
                <Text customStyle={{}} color={colors.grey} fontSize={10}>
                  {moment(value.createdAt).format('D / MM / YY') +
                    ' at' +
                    moment(value.createdAt).format(' h:mm A')}
                </Text>
              ) : null}
              <View style={styles.horizontalLine} />

              <View style={{flexDirection: 'row', top: 3}}>
                <Text color="#A2A2A2" fontSize={10}>
                  {value.quantity + ' x '}
                </Text>
                <Text fontSize={10}>{value?.name}</Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {page == 1 ? (
                      <Text
                        color="#272C3F"
                        fontSize={16}
                        fontFamily={fonts.SEMI_BOLD}
                        customStyle={{paddingTop: 4}}>
                        {'$ ' + item?.item?.total}
                      </Text>
                    ) : (
                      <Text
                        color="#272C3F"
                        fontSize={16}
                        fontFamily={fonts.SEMI_BOLD}
                        customStyle={{paddingTop: 4}}>
                        {'$ ' + value?.price * value.quantity}
                      </Text>
                    )}

                    <Text
                      customStyle={{
                        paddingLeft: 4,
                        top: 3,
                      }}
                      fontSize={10}
                      fontFamily={fonts.REGULAR}
                      color="#A2A2A2">
                      Total Price
                    </Text>
                  </View>
                  {item?.item?.orderproducts[0]?.orderStatus == 7 ? (
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Text
                        color="red"
                        fontSize={10}
                        fontFamily={fonts.REGULAR}
                        customStyle={{paddingTop: 4, left: 10}}>
                        Order Canceled
                      </Text>
                    </View>
                  ) : (
                    ''
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  foodCard3: {
    margin: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  horizontalLine: {
    borderBottomWidth: 2,
    width: '100%',
    borderBottomColor: colors.lightestGrey,
    paddingVertical: 2,
  },
  cardBtn: {
    width: 100,
    paddingVertical: 0,
    backgroundColor: colors.lightGrey,
    borderRadius: 50,
  },
  cardBtn2: {
    width: 100,
    paddingVertical: 0,
    backgroundColor: '#B8FF3D',
    borderRadius: 50,
  },
});

export default OrderCard;
