import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {navigate} from '../../../navigation';
import {colors, fonts, screenHeight} from '../../../helpers/styles';

import {Button, Header, Input} from '../../../widgets';
import {ICON_NAMES} from '../../../helpers/constants';
import FastImage from 'react-native-fast-image';
import {FavoriteProductCard, Text, Touchable} from '../../../components';
import {Dispatch, SetStateAction} from 'react';
import React from 'react';
import Loader from '../../../widgets/Loader';
type SearchScreenViewType = {
  productData: [];
  favProducts: [];
  loading: boolean;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setFavProducts: Dispatch<SetStateAction<[]>>;
};

export const SearchScreenView = ({
  loading,
  search,
  setSearch,
  productData,
  setFavProducts,
  favProducts,
}: SearchScreenViewType) => (
  <View style={{flex: 1}}>
    <Header />
    <Loader loading={loading} />
    <View style={styles.container}>
      <Input
        maxLength={35}
        value={search}
        onChange={(text: SetStateAction<string>) => setSearch(text)}
        searchIcon
        placeholder="Search here"
        customInputStyle={{paddingLeft: 11, fontFamily: fonts.REGULAR}}
        customContainerStyle={{
          borderRadius: 50,
          height: 55,
          backgroundColor: '#F4F4F4',
          paddingLeft: 5,
          borderWidth: 1,
        }}
      />
      <View style={{paddingVertical: Platform.OS == 'ios' ? 11 : 5}} />
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}>
        {productData?.length > 0 ? (
          <View style={{paddingHorizontal: 15, flex: 1}}>
            {productData?.map((item, index) => {
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
                    setAddNew={function (value: SetStateAction<boolean>): void {
                      throw new Error('Function not implemented.');
                    }}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          <View style={{alignSelf: 'center', paddingTop: screenHeight / 3}}>
            {!loading ? <Text>No Products Found</Text> : null}
          </View>
        )}
      </ScrollView>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  inputContainer: {},
  divider: {
    borderBottomWidth: 2,
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomColor: '#F6F6F6',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    height: 45,
    width: 110,
    justifyContent: 'center',
    borderRadius: 50,
    margin: 4,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    gap: 5,
  },
  longButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    height: 45,
    width: 160,
    justifyContent: 'center',
    borderRadius: 50,
    margin: 4,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    gap: 5,
  },
});
