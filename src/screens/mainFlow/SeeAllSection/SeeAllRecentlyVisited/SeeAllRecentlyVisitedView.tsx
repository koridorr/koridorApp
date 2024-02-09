import React, { Dispatch, SetStateAction } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { VisitedStore } from '../../../../components';
import { IMAGE_NAMES } from '../../../../helpers/constants';
import { Header } from '../../../../widgets';



type venderDataType = {
  image: any;
  name: string;
};

type SeeAllRecentlyVisitedTypes = {
  venderData: venderDataType[];
  favVendors: venderDataType[];
  setFavVendors:Dispatch<SetStateAction<never[]>>
  
  


};
const SeeAllRecentlyVisitedView = ({ venderData ,favVendors,setFavVendors}: SeeAllRecentlyVisitedTypes) => {
  
  return (
    <>
      <Header title="Visited Store" />
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={venderData}
            renderItem={({ item, index }) => (
              <View
              style={{flex:1,paddingVertical:8}}
              key={index}
              >
                <VisitedStore setFavVendors={setFavVendors} favVendors={favVendors} data={item} page={''} />
              </View>
            )}
          />
           <View style={{paddingVertical:15}}/>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    top: 10,
    paddingHorizontal: 15,
  },
});

export default SeeAllRecentlyVisitedView;
