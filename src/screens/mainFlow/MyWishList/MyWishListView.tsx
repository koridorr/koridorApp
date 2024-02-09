import React, {Dispatch, SetStateAction} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  FavoriteProductCard,
  Text,
  Touchable,
  WishlistProduct,
  WishlistStore,
} from '../../../components';
import {IMAGE_NAMES} from '../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../helpers/styles';
import {goBack} from '../../../navigation';
import {Header, Input} from '../../../widgets';
import Loader from '../../../widgets/Loader';

type favoriteItems = {
  id: number;
  image: any;
  name: string;
  text: string;
  amount: string;
  icon: any;
  rating: string;
  seller: string;
};

type WishListPropTypes = {
  loading: boolean;
  favoriteItems: favoriteItems[];
  products: favoriteItems[];
  wishlistVendors: favoriteItems[];
  currentTab: boolean;

  setLoading: Dispatch<SetStateAction<boolean>>;
  setCurrentTab: Dispatch<SetStateAction<boolean>>;
  removeFav: (id: string) => Promise<void>;
};

const MyWishListView = ({
  favoriteItems,
  setLoading,
  loading,
  currentTab,
  wishlistVendors,
  products,
  setCurrentTab,
  removeFav,
}: WishListPropTypes) => {
  return (
    <>
      <Header title="My WishList" />
      <Loader loading={loading} />
      <View style={styles.container}>
        <View
          style={{
            width: screenWidth / 1.1,
            height: screenHeight / 14,
            borderRadius: 40,
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: '#EFEFEF',
          }}>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Touchable
                onPress={() => setCurrentTab(true)}
                style={{
                  justifyContent: 'center',
                  width: screenWidth / 2.2,
                  alignItems: 'center',
                  height: screenHeight / 15,
                  borderRadius: 50,
                  backgroundColor: currentTab ? colors.green : '#EFEFEF',
                }}>
                <Text
                  fontSize={14}
                  fontFamily={fonts.BOLD}
                  customStyle={{
                    color: !currentTab ? '#A2A2A2' : colors.black,
                  }}>
                  Product
                </Text>
              </Touchable>

              <Touchable
                onPress={() => setCurrentTab(false)}
                style={{
                  justifyContent: 'center',
                  width: screenWidth / 2.2,
                  alignItems: 'center',
                  height: screenHeight / 15,
                  borderRadius: 50,
                  backgroundColor: !currentTab ? colors.green : '#EFEFEF',
                }}>
                <Text
                  fontSize={14}
                  fontFamily={fonts.BOLD}
                  customStyle={{
                    color: currentTab ? '#A2A2A2' : colors.black,
                  }}>
                  Store
                </Text>
              </Touchable>
            </View>
          </View>
        </View>

        <View style={{paddingVertical: 20, flex: 1}}>
          {currentTab ? (
            <View>
              {products?.length > 0 ? (
                <View>
                  <View style={{paddingBottom: 10}}>
                    <Text customStyle={{fontFamily: fonts.BOLD}}>
                      {`${products?.length} Total Product`}
                    </Text>
                  </View>
                  <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View style={{flex: 1}}>
                        {products?.map((item, index) => {
                          return (
                            <View
                              style={{
                                paddingVertical: 10,
                                flex: 1,
                                paddingBottom: 30,
                              }}
                              key={index}>
                              <WishlistProduct
                                setLoading={setLoading}
                                removeFav={removeFav}
                                addButton={true}
                                counter={false}
                                item={item}
                                headings={false}
                              />
                            </View>
                          );
                        })}
                        <View style={{paddingVertical: 25}} />
                      </View>
                      <View style={{paddingVertical: 10}} />
                    </ScrollView>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: screenHeight / 3,
                  }}>
                  <Text fontFamily={fonts.BOLD}>No wishlist found</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={{flex: 1}}>
              {wishlistVendors?.length > 0 ? (
                <View>
                  <View style={{paddingBottom: 10}}>
                    <Text customStyle={{fontFamily: fonts.BOLD}}>
                      {`${wishlistVendors?.length} Total Store`}
                    </Text>
                  </View>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}>
                    <View>
                      {wishlistVendors?.map((item, index) => {
                        return (
                          <View style={{paddingVertical: 8}} key={index}>
                            <WishlistStore removeFav={removeFav} item={item} />
                          </View>
                        );
                      })}
                    </View>
                    <View style={{paddingVertical: 10}} />
                  </ScrollView>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text fontFamily={fonts.BOLD}>No wishlist found</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});

export default MyWishListView;
