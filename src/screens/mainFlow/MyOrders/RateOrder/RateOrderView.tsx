import React, {Dispatch, SetStateAction, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../../components';
import {ICON_NAMES} from '../../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {navigate} from '../../../../navigation';
import {Button, Input} from '../../../../widgets';
import {Rating} from 'react-native-ratings';
import Loader from '../../../../widgets/Loader';
type RateOrderViewTypes = {
  starCount: number;
  description: string;
  loading: boolean;
  setStarCount: Dispatch<SetStateAction<number>>;
  setDescription: Dispatch<SetStateAction<string>>;
  addRating: () => void;
};

const RateOrderView = ({
  starCount,
  setStarCount,
  description,
  setDescription,
  addRating,
  loading,
}: RateOrderViewTypes) => {
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <ScrollView>
        <View style={{alignItems: 'flex-end'}}>
          <Touchable onPress={() => navigate('HomeScreen', undefined)}>
            <FastImage
              source={ICON_NAMES.crossBtn}
              style={{height: 30, width: 30}}
              resizeMode="contain"
            />
          </Touchable>
        </View>
        <View style={{alignItems: 'center', paddingTop: 50}}>
          <Text fontSize={24} fontFamily={fonts.BOLD}>
            Rate your Order
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: 10,
            marginTop: 20,
            paddingVertical: 10,
            paddingTop: 30,
          }}>
          <Text fontSize={14} fontFamily={fonts.BOLD}>
            RATE OUR GROCERY
          </Text>

          <View style={{}}>
            <Rating
              startingValue={starCount}
              minValue={1}
              maxStars={5}
              rating={starCount}
              fullStarColor={'#F2BC32'}
              style={{paddingHorizontal: 4, paddingVertical: 8}}
              onStartRating={(rating: number) => setStarCount(rating)}
            />
          </View>
        </View>

        <View style={{paddingVertical: 11}} />
        <Input
          customContainerStyle={{}}
          value={description}
          onChange={text => setDescription(text)}
          placeholder="Got any other suggestions? Let us Know"
        />
      </ScrollView>
      <View style={{paddingBottom: 20}}>
        <Button
          customStyle={{borderRadius: 50}}
          onPress={() => addRating()}
          value="Submit"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 18,
    paddingTop: 20,
  },
});

export default RateOrderView;
