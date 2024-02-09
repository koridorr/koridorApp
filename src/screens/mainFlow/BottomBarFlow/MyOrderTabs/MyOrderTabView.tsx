import React, {Dispatch, SetStateAction} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Text, Touchable} from '../../../../components';
import {IMAGE_NAMES} from '../../../../helpers/constants';
import OrderCard from '../../../../components/OrderCard';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {goBack} from '../../../../navigation';
import {Header} from '../../../../widgets';
import Loader from '../../../../widgets/Loader';

type MyOrdersPropTypes = {
  loading: boolean;
  orderData: [];
  handleNavigate: any;
  refreshing: boolean;
  onRefresh: () => void;
  getMoreData: () => void;
};

const MyOrderTabView = ({
  orderData,
  loading,
  handleNavigate,
  refreshing,
  getMoreData,
  onRefresh,
}: MyOrdersPropTypes) => {
  // console.log(orderData, 'DATA====');
  // const newOrders = orderData.flatMap((item: any) => item.orderproducts);

  const newOrders = orderData.flatMap((item: any) => {
    const orderNo = item.OrderNo;
    return item.orderproducts.map((product: any) => ({
      ...product,
      orderNo, // Add OrderNo to each product in orderproducts
    }));
  });

  return (
    <>
      <Header title="My Orders" />
      <Loader loading={refreshing ? false : loading} />
      <View style={styles.container}>
        {newOrders?.length ? (
          <View style={{flex: 1}}>
            <View
              style={{backgroundColor: '#F5F6F8', borderRadius: 15, flex: 0.9}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                onRefresh={() => onRefresh()}
                refreshing={refreshing}
                data={orderData}
                renderItem={(
                  item: any,
                  index: React.Key | null | undefined,
                ) => {
                  return (
                    <View style={{flex: 1, paddingTop: 5}} key={index}>
                      <OrderCard
                        page={1}
                        handleNavigate={handleNavigate}
                        item={item}
                      />
                    </View>
                  );
                }}
                onEndReached={getMoreData}
              />
              <View style={{paddingBottom: 10}} />
            </View>
          </View>
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 0.9}}>
            <Text fontFamily={fonts.BOLD}>No data found</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 18,
    paddingTop: 15,
  },
});

export default MyOrderTabView;
