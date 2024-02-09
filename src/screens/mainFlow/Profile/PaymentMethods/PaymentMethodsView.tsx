import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {MyAddressCard, Text} from '../../../../components';

import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {ProfileListType} from '../../../../types/ProfileList.d.types';

import {Button, Header} from '../../../../widgets';
import {navigate} from '../../../../navigation';
import PaymentCard from '../../../../components/PaymentCard';
import React from 'react';
import Loader from '../../../../widgets/Loader';

type ProfileFlowViewType = {
  GeneralList: ProfileListType[];
  askToDelete: (item: any) => void;
  cardData: [];
  loading: boolean;
};

export const PaymentMethodsView = ({
  loading,
  GeneralList,
  askToDelete,
  cardData,
}: ProfileFlowViewType) => (
  <>
    <Header title="Payment Methods" />
    <Loader loading={loading} />
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        contentContainerStyle={{
          paddingBottom: screenHeight / 10,
          flex: 1,
        }}>
        <View style={{paddingVertical: 10}}>
          <Text
            fontSize={16}
            fontFamily={fonts.REGULAR}
            customStyle={{left: 8}}>
            Debit/Credit Cards
          </Text>
        </View>
        <View style={{flex: 1}}>
          {cardData?.length > 0 ? (
            <View>
              {cardData?.map((item, index) => (
                <PaymentCard item={item} key={index} onPress={askToDelete} />
              ))}
            </View>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
              {!loading ? (
                <Text color={colors.lightGrey}>No card found</Text>
              ) : null}
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{paddingVertical: 10, bottom: 11}}>
        <Button
          onPress={() => navigate('AddNewCard', undefined)}
          value="Add New"
        />
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-around',
  },
});
