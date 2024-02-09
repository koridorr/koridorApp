import React, { SetStateAction } from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FavoriteProductCard, Text, Touchable} from '../../../../components';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {goBack} from '../../../../navigation';

type favoriteItems = {
  id: number;
  image: any;
  name: string;
  text: string;
  amount: string;
  icon: any;
  rating: string;
  seller: string;
  count: string;
  productCategory: string;
};

type MyCartPropTypes = {
  favoriteItems: favoriteItems[];
};

const VisitedStoresView = ({favoriteItems}: MyCartPropTypes) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGE_NAMES.shopping}
          resizeMode="cover"
          style={{
            height: screenHeight / 3,
            width: screenWidth,
          }}
          imageStyle={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Touchable onPress={() => goBack()}>
              <FastImage
                source={ICON_NAMES.whiteBackArrow}
                style={{height: 30, width: 30}}
                resizeMode="contain"
              />
            </Touchable>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Touchable onPress={() => {}}>
                <FastImage
                  source={ICON_NAMES.share}
                  style={{height: 30, width: 30}}
                  resizeMode="contain"
                />
              </Touchable>
              <Touchable onPress={() => {}}>
                <FastImage
                  source={ICON_NAMES.like}
                  style={{height: 30, width: 30}}
                  resizeMode="contain"
                />
              </Touchable>
            </View>
          </View>

          <View>
            <FastImage
              source={IMAGE_NAMES.shadow}
              style={{
                height: screenHeight / 4.2,
                width: screenWidth,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              resizeMode="cover"
            />
          </View>
        </ImageBackground>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            bottom: 45,
          }}>
          <Text
            customStyle={{color: colors.white}}
            fontSize={26}
            fontFamily={fonts.SEMI_BOLD}>
            Shushiteria
          </Text>

          <View
            style={{
              flexDirection: 'row',
              gap: 5,

              alignItems: 'center',
            }}>
            {/* <FastImage
              source={ICON_NAMES.star}
              style={{height: 15, width: 15}}
              resizeMode="contain"
            />
            <Text fontSize={14} fontFamily={fonts.BOLD} color={colors.white}>
              5.0
            </Text> */}
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
            bottom: 3,
          }}>
          <FastImage
            source={ICON_NAMES.percent}
            style={{height: 15, width: 15}}
            resizeMode="contain"
          />
          <Text fontSize={14} fontFamily={fonts.BOLD}>
            30% Off I Valid Up to $50 order
          </Text>
        </View>
        <Text
          customStyle={{paddingHorizontal: 10}}
          fontSize={12}
          color="#A2A2A2"
          fontFamily={fonts.REGULAR}>
          3958 Elkview Drive, Huntland CA 001 US Street.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingTop: 12,
          }}>
          <View style={{flexDirection: 'row', gap: 6, alignItems: 'flex-end'}}>
            <Text fontSize={10} fontFamily={fonts.REGULAR}>
              Opening Time
            </Text>
            <Text fontSize={14} fontFamily={fonts.BOLD}>
              9:00 AM
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 6, alignItems: 'flex-end'}}>
            <Text fontSize={10} fontFamily={fonts.REGULAR}>
              Closing Time
            </Text>
            <Text fontSize={14} fontFamily={fonts.BOLD}>
              11:00 PM
            </Text>
          </View>
        </View>
        <View style={styles.horizontalLineDashed} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingTop: 12,
          }}>
          <View style={{flexDirection: 'row', gap: 6, alignItems: 'flex-end'}}>
            <Text fontSize={10} fontFamily={fonts.REGULAR}>
              Delivery Time
            </Text>
            <Text fontSize={16} fontFamily={fonts.BOLD}>
              30Mins
            </Text>
          </View>
          <View style={styles.verticalLine} />

          <View style={{flexDirection: 'row', gap: 6, alignItems: 'flex-end'}}>
            <Text fontSize={10} fontFamily={fonts.REGULAR}>
              Min Order
            </Text>
            <Text fontSize={16} fontFamily={fonts.BOLD}>
              $669.00
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#EEEEEE',
            paddingHorizontal: 10,
            marginVertical: 23,
            margin: 10,
            borderRadius: 12,
          }}>
          <View
            style={{
              padding: 8,
              flexDirection: 'row',
              gap: 4,
              alignItems: 'center',
              justifyContent: 'center',
              top: 5,
            }}>
            <FastImage
              source={ICON_NAMES.percent}
              style={{height: 15, width: 15}}
              resizeMode="contain"
            />
            <Text fontSize={14} fontFamily={fonts.BOLD}>
              30% Off I
            </Text>
            <Text fontSize={14} color="#646464">
              Valid Up to $50 order
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <FastImage
              source={ICON_NAMES.sliderdots}
              style={{height: 15, width: 20}}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* {favoriteItems.map((item, index) => {
          return (
            <View key={index}>
              <View style={{paddingHorizontal: 10}}>
                <FavoriteProductCard
                  headings={true}
                  addButton={true}
                  counter={false}
                  item={item} addNew={false} favProducts={[]} page={''} setFavProducts={function (value: SetStateAction<[]>): void {
                    throw new Error('Function not implemented.');
                  } } setAddNew={function (value: SetStateAction<boolean>): void {
                    throw new Error('Function not implemented.');
                  } }                />
              </View>
              <View style={styles.horizontalLine} />
            </View>
          );
        })} */}
        <View style={{paddingVertical: 50}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  horizontalLineDashed: {
    borderStyle: 'dashed',
    borderBottomWidth: 1.3,
    width: '100%',
    borderBottomColor: colors.grey,
    paddingVertical: 10,
  },
  horizontalLine: {
    borderBottomWidth: 1.3,
    borderStyle: 'dashed',
    borderBottomColor: colors.grey,
    paddingVertical: 5,
    paddingTop: 20,
    paddingBottom: 20,
    bottom: 17,
  },
  verticalLine: {
    borderLeftWidth: 1,
    width: 1,
    left: 1,
    borderLeftColor: colors.lightGrey,
  },
});

export default VisitedStoresView;
