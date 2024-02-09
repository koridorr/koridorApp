import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {FavoriteProductCard, Text, Touchable} from '../../../components';
import {ICON_NAMES} from '../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../helpers/styles';
import {Button, Header} from '../../../widgets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../widgets/Loader';
import {goBack, navigate} from '../../../navigation';
import ViewCart from '../MyOrders/ViewCart';
type foodCategory = {
  _id: number;
  image: any;
  name: string;
};

type favoriteItems = {
  _id: number;
  image: any;
  name: string;
  text: string;
  amount: string;
  icon: any;
  rating: string;
  seller: string;
};

type HomeViewPropTypes = {
  loading: boolean;
  foodCategory: foodCategory[];
  selectedCategory: any;
  like: boolean;
  favProducts: [];
  cartData: [];
  categoryName: string;
  show: boolean;
  search: string;
  isFocused: boolean;
  addNew: boolean;
  setAddNew: Dispatch<SetStateAction<boolean>>;
  setFavProducts: Dispatch<SetStateAction<[]>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  setLike: Dispatch<SetStateAction<boolean>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedCategory: Dispatch<SetStateAction<number>>;
  favoriteItems: favoriteItems[];
  goToFilter: () => void;
  searchProduct: () => void;
  viewCart: () => void;
};

export const AllCategoriesView = ({
  viewCart,
  cartData,
  setAddNew,
  addNew,
  foodCategory,
  setFavProducts,
  favProducts,
  setIsFocused,
  isFocused,
  searchProduct,
  search,
  setSearch,
  show,
  setShow,
  loading,
  categoryName,
  setLike,
  goToFilter,
  selectedCategory,
  setSelectedCategory,
  favoriteItems,
  setLoading,
}: HomeViewPropTypes) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{}}>
          <Header
            title={show ? '' : categoryName}
            customContainerStyle={{width: show ? '0%' : '90%'}}
          />
        </View>
        <View>
          {show ? (
            <View style={{flexDirection: 'row'}}>
              <View>
                <TextInput
                  placeholderTextColor={'lightgrey'}
                  placeholder="Type to search..."
                  style={[
                    styles.search,
                    {
                      borderColor: isFocused ? colors.green : '#F3F3F3',
                    },
                  ]}
                  value={search}
                  maxLength={35}
                  onBlur={() => setIsFocused(false)}
                  onFocus={() => setIsFocused(true)}
                  onChangeText={text => searchProduct(text)}
                />
                <FastImage
                  tintColor={'grey'}
                  source={ICON_NAMES.search}
                  style={{
                    height: screenHeight / 20,
                    width: 20,
                    position: 'absolute',
                    left: 11,
                    justifyContent: 'center',
                    flex: 1,
                  }}
                  resizeMode="contain"
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShow(false), setSearch('');
                }}
                style={{paddingTop: 6, paddingLeft: 5}}>
                <FastImage
                  source={ICON_NAMES.cross}
                  style={{
                    height: screenHeight / 20,
                    width: 20,
                    position: 'absolute',
                    left: 11,
                    justifyContent: 'center',
                    flex: 1,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ) : undefined}
        </View>
        {foodCategory?.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              right: 20,
              padding: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setShow(true)}>
              {!show && (
                <View>
                  <FastImage
                    source={ICON_NAMES.search}
                    style={{height: 22, width: 22, right: 5}}
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
            <Touchable
              style={{left: 10}}
              onPress={() => {
                goToFilter();
              }}>
              <FastImage
                source={ICON_NAMES.filter}
                style={{height: 25, width: 25}}
                resizeMode="contain"
              />
            </Touchable>
          </View>
        )}
      </View>

      <View style={styles.container}>
        {favoriteItems?.length > 0 && !show ? (
          <View style={styles.middleText}>
            <Text fontFamily={fonts.BOLD} fontSize={16}>
              {`${favoriteItems?.length} items`}
            </Text>
          </View>
        ) : (
          <View style={{paddingVertical: 12}}></View>
        )}
        <KeyboardAwareScrollView
          contentContainerStyle={{alignItems: 'center'}}
          style={{
            flexGrow: 1,
            height: !show ? screenHeight / 4.5 : 0,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            {!show &&
              foodCategory?.map((item, index) => {
                return (
                  <Touchable
                    key={index}
                    style={[
                      styles.foodCard,
                      {
                        borderColor: colors.green,
                        borderWidth: selectedCategory === item?._id ? 1.5 : 0,
                      },
                    ]}
                    onPress={() => setSelectedCategory(item?._id)} // Set the selected category
                  >
                    <FastImage
                      source={{uri: item.image}}
                      style={{
                        height: screenHeight / 13,
                        width: screenWidth / 7,
                      }}
                      resizeMode="cover"
                    />
                    <Text
                      customStyle={{alignItems: 'center', textAlign: 'center'}}
                      fontSize={10}
                      fontFamily={fonts.BOLD}>
                      {item.name}
                    </Text>
                  </Touchable>
                );
              })}
          </View>
        </KeyboardAwareScrollView>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          style={{height: screenHeight}}>
          {favoriteItems?.length > 0 && foodCategory?.length > 0 ? (
            <View
              style={{
                top: 10,
                paddingHorizontal: 15,
                flex: 1,
              }}>
              {favoriteItems?.map((item, index) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      left: 4,
                    }}
                    key={index}>
                    <FavoriteProductCard
                      favProducts={favProducts}
                      setFavProducts={setFavProducts}
                      headings={false}
                      addButton={false}
                      counter={true}
                      item={item}
                      page={''}
                      addNew={addNew}
                      setAddNew={setAddNew}
                    />
                  </View>
                );
              })}
              <View style={{paddingVertical: 5}} />
            </View>
          ) : (
            <View style={{alignSelf: 'center', paddingTop: screenHeight / 4}}>
              <Text>No Products Found</Text>
            </View>
          )}
        </KeyboardAwareScrollView>
        {cartData?.products?.length > 0 && (
          <View
            style={{
              paddingHorizontal: 12,
              bottom: Platform.OS === 'ios' ? 15 : 1,
            }}>
            <Touchable
              onPress={() => viewCart()}
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
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}>
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
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                  }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textField: {
    width: 150,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 30,
  },
  inputContainer: {
    justifyContent: 'center',
    top: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
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
    borderColor: '#F5F5F5',
    height: screenHeight / 8,
    width: screenWidth / 3.8,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
    justifyContent: 'center',
  },

  middleText: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    left: 4,
  },
  horizontalLine: {
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    margin: -2,
    marginTop: 0,
  },
  orTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  search: {
    width: screenWidth / 1.8,
    height: screenHeight / 20,
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: screenWidth / 10,
    fontSize: 13,
    color: colors.black,
  },
});
