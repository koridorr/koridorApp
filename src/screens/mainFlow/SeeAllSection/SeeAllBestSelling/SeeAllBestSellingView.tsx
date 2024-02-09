import React, {Dispatch, SetStateAction} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import {AddCartCard, Text, Touchable} from '../../../../components';
import {IMAGE_NAMES} from '../../../../helpers/constants';
import {fonts} from '../../../../helpers/styles';
import {goBack, navigate} from '../../../../navigation';
import {Header} from '../../../../widgets';
import Loader from '../../../../widgets/Loader';

type foodCard = {
  vendorId: any;
  image: any;
  name: string;
  add: string;
  quantity: string;
  product: string;
  icon: any;
  code: string;
};

type BestSellingPropTypes = {
  loading: boolean;
  refreshing: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setLike: Dispatch<SetStateAction<boolean>>;
  BestSellingProd: foodCard[];
  favProduct: foodCard[];
  setFavProduct: Dispatch<SetStateAction<never[]>>;

  onRefresh: () => void;
  getMoreData: () => void;
};

const SeeAllBestSellingView = ({
  BestSellingProd,
  loading,
  favProduct,
  setFavProduct,
  setLoading,
  setLike,
  refreshing,
  onRefresh,
  getMoreData,
}: BestSellingPropTypes) => {
  var setFavProductdata: never[] = [];
  const getCart = () => {};
  return (
    <>
      <Header title="Best Selling Products" />
      <Loader loading={loading} />
      <View style={styles.container}>
        <View style={{alignSelf: 'center', flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={() => onRefresh()}
            refreshing={refreshing}
            data={BestSellingProd}
            numColumns={2}
            renderItem={({item, index}) => (
              <View key={index}>
                <Touchable
                  onPress={() =>
                    navigate('OrderStack', {
                      screen: 'MyCart',
                      params: {
                        data: item?.vendorId,
                      },
                    })
                  }>
                  <AddCartCard
                    getCart={getCart}
                    favProducts={favProduct}
                    index={index}
                    setLike={setLike}
                    setLoading={setLoading}
                    item={item}
                    setFavProducts={setFavProduct}
                    like={false}
                  />
                </Touchable>
              </View>
            )}
            onEndReached={getMoreData}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    // paddingHorizontal: ,
  },
});

export default SeeAllBestSellingView;
