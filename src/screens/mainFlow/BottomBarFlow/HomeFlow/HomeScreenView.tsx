import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
  RefreshControl,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import FastImage, {Source} from 'react-native-fast-image';
import {
  AddCartCard,
  BrandCard,
  FavoriteProductCard,
  Text,
  Touchable,
  VisitedStore,
} from '../../../../components';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {navigate} from '../../../../navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {User} from '../../../../types/User';
import Loader from '../../../../widgets/Loader';
import {Dropdown, Input} from '../../../../widgets';

type foodCategory = {
  image: any;
  name: string;
};

type foodCard = {
  image: any;
  name: string;
  add: string;
  quantity: string;
  product: string;
  icon: any;
  code: string;
};

type brands = {
  id: number;
  icon: any;
  image: any;
  name: string;
  cuttedAmount: string;
  amount: string;
  vendors: [];
};

type HomeViewPropTypes = {
  foodCategory: never[];
  productData: foodCard[];
  favProducts: never[];
  checkWithBrand: (data: any) => Promise<void>;
  brands: brands[];
  userData: User | undefined;
  loading: boolean;
  user: User | null;
  like: boolean;
  favItems: never[];
  bestSellingData: never[];
  favItemId: never[];
  setLike: Dispatch<SetStateAction<boolean>>;
  vendorData: foodCard[];
  favVendors: never[];
  cartData: any;
  selectedInd: number;
  getCart: () => void;
  setSelectedInd: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFavProducts: React.Dispatch<React.SetStateAction<any>>;
  setFavVendors: Dispatch<SetStateAction<any>>;
  _onRefresh: () => void;
};

export const HomeScreenView = ({
  getCart,
  foodCategory,
  productData,
  favItems,
  bestSellingData,
  brands,
  userData,
  loading,
  favItemId,
  cartData,
  user,
  vendorData,
  setFavVendors,
  favVendors,
  like,
  selectedInd,
  setLike,
  setLoading,
  setFavProducts,
  checkWithBrand,
  setSelectedInd,
  vendors,
  _onRefresh,
}: HomeViewPropTypes) => {
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={_onRefresh} />
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 15,
            paddingHorizontal: 15,
          }}>
          <Touchable
            onPress={() => navigate('ProfileStack', {screen: 'EditProfile'})}>
            <Text fontFamily={fonts.BOLD} fontSize={16}>
              {`${user?.firstName || userData?.firstName || 'User'} `}
            </Text>

            {user?.city && user?.city?.length ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  right: 4,
                }}>
                <FastImage
                  source={ICON_NAMES.location}
                  style={{height: 15, width: 15}}
                  resizeMode="cover"
                />
                <Text fontSize={12} color={colors?.darkGrey}>
                  {user?.city?.length > 35
                    ? user?.city?.slice(0, 35) + '..'
                    : user?.city}
                </Text>
              </View>
            ) : undefined}
          </Touchable>

          <Touchable
            onPress={() =>
              navigate('OrderStack', {
                screen: 'ViewCart',
                params: {
                  code: false,
                },
              })
            }
            style={{right: 3}}>
            <ImageBackground
              source={ICON_NAMES.cartFilled}
              style={{height: 25, width: 25}}
              resizeMode="contain">
              {cartData > 0 ? (
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
                    {cartData}
                  </Text>
                </View>
              ) : null}
            </ImageBackground>
          </Touchable>
        </View>
        <View style={{paddingTop: 10, paddingHorizontal: 8}}>
          <Touchable
            style={[
              styles.inputButton,
              {
                borderColor: selectedInd === -2 ? colors.green : '#F3F3F3',
              },
            ]}
            onPress={() => {
              setSelectedInd(-2);
              navigate('SearchScreen', undefined);
            }}>
            <FastImage
              source={ICON_NAMES.search}
              style={{
                height: 20,
                width: 20,
              }}
              resizeMode="cover"
            />
            <Text fontSize={12} color="#848484" customStyle={{left: 8}}>
              Search here
            </Text>
          </Touchable>
        </View>
        {foodCategory?.length > 0 && (
          <View>
            <View style={styles.middleText}>
              <Text fontFamily={fonts.BOLD} fontSize={16}>
                All Category
              </Text>
              {foodCategory?.length > 2 ? (
                <Touchable
                  style={styles.seeAllButton}
                  onPress={() => {
                    navigate('SeeAllCategory', {
                      body: {
                        data: foodCategory,
                        vendorId: bestSellingData[0]?.vendorId?._id,
                      },
                    });
                  }}>
                  <Text fontFamily={fonts.BOLD} fontSize={10}>
                    See All
                  </Text>
                </Touchable>
              ) : (
                ''
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',

                justifyContent:
                  foodCategory?.length > 2 ? 'center' : 'flex-start',
                paddingHorizontal: foodCategory?.length > 2 ? 0 : 15,
              }}>
              {foodCategory?.slice(0, 6)?.map((item, index) => {
                return (
                  <Touchable
                    onPress={() => {
                      setSelectedInd(index),
                        navigate('AllCategories', {
                          body: {
                            categoryId: item?._id,
                            startRange: 1,
                            endRange: 10000,
                            sortBy: '',
                            rating: '',
                            vendorId: bestSellingData[0]?.vendorId?._id,
                          },
                        });
                    }}
                    style={[
                      styles.foodCard,
                      {
                        borderColor:
                          selectedInd === index ? colors.green : '#F5F5F5',
                      },
                    ]}
                    key={index}>
                    <View style={{alignItems: 'center'}}>
                      <FastImage
                        source={{uri: item.image}}
                        style={{height: 70, width: 70, borderRadius: 5}}
                        resizeMode="cover"
                      />
                      <Text
                        customStyle={{
                          textAlign: 'center',
                          paddingHorizontal: 4,
                        }}
                        fontSize={11}
                        fontFamily={fonts.BOLD}>
                        {item.name}
                      </Text>
                    </View>
                  </Touchable>
                );
              })}
            </View>
          </View>
        )}
        {favVendors?.length > 0 && (
          <View>
            <View style={styles.middleText}>
              <Text fontFamily={fonts.BOLD} fontSize={16}>
                Recently Visited Store
              </Text>
              {favVendors?.length > 2 ? (
                <Touchable
                  style={styles.seeAllButton}
                  onPress={() => navigate('SeeAllRecentlyVisited', vendorData)}>
                  <Text fontFamily={fonts.BOLD} fontSize={10}>
                    See All
                  </Text>
                </Touchable>
              ) : (
                ''
              )}
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {favVendors?.slice(0, 2)?.map((item, index) => {
                return (
                  <View style={{paddingVertical: 8}} key={index}>
                    <VisitedStore
                      setFavVendors={setFavVendors}
                      favVendors={favVendors}
                      page={'home'}
                      data={item}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        )}
        {bestSellingData?.length > 0 && (
          <View>
            <View style={styles.middleText}>
              <Text fontFamily={fonts.BOLD} fontSize={16}>
                Best Selling Products
              </Text>

              {productData?.length > 2 ? (
                <Touchable
                  style={styles.seeAllButton}
                  onPress={() =>
                    navigate('SeeAllBestSelling', {data: bestSellingData})
                  }>
                  <Text fontFamily={fonts.BOLD} fontSize={10}>
                    See All
                  </Text>
                </Touchable>
              ) : (
                ''
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: 18,
                justifyContent: 'space-between',
                gap: 5,
              }}>
              {bestSellingData?.slice(0, 6)?.map((item, index) => {
                return (
                  <Touchable
                    onPress={() =>
                      navigate('OrderStack', {
                        screen: 'MyCart',
                        params: {
                          data: item?.vendorId,
                          fromClick: 'home',
                        },
                      })
                    }
                    key={index}>
                    <AddCartCard
                      getCart={getCart}
                      setFavProducts={setFavProducts}
                      favProducts={favItems}
                      setLike={setLike}
                      like={like}
                      index={index}
                      item={item}
                      setLoading={setLoading}
                    />
                  </Touchable>
                );
              })}
            </View>
          </View>
        )}
        {bestSellingData?.length == 0 && productData?.length > 0 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: 18,
                justifyContent: 'space-between',
                gap: 5,
              }}>
              {productData?.slice(0, 6)?.map((item, index) => {
                return (
                  <Touchable
                    onPress={() =>
                      navigate('OrderStack', {
                        screen: 'MyCart',
                        params: {
                          data: item?.vendorId,
                          fromClick: 'home',
                        },
                      })
                    }
                    key={index}>
                    <AddCartCard
                      getCart={getCart}
                      setFavProducts={setFavProducts}
                      favProducts={favItems}
                      setLike={setLike}
                      like={like}
                      index={index}
                      item={item}
                      setLoading={setLoading}
                    />
                  </Touchable>
                );
              })}
            </View>
          </View>
        )}
        <View style={{paddingVertical: favItems?.length === 0 ? 10 : 0}} />
        {favItems?.length ? (
          <View style={styles.middleText}>
            <Text fontFamily={fonts.BOLD} fontSize={16}>
              Favorite Products
            </Text>
            <Touchable
              style={styles.seeAllButton}
              onPress={() => navigate('MyWishlist', undefined)}>
              <Text fontFamily={fonts.BOLD} fontSize={10}>
                See All
              </Text>
            </Touchable>
          </View>
        ) : undefined}

        {favItems?.slice(0, 2)?.map((item, index) => {
          return (
            <View
              style={{paddingHorizontal: 18, paddingVertical: 8}}
              key={index}>
              <FavoriteProductCard
                page={'home'}
                headings={false}
                addButton={false}
                counter={false}
                item={item}
                favProducts={favItems}
                setFavProducts={setFavProducts}
                addNew={false}
                setAddNew={function (value: SetStateAction<boolean>): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </View>
          );
        })}
        {brands?.length > 0 ? (
          <View style={{backgroundColor: '#EFEFEF', marginTop: 18}}>
            <View style={styles.orTextContainer}>
              <View style={styles.horizontalLine} />
              <View
                style={{width: '26%', display: 'flex', alignItems: 'center'}}>
                <Text
                  customStyle={{
                    color: colors.black,
                    fontFamily: fonts.BOLD,
                    fontSize: 24,
                    top: 5,
                  }}>
                  Brands
                </Text>
              </View>
              <View style={styles.horizontalLine} />
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={{paddingTop: 8}}
              horizontal={true}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingTop: 10,
                }}>
                {brands?.map((item, index) => {
                  return (
                    <View style={{justifyContent: 'center'}} key={index}>
                      <Touchable
                        onPress={() => checkWithBrand(item)}
                        key={index}>
                        <BrandCard item={item} index={index} />
                      </Touchable>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View style={{paddingVertical: 35}} />
          </View>
        ) : (
          <View
            style={{justifyContent: 'center', alignSelf: 'center', flex: 1}}>
            <Text fontFamily={fonts.BOLD}>No Products Found</Text>
          </View>
        )}
        <View style={{paddingVertical: 8}}></View>
      </KeyboardAwareScrollView>
      <Modal
        //  statusBarTranslucent
        isVisible={false}
        //  onBackButtonPress={false}
        //  backdropOpacity={0.3}
        //  deviceHeight={screenHeight/2}
        //  deviceWidth={screenWidth}
        //  style={{backgroundColor:"red",height:44}}
      >
        <View
          style={{
            backgroundColor: 'red',
            flex: 0.8,
            width: screenWidth,
            alignSelf: 'center',
            paddingHorizontal: 11,
          }}>
          <View style={{paddingTop: 15}}>
            <Input
              customIconLeft={IMAGE_NAMES.mail}
              showLeftIcon
              blackPlaceholder
              placeholder="Location"
              customContainerStyle={{
                borderWidth: 1,
                borderRadius: 12,
                paddingLeft: 7,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#F7F4F4',
                borderRadius: 8,
              }}>
              <FastImage
                style={{height: 25, width: 25}}
                source={ICON_NAMES.shop}
              />
              <Dropdown
                customIconLeft={IMAGE_NAMES.mail}
                // value={selectedBank}
                // setValue={setSelectedBank}
                items={vendors}
                // setItems={setBankNames}
                placeholder="Select Bank"
              />
            </View>

            {/* <Dropdown
              
              /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  textField: {
    width: 150,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 30,
  },
  activeDot: {
    backgroundColor: 'black',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    top: 20,
  },
  dot: {
    backgroundColor: 'gray',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    top: 20,
  },
  icon: {
    position: 'absolute',
    right: 10,
    color: 'black',
  },

  seeAllButton: {
    backgroundColor: colors.green,
    borderRadius: 20,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodCard: {
    borderWidth: 1,
    paddingVertical: Platform.OS === 'android' ? 8 : 15,

    // height: screenHeight / 7,
    width: screenWidth / 3.4,
    alignItems: 'center',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
  },

  middleText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  horizontalLine: {
    width: '40%',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    top: 4,
    margin: -2,
    marginTop: 0,
  },
  orTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    top: 10,
  },
  inputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGrey,
    height: 50,
    borderRadius: 50,
    margin: 4,
    paddingHorizontal: 15,
  },
});
