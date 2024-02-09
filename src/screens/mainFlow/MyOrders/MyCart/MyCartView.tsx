import React, {Dispatch, SetStateAction} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FavoriteProductCard, Text, Touchable} from '../../../../components';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {goBack, navigate} from '../../../../navigation';
import Share from 'react-native-share';
import {assertCast} from '@reduxjs/toolkit/dist/query/tsHelpers';
import Loader from '../../../../widgets/Loader';
import moment from 'moment';
import {Header} from '../../../../widgets';

type vendorDetailsType = {
  businessImages: any;
  storeName: string | undefined;
  firstName: string | undefined;
  rating: number;
  openingTime: any;
  endingTime: any;
  storeAddress: any;
  _id: string;
  accountHolderName: string;
};
type productDataType = {
  products: string;
  totalPriceOfProducts: number;
};

type MyCartPropTypes = {
  like: boolean;
  loading: boolean;
  addNew: boolean;
  favProducts: never[];
  setFavProducts: React.Dispatch<React.SetStateAction<never[]>>;
  setLike: Dispatch<SetStateAction<boolean>>;
  setAddNew: Dispatch<SetStateAction<boolean>>;

  setLoading: Dispatch<SetStateAction<boolean>>;
  vendorDetails: vendorDetailsType;
  productData: productDataType[];
  cartData: any;
  refreshing: boolean;
  onRefresh: () => void;
  getMoreData: () => void;
  addFavoriteStore: (id: string) => Promise<void>;
  routekey: string;
};

const MyCartView = ({
  favProducts,
  setFavProducts,
  loading,
  like,
  setLike,
  vendorDetails,
  productData,
  setLoading,
  cartData,
  setAddNew,
  addNew,
  routekey,
  addFavoriteStore,
  refreshing,
  getMoreData,
  onRefresh,
}: MyCartPropTypes) => {
  const share = async () => {
    const options = {
      title: 'Share via',
      message: 'Share on',
      social: Share.Social.WHATSAPP,
      whatsAppNumber: '9199999999',
      filename: 'test',
    };
    const res = await Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Loader loading={refreshing ? false : loading} />
      {routekey == 'home' ? <Header title="Best Selling Products" /> : null}
      <View style={{flex: 1}}>
        {productData?.length > 0 ? (
          <View style={{flex: 1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              onRefresh={() => onRefresh()}
              refreshing={refreshing}
              data={productData}
              renderItem={(ele: any, index: React.Key | null | undefined) => {
                return (
                  <View
                    style={{
                      flex: 1,
                    }}
                    key={index}>
                    <View style={{}}>
                      {ele?.index == 0 ? (
                        <View style={{}}>
                          {routekey !== 'home' ? (
                            <ImageBackground
                              source={{uri: vendorDetails?.businessImages[0]}}
                              resizeMode="cover"
                              style={{
                                height: screenHeight / 3,
                                width: screenWidth,
                                backgroundColor: '#F9F9F9',
                              }}
                              imageStyle={{
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                              }}>
                              <View
                                style={{
                                  padding: 20,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <Touchable onPress={() => goBack()}>
                                  <FastImage
                                    source={ICON_NAMES.whiteBackArrow}
                                    style={{height: 30, width: 30}}
                                    resizeMode="contain"
                                  />
                                </Touchable>
                                <View style={{flexDirection: 'row', gap: 10}}>
                                  <View>
                                    {/* <FastImage
                                      source={ICON_NAMES.share}
                                      style={{height: 30, width: 30}}
                                      resizeMode="contain"
                                    /> */}
                                  </View>
                                  <View style={{}}>
                                    {like ? (
                                      <Touchable
                                        onPress={() => {
                                          setLike(true),
                                            addFavoriteStore(
                                              vendorDetails?._id,
                                            );
                                        }}
                                        style={{
                                          backgroundColor: colors.white,
                                          padding: 3.8,
                                          borderRadius: 25,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <FastImage
                                          source={ICON_NAMES.heart2}
                                          style={{
                                            height: 22,
                                            width: 22,
                                            top: 1,
                                          }}
                                          resizeMode="contain"
                                        />
                                      </Touchable>
                                    ) : (
                                      <Touchable
                                        onPress={() => {
                                          setLike(false),
                                            addFavoriteStore(
                                              vendorDetails?._id,
                                            );
                                        }}
                                        style={{
                                          backgroundColor: colors.white,
                                          padding: 3.8,
                                          borderRadius: 25,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <FastImage
                                          source={ICON_NAMES.heart}
                                          style={{
                                            height: 22,
                                            width: 22,
                                            top: 1,
                                          }}
                                          resizeMode="contain"
                                        />
                                      </Touchable>
                                    )}
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'flex-end',
                                  flex: 1,
                                }}>
                                <ImageBackground
                                  source={IMAGE_NAMES.shadow}
                                  style={{
                                    height: screenHeight / 5,
                                    width: screenWidth,
                                    borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20,
                                    alignSelf: 'flex-end',
                                    justifyContent: 'flex-end',
                                  }}
                                  imageStyle={{
                                    borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20,
                                  }}
                                  resizeMode="cover">
                                  <View
                                    style={{
                                      justifyContent: 'flex-end',
                                      flex: 1,
                                      top: 30,
                                    }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        bottom: screenHeight / 18,
                                        paddingHorizontal: 15,
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                        }}>
                                        <Text
                                          customStyle={{color: colors.white}}
                                          fontSize={26}
                                          fontFamily={fonts.BOLD}>
                                          {vendorDetails?.storeName}
                                        </Text>
                                      </View>
                                      {vendorDetails?.rating > 0 ? (
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            paddingTop: 8,
                                          }}>
                                          <FastImage
                                            source={ICON_NAMES.star}
                                            style={{
                                              height: 15,
                                              width: 15,
                                              top: 3,
                                              right: 3,
                                            }}
                                            resizeMode="contain"
                                          />
                                          <Text
                                            fontSize={14}
                                            fontFamily={fonts.BOLD}
                                            color={colors.white}>
                                            {vendorDetails?.rating?.toFixed(1)}
                                          </Text>
                                        </View>
                                      ) : undefined}
                                    </View>
                                  </View>
                                </ImageBackground>
                              </View>
                            </ImageBackground>
                          ) : null}

                          {routekey !== 'home' ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                paddingTop: 15,
                              }}>
                              {vendorDetails?.openingTime ? (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    gap: 6,
                                    alignItems: 'flex-end',
                                  }}>
                                  <Text
                                    fontSize={10}
                                    fontFamily={fonts.REGULAR}>
                                    Opening Time
                                  </Text>
                                  <Text fontSize={14} fontFamily={fonts.BOLD}>
                                    {moment(vendorDetails?.openingTime).format(
                                      'LT',
                                    )}
                                  </Text>
                                </View>
                              ) : null}

                              {vendorDetails?.endingTime ? (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    gap: 6,
                                    alignItems: 'flex-end',
                                  }}>
                                  <Text
                                    fontSize={10}
                                    fontFamily={fonts.REGULAR}>
                                    Closing Time
                                  </Text>
                                  <Text fontSize={14} fontFamily={fonts.BOLD}>
                                    {moment(vendorDetails?.endingTime).format(
                                      'LT',
                                    )}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                          ) : null}
                          {routekey !== 'home' ? (
                            <View style={styles.horizontalLineDashed} />
                          ) : null}

                          {vendorDetails?.storeAddress &&
                          routekey !== 'home' ? (
                            <View
                              style={{
                                width: screenWidth / 1.06,
                                paddingHorizontal: 9,
                                paddingTop: screenHeight / 22,
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <FastImage
                                  source={ICON_NAMES.locationIcn}
                                  style={{height: 15, width: 14, top: 2}}
                                  resizeMode="contain"
                                />
                                <Text
                                  fontFamily={fonts.REGULAR}
                                  customStyle={{paddingLeft: 2}}
                                  color={colors.lightGrey}
                                  fontSize={12}>
                                  {vendorDetails?.storeAddress}
                                </Text>
                              </View>
                              <View style={{paddingVertical: 22}} />
                            </View>
                          ) : null}

                          <View
                            style={{
                              paddingHorizontal: 10,
                              paddingVertical: 7,
                              left: 8,
                            }}>
                            <Text fontSize={14} fontFamily={fonts.BOLD}>
                              Best Products
                            </Text>
                          </View>
                        </View>
                      ) : null}
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: ele?.index === 1 ? 1 : 15,
                        flex: 1,
                      }}>
                      <FavoriteProductCard
                        favProducts={favProducts}
                        setFavProducts={setFavProducts}
                        headings={false}
                        counter={true}
                        addButton={false}
                        item={ele?.item}
                        addNew={addNew}
                        setAddNew={setAddNew}
                        page={''}
                      />
                    </View>
                  </View>
                );
              }}
              onEndReached={getMoreData}
            />
          </View>
        ) : (
          <View
            style={{alignSelf: 'center', flex: 1, justifyContent: 'center'}}>
            <Text fontFamily={fonts.BOLD}>Please wait...</Text>
          </View>
        )}
      </View>
      {cartData?.products?.length > 0 && (
        <View
          style={{
            paddingTop: 12,
            paddingHorizontal: 12,
            paddingBottom: Platform.OS === 'ios' ? 11 : 5,
          }}>
          <Touchable
            onPress={() => navigate('ViewCart', {code: false})}
            style={{
              justifyContent: 'center',
              height: screenHeight / 15,

              borderRadius: 50,
              backgroundColor: colors.green,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 25,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Text
                  fontSize={18}
                  fontFamily={fonts.BOLD}
                  customStyle={{
                    color: colors.black,
                  }}>
                  {`$${cartData?.totalPriceOfProducts}`}
                </Text>
                <Text
                  fontSize={14}
                  fontFamily={fonts.REGULAR}
                  customStyle={{
                    color: colors.black,
                  }}>
                  {`${cartData?.products?.length} Items`}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                <FastImage
                  source={ICON_NAMES.bagOutlined}
                  style={{width: 22, height: 22}}
                  resizeMode="contain"
                />

                <Text
                  fontSize={14}
                  fontFamily={fonts.BOLD}
                  customStyle={{
                    color: colors.black,
                  }}>
                  View Cart
                </Text>
              </View>
            </View>
          </Touchable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  horizontalLineDashed: {
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    top: 18,
    margin: -2,
    marginTop: 0,
  },
  verticalLine: {
    borderLeftWidth: 1,
    width: 1,
    left: 1,
    borderLeftColor: colors.lightGrey,
  },
});

export default MyCartView;
