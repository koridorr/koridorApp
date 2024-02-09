import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FavoriteProductCard, Text, Touchable} from '../../../../components';
import ViewCartCard from '../../../../components/ViewCartCard';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import useAuth from '../../../../hooks/useAuth';
import {goBack, navigate} from '../../../../navigation';
import {CartDataTypes} from '../../../../types/User';
import {Button, Input} from '../../../../widgets';
import Loader from '../../../../widgets/Loader';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
type addressType = {
  _id: string;
  address1: string;
  address2: string;
  addressType: number;
  apartmentNo: number;
  area: string;
  buildingNo: number;
  city: string;
};
type ViewCartPropTypes = {
  loading: boolean;
  isFocused: boolean;
  applyCode: string;
  cartData: any;
  selectedAddress: addressType;
  note: string;
  paymentMeth: number;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  setPaymentMeth: Dispatch<SetStateAction<number>>;
  cardData: [];
  selectedCard: string;
  setNote: Dispatch<SetStateAction<string>>;
  setSelectedCard: Dispatch<SetStateAction<string>>;
  removeFromcart: () => void;
  incrementCount: () => void;
  decrementCount: () => void;
  placeOrder: () => void;
  applyCoupon: () => void;
  couponsData: [];
};

const ViewCartScreen = ({
  couponsData,
  setSelectedCard,
  selectedCard,
  cardData,
  loading,
  note,
  setNote,
  placeOrder,
  selectedAddress,
  applyCode,
  applyCoupon,
  cartData,
  isFocused,
  paymentMeth,
  setIsFocused,
  removeFromcart,
  incrementCount,
  decrementCount,
  setPaymentMeth,
}: ViewCartPropTypes) => {
  const user: any = useAuth();
  // console.log(user?.roomNo,'user');
  // console.log(cartData?.products, '====<>');
  const sumOfQuantities = (cartData?.products || []).reduce(
    (total, product) => total + (product.quantity || 0),
    0,
  );
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(false);
  };
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={[styles.header]}>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <Touchable onPress={() => goBack()}>
            <FastImage
              source={IMAGE_NAMES.arrow_left}
              style={{height: 25, width: 25, right: 7}}
              resizeMode="contain"
            />
          </Touchable>
          <Text fontSize={18} fontFamily={fonts.BOLD}>
            Cart
          </Text>
        </View>
        {cartData?.products?.length > 0 && (
          <Touchable style={{right: 3}} onPress={() => {}}>
            <ImageBackground
              source={ICON_NAMES.cartFilled}
              style={{height: 25, width: 25}}
              resizeMode="contain">
              <View
                style={{
                  backgroundColor: colors.green,
                  borderRadius: 55,
                  width: screenWidth / 24,
                  height: screenHeight / 52,
                  left: 11,
                }}>
                <Text
                  fontFamily={fonts.EXTRA_BOLD}
                  customStyle={{
                    textAlign: 'center',
                    bottom: 2,
                  }}
                  fontSize={10}>
                  {sumOfQuantities}
                </Text>
              </View>
            </ImageBackground>
          </Touchable>
        )}
      </View>

      {cartData?.products?.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingVertical: 40, gap: 20}}>
            {cartData?.products?.map(
              (item: any, index: React.Key | null | undefined) => {
                return (
                  <View key={index}>
                    <View style={{paddingHorizontal: 10}} key={index}>
                      <ViewCartCard
                        decrementCount={decrementCount}
                        incrementCount={incrementCount}
                        removeCart={removeFromcart}
                        counter={true}
                        addButton={false}
                        item={item}
                      />
                    </View>
                  </View>
                );
              },
            )}
          </View>

          <View style={styles.horizontalLine} />

          <View
            style={{
              paddingHorizontal: 10,
              paddingTop: 10,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Touchable
              onPress={() => navigate('ProfileStack', {screen: 'EditProfile'})}
              style={{
                justifyContent: 'center',
                width: screenWidth / 2.3,
                alignItems: 'center',
                height: screenHeight / 28,
                borderRadius: 50,
                borderColor: colors.black,
                backgroundColor: colors.green,
              }}>
              <Text
                fontSize={12}
                fontFamily={fonts.REGULAR}
                customStyle={{
                  color: colors.black,
                }}>
                {'Change Campus Details'}
              </Text>
            </Touchable>
          </View>
          {cartData?.products && cartData?.products[0]?.vendorId?.storeName ? (
            <View style={{flexDirection: 'row', paddingHorizontal: 11}}>
              <Text customStyle={{}} fontSize={12}>
                {`Campus Store :`}
              </Text>
              <Text
                customStyle={{paddingLeft: 4}}
                fontFamily={fonts.BOLD}
                fontSize={12}>
                {cartData?.products[0]?.vendorId?.storeName}
              </Text>
            </View>
          ) : null}
          {user?.roomNo ? (
            <View style={{flexDirection: 'row', paddingHorizontal: 11}}>
              <Text customStyle={{}} fontSize={12}>
                {`Room No :`}
              </Text>
              <Text
                customStyle={{paddingLeft: 4}}
                fontFamily={fonts.BOLD}
                fontSize={12}>
                {user?.roomNo}
              </Text>
            </View>
          ) : null}
          {couponsData?.length > 0 ? (
            <Touchable
              onPress={() => setShow(true)}
              style={{
                marginHorizontal: 10,
                backgroundColor: '#F4F4F4',
                padding: 10,
                marginTop: 15,
                flexDirection: 'row',
                gap: 10,
                borderRadius: 50,
                height: 50,
                alignItems: 'center',
              }}>
              <FastImage
                source={ICON_NAMES.tag}
                style={{height: 25, width: 25}}
                resizeMode="contain"
              />
              {applyCode ? (
                <Text fontFamily={fonts.BOLD}>{applyCode}</Text>
              ) : null}
              <View>
                <Text
                  fontSize={14}
                  color={applyCode ? colors.black : '#A5A5A5'}
                  fontFamily={fonts.REGULAR}>
                  {applyCode ? 'Coupon Applied' : 'Apply Coupon'}
                </Text>
              </View>
            </Touchable>
          ) : null}

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 11,
              paddingTop: 15,
            }}>
            <View
              style={{
                width: screenWidth / 1.06,
                height: 50,
                padding: 10,
                position: 'relative',
                backgroundColor: '#F4F4F4',
                borderRadius: 55,
                borderColor: colors.green,
                borderWidth: isFocused ? 1 : 0,
              }}>
              {note === '' && (
                <Text
                  style={{
                    position: 'absolute',
                    top: '75%',
                    transform: [{translateY: -8}],
                    color: 'gray',
                    fontSize: 13,
                    fontFamily: fonts.LIGHT,
                    paddingHorizontal: 15,
                  }}>
                  Notes
                </Text>
              )}
              <TextInput
                style={{
                  width: '100%',
                  height: '100%',
                  padding: 0,
                  fontSize: 13,
                  left: 5,
                }}
                returnKeyType={'done'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={90}
                multiline
                value={note}
                onChangeText={setNote}
              />
            </View>
          </View>

          <View style={{paddingVertical: 11}} />
          <View style={{paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', paddingVertical: 8, gap: 10}}>
              <Text
                customStyle={{top: 10}}
                fontSize={14}
                fontFamily={fonts.BOLD}>
                Payment Summary
              </Text>
              <View style={styles.horizontalLineLight} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingTop: 12,
              alignItems: 'center',
            }}>
            <View style={{paddingVertical: 10}}>
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                SubTotal
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 6}}>
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                {`$${cartData?.totalPriceOfProducts || 0}`}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingTop: 6,
              paddingBottom: 15,
            }}>
            <View>
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                Total Tax
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 6}}>
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                {`$${cartData?.totaltax || 0}`}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingTop: 6,
              paddingBottom: 15,
            }}>
            <View>
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                Product Discount
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 6}}>
              <Text fontSize={14} fontFamily={fonts.REGULAR}>
                {`$${cartData?.productDiscount || 0}`}
              </Text>
            </View>
          </View>
          {applyCode && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingTop: 6,
                paddingBottom: 15,
              }}>
              <View>
                <Text fontSize={14} fontFamily={fonts.REGULAR}>
                  Coupon Discount
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 6}}>
                <Text fontSize={14} fontFamily={fonts.REGULAR}>
                  {`$${cartData?.couponDiscount || 0}`}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.horizontalLineDashed} />

          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 9,
              paddingBottom: 18,
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              top: 12,
            }}>
            <Text fontSize={14}>Grand Total</Text>
            <Text fontSize={16} fontFamily={fonts.SEMI_BOLD}>
              {`$ ${cartData?.total || 0}`}
            </Text>
          </View>

          <View style={styles.horizontalLineDashed} />

          <View style={{paddingHorizontal: 10, paddingVertical: 30}}>
            <Text fontSize={14} fontFamily={fonts.BOLD}>
              Select Payment Method
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                }}>
                <FastImage
                  source={ICON_NAMES.card}
                  style={{height: 30, width: 30}}
                  resizeMode="contain"
                />
                <Text fontSize={12} fontFamily={fonts.REGULAR}>
                  Debit/Credit Card
                </Text>
              </View>
              <Touchable
                onPress={() =>
                  navigate('ProfileStack', {screen: 'AddNewCard'})
                }>
                <FastImage
                  source={ICON_NAMES.add}
                  style={{height: 40, width: 40, left: 7}}
                  resizeMode="contain"
                />
              </Touchable>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedCard('')}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  paddingVertical: 2,
                }}>
                <FastImage
                  source={ICON_NAMES.cash}
                  style={{height: 30, width: 30}}
                  resizeMode="contain"
                />
                <Text fontSize={12} fontFamily={fonts.REGULAR}>
                  Cash On Delivery
                </Text>
              </View>
              <FastImage
                source={
                  selectedCard === '' ? ICON_NAMES.selector : ICON_NAMES.ellipse
                }
                style={{height: 27, width: 27}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={{paddingVertical: 0}}>
              {cardData?.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => setSelectedCard(item)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E6E6E6',
                        marginBottom: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 10,
                          alignItems: 'center',
                        }}>
                        <FastImage
                          source={ICON_NAMES.masterCard}
                          style={{height: 30, width: 30}}
                          resizeMode="contain"
                        />
                        <Text
                          customStyle={{top: 2, left: 5}}
                          fontSize={12}
                          fontFamily={fonts.REGULAR}>
                          {`**** **** ****`}
                        </Text>
                        <Text fontSize={12} fontFamily={fonts.REGULAR}>
                          {`${item?.last4}`}
                        </Text>
                      </View>
                      <FastImage
                        source={
                          selectedCard === item
                            ? ICON_NAMES.selector
                            : ICON_NAMES.ellipse
                        }
                        style={{height: 27, width: 27}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}

      {cartData?.products?.length > 0 ? (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 15,
            bottom: 11,
          }}>
          <Button onPress={() => placeOrder()} value="Place Order" />
        </View>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text fontFamily={fonts.BOLD} fontSize={18}>
            Your cart is empty!
          </Text>
        </View>
      )}
      <Modal
        isVisible={show}
        backdropOpacity={0.8}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}>
        <View style={{backgroundColor: 'white', flex: 0.8}}>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 5, // Adjust the value to control the shadow intensity
              shadowColor: 'black',
              shadowOpacity: 0.2,
              shadowRadius: 4,
              padding: 20,
              flexDirection: 'row',
            }}>
            <Touchable onPress={() => setShow(false)}>
              <FastImage
                source={IMAGE_NAMES.arrow_left}
                style={{height: 25, width: 25}}
                resizeMode="contain"
              />
            </Touchable>

            <View style={{flex: 0.8}}>
              <Text
                customStyle={{textAlign: 'center'}}
                fontSize={18}
                fontFamily={fonts.BOLD}>
                Promo Code
              </Text>
            </View>
          </View>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            scrollEnabled={true}
            extraScrollHeight={40}
            keyboardShouldPersistTaps="handled"
            enableAutomaticScroll={true}
            style={{height: screenHeight}}>
            <View style={{paddingTop: 20}}>
              {couponsData?.map((items, index) => {                
                 return(
                  <View key={index} style={styles.coupon}>
                  <View style={{gap: 7}}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text fontSize={12} fontFamily={fonts.BOLD}>
                        {items?.couponName + ' '}
                      </Text>
                      {items.percentage ? (
                        <Text fontSize={12} fontFamily={fonts.BOLD}>
                          {items?.discountType == 1
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
                        onPress={() => {
                          applyCoupon(items?.code), setShow(false);
                        }}
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
                </View>
                 )
              }
            
              )}
            </View>
            <View style={{paddingVertical: 25}} />
          </KeyboardAwareScrollView>
          <View style={{paddingVertical: 5}} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'space-between',
  },
  horizontalLine: {
    borderBottomWidth: 5,
    width: '100%',
    borderBottomColor: '#F0F0F0',
    paddingVertical: 2,
  },
  coupon: {
    marginHorizontal: 10,
    backgroundColor: '#F4F4F4',
    padding: 10,
    marginTop: 15,
    flexDirection: 'row',
    gap: 10,
    borderRadius: 50,
    height: 50,
    alignItems: 'center',
  },
  horizontalLineLight: {
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: '#DBDBDB',
    paddingVertical: 10,
  },
  horizontalLineDashed: {
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    top: 6,
    margin: -2,
    marginTop: 0,
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

export default ViewCartScreen;
