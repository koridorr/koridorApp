import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {FavoriteProductCard, Text, Touchable} from '../../../../components';
import {ICON_NAMES} from '../../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {Button, Header} from '../../../../widgets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../../widgets/Loader';
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
  favProducts: any;
  categoryName: string;
  show: boolean;
  search: string;
  brandName: string;
  setFavProducts: Dispatch<SetStateAction<any>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setLike: Dispatch<SetStateAction<boolean>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedCategory: Dispatch<SetStateAction<any>>;
  favoriteItems: favoriteItems[];
  goToFilter: () => void;
  searchProduct: () => void;
};

export const ProductByBrandView = ({
  setFavProducts,
  favProducts,
  brandName,
  show,
  loading,
  categoryName,
  favoriteItems,
}: HomeViewPropTypes) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{}}>
          <Header
            title={brandName ? brandName : ''}
            customContainerStyle={{width: show ? '0%' : '90%'}}
          />
        </View>
      </View>

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {favoriteItems?.length > 0 ? (
            <View style={{top: 10, paddingHorizontal: 15, flex: 1}}>
              {favoriteItems?.map((item, index) => {
                return (
                  <View style={{flex: 1, paddingVertical: 11}} key={index}>
                    <FavoriteProductCard
                      favProducts={favProducts}
                      setFavProducts={setFavProducts}
                      headings={false}
                      addButton={true}
                      counter={false}
                      item={item}
                      page={''}
                      addNew={false}
                      setAddNew={function (
                        value: SetStateAction<boolean>,
                      ): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  </View>
                );
              })}
              <View style={{paddingVertical: 90}} />
            </View>
          ) : (
            <View style={{alignSelf: 'center', paddingTop: screenHeight / 2.5}}>
              <Text>No Products Found</Text>
            </View>
          )}
        </ScrollView>
        <Loader loading={loading} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},

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
    borderColor: '#A2A2A2',
    fontSize: 13,
  },
});
