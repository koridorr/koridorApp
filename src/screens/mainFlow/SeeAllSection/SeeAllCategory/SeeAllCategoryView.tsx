import React, { Dispatch, SetStateAction } from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../../components';
import {IMAGE_NAMES} from '../../../../helpers/constants';
import {colors, fonts} from '../../../../helpers/styles';
import {goBack, navigate} from '../../../../navigation';
import {Header} from '../../../../widgets';

type foodCategory = {
  _id: any;
  image: any;
  name: string;
};

type SeeAllCategoryPropTypes = {
  vendorId:string
  selectedInd:number,
  setSelectedInd: Dispatch<SetStateAction<number>>;
  allCategory: foodCategory[];
};

const SeeAllCategoryView = ({
  vendorId,
  allCategory,
  selectedInd,
  setSelectedInd,
}: SeeAllCategoryPropTypes) => {
  return (
    <>
      <Header title="All Category" />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingTop: 20,
          }}>
          {allCategory?.map((item, index) => {
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
                      vendorId:vendorId
                    },
                  });
                }}
                style={[styles.foodCard,{
                  borderColor: selectedInd===index?colors.green: '#F5F5F5',
                }]}
                key={index}>
                <FastImage
                  source={{uri: item.image}}
                  style={{height: 70, width: 70,borderRadius:5}}
                  resizeMode="cover"
                />
                <View style={{width: '90%'}}>
                  <Text
                    customStyle={{alignItems: 'center', textAlign: 'center'}}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,

    paddingHorizontal: 1,
  },
  foodCard: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    height: 110,
    width: 108,
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
  },
});

export default SeeAllCategoryView;
