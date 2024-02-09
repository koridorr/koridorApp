import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../../components';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {colors, fonts} from '../../../../helpers/styles';
import {goBack, navigate, replace} from '../../../../navigation';
import {Button} from '../../../../widgets';

type ViewPropTypes = {
  deliver: boolean;
};

const OrderDetailsView = ({deliver}: ViewPropTypes) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <Touchable onPress={() => goBack()}>
              <FastImage
                source={IMAGE_NAMES.arrow_left}
                style={{height: 25, width: 25, right: 8}}
                resizeMode="contain"
              />
            </Touchable>
            <View>
              <Text fontSize={18} fontFamily={fonts.BOLD}>
                ORDER #385256521
              </Text>
              <Text fontSize={10}>03:33 PM | 2 Items, $620.12</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              bottom: 8,
            }}>
            <Text fontSize={10}>Get Help</Text>
            <FastImage
              source={ICON_NAMES.getHelp}
              style={{height: 25, width: 25}}
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          style={{flexDirection: 'row', paddingHorizontal: 15, paddingTop: 22}}>
          <View>
            <FastImage
              source={ICON_NAMES.location}
              style={{height: 30, width: 30}}
              resizeMode="contain"
            />
            <FastImage
              source={ICON_NAMES.verticalDashed}
              style={{height: 40, width: 30}}
              resizeMode="contain"
            />
            <FastImage
              source={ICON_NAMES.location}
              style={{height: 30, width: 30}}
              resizeMode="contain"
            />
          </View>

          <View>
            <View style={{bottom: 4}}>
              <Text
                customStyle={{paddingLeft: 5}}
                fontFamily={fonts.BOLD}
                fontSize={12}>
                EL Mexicano
              </Text>

              <Text
                customStyle={{paddingLeft: 5}}
                fontSize={12}
                fontFamily={fonts.REGULAR}>
                8591 Ramblewood St. Lower Manhattan...
              </Text>
            </View>

            <View>
              <View style={{paddingTop: 27}}>
                <Text
                  customStyle={{paddingLeft: 5}}
                  fontFamily={fonts.BOLD}
                  fontSize={12}>
                  Home
                </Text>
              </View>
              <Text fontSize={12}>
                8591, Near motor market, Sector 91, SAS Nagar
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />

        <View
          style={{
            flexDirection: 'row',
            paddingTop: 15,
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <FastImage
            source={ICON_NAMES.clock}
            style={{height: 25, width: 25}}
            resizeMode="contain"
          />

          <Text
            customStyle={{
              paddingHorizontal: 10,
              paddingTop: 2,
            }}
            fontSize={12}>
            Order delivering by Jack Willumson
          </Text>

          <Touchable onPress={() => navigate('ChatSection', undefined)}>
            <FastImage
              source={ICON_NAMES.chatGreen}
              style={{height: 100, width: 100, bottom: 26, left: 10}}
              resizeMode="cover"
            />
          </Touchable>
          <FastImage
            source={ICON_NAMES.call}
            style={{height: 90, width: 90, bottom: 22, right: 50}}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            backgroundColor: '#EEEEEE',
            bottom: 55,
            padding: 15,
          }}>
          <Text color="#6D6F77" customStyle={{paddingLeft: 8}} fontSize={10}>
            ORDER SUMMARY
          </Text>
        </View>

        <View style={{bottom: 40}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}>
            <View style={{}}>
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                Fruit Juices x 1
              </Text>
              <Text
                customStyle={{
                  paddingTop: 8,
                }}
                fontSize={14}
                fontFamily={fonts.REGULAR}>
                Oils And Masalas x 1
              </Text>
            </View>
            <View>
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                $150.00
              </Text>
              <Text
                customStyle={{
                  paddingTop: 8,
                }}
                fontSize={14}
                fontFamily={fonts.REGULAR}>
                $150.00
              </Text>
            </View>
          </View>
          <View style={styles.horizontalLineDashed} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 14,
              paddingHorizontal: 15,
            }}>
            <View>
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                Subtotal
              </Text>
              <Text
                customStyle={{
                  paddingTop: 8,
                }}
                fontSize={14}
                fontFamily={fonts.REGULAR}>
                Coupon Applied
              </Text>
              <Text
                customStyle={{
                  paddingTop: 8,
                }}
                fontSize={14}
                fontFamily={fonts.REGULAR}>
                Delivery Charge
              </Text>
            </View>
            <View>
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                $150.00
              </Text>
              <Text
                customStyle={{
                  paddingTop: 8,
                }}
                fontSize={14}
                fontFamily={fonts.REGULAR}>
                $150.00
              </Text>
              <Text
                customStyle={{
                  paddingTop: 8,
                }}
                fontSize={14}
                fontFamily={fonts.REGULAR}>
                Free
              </Text>
            </View>
          </View>
          <View style={styles.horizontalLineDashed} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              top: 10,
              paddingVertical: 4,
            }}>
            <Text fontSize={14}>Grand Total</Text>
            <Text fontSize={16} fontFamily={fonts.SEMI_BOLD}>
              $ 729.00
            </Text>
          </View>
          <View style={styles.horizontalLineDashed} />
        </View>
      </ScrollView>
      <View style={{paddingVertical: 30}} />

      <View style={{paddingBottom: 20, paddingHorizontal: 15}}>
        <Button
          customStyle={{borderRadius: 50}}
          value="Order Completed"
          onPress={() => replace('MainFlow', {screen: 'HomeScreen'})}
        />
        {/* ) : (
          <Button
            customStyle={{borderRadius: 50}}
            value="Get directions"
            onPress={() => navigate('GetDirection', undefined)}
          />
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,

    paddingTop: 15,
  },
  horizontalLine: {
    borderBottomWidth: 0.8,
    width: '92%',
    borderBottomColor: '#96979C',
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  horizontalLineDashed: {
    borderStyle: 'dashed',
    borderBottomWidth: 1.3,
    width: '95%',
    borderBottomColor: colors.grey,
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  header: {
    backgroundColor: 'white',
    elevation: 5, // Adjust the value to control the shadow intensity
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OrderDetailsView;
