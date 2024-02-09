import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../../components';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';

import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {goBack, navigate} from '../../../../navigation';

type ViewPropTypes = {
  deliverHandler: () => void;
  deliver: boolean;
};

const GetDirectionView = ({deliverHandler, deliver}: ViewPropTypes) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={IMAGE_NAMES.trackMap}>
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 100,
            }}>
            <Touchable onPress={() => goBack()}>
              <FastImage
                source={IMAGE_NAMES.arrow_left}
                style={{height: 35, width: 35}}
                resizeMode="contain"
              />
            </Touchable>
          
          </View>

          <FastImage
            source={IMAGE_NAMES.person}
            style={{
              height: 150,
              width: 150,
              top: 95,
              zIndex: 1,
            }}
            resizeMode="cover"
          />
        </ImageBackground>
        <View style={{padding: 18 }}>

          
          <View style={{backgroundColor: colors.green, borderRadius: 20}}>
            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}>
              <Touchable
                onPress={() => navigate('OrderDetails', {deliver: deliver})}
                style={{
                  justifyContent: 'center',
                  width: screenWidth / 5,
                  alignItems: 'center',
                  height: screenHeight / 35,
                  borderRadius: 50,
                  borderColor: colors.black,
                  borderWidth: 1,
                  backgroundColor: colors.white,
                }}>
                <Text
                  fontSize={8}
                  customStyle={{
                    color: colors.black,
                  }}>
                  VIEW DETAILS
                </Text>
              </Touchable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
                paddingBottom: 20,
              }}>
              <View>
                <Text fontSize={18} fontFamily={fonts.BOLD}>
                  Zohara Almad
                </Text>
                <Text>Grocery</Text>
              </View>

              <View style={{flexDirection: 'row', gap: 20}}>
                <Touchable onPress={() => navigate('ChatSection', undefined)}>
                  <FastImage
                    source={ICON_NAMES.whiteChat}
                    style={{height: 36, width: 36}}
                    resizeMode="contain"
                  />
                </Touchable>
                <FastImage
                  source={ICON_NAMES.whiteCall}
                  style={{height: 36, width: 36}}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.horizontalLine} />

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
                paddingVertical: 20,
              }}>
              <View style={{flexDirection: 'row'}}>
                <FastImage
                  source={ICON_NAMES.timing}
                  style={{height: 40, width: 40, top: 5}}
                  resizeMode="contain"
                />
                <View style={{paddingLeft: 0}}>
                  <Text fontSize={9}>Delivery Time</Text>
                  <Text fontSize={15}>18 mins</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <FastImage
                  source={ICON_NAMES.whiteLocation}
                  style={{height: 40, width: 40, top: 5}}
                  resizeMode="cover"
                />
                <View style={{paddingLeft: 0}}>
                  <Text fontSize={9}>Delivery Place</Text>
                  <Text fontSize={12}>Tiensestraat 94 bus 0201</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{padding: 18 }}>
            <Text fontSize={18} fontFamily={fonts.BOLD}>
              Order #654967879
            </Text>
            <View style={{flexDirection: 'row', paddingTop: 20}}>
            {/* <View style={{backgroundColor:'pink' , flexDirection:"row"}}> */}
          <View style={{position:'relative' , justifyContent:'center' , alignItems:"center"}} >
          <FastImage
                source={ICON_NAMES.blankCircle}
                style={{height: 38, width: 38}}
                resizeMode="contain"
                tintColor={colors.green}
              />
             <View style={{position:'absolute'}}>
             <FastImage
                source={ICON_NAMES.order}
                style={{height: 20, width: 20}}
                resizeMode="contain"
                />
             </View>
                </View>
              <View style={{paddingLeft: 10}}>
                <Text fontSize={11}>18:15</Text>
                <Text fontSize={13} fontFamily={fonts.BOLD}>
                  1. Order received
                </Text>
              </View>
            </View>
        <View style={{flexDirection: 'row', paddingTop: 10}}>

            <View style={{position:'relative' , justifyContent:'center' , alignItems:"center"}} >
          <FastImage
                source={ICON_NAMES.blankCircle}
                style={{height: 38, width: 38}}
                resizeMode="contain"
                tintColor={ deliver ? colors.green :'#E0E0E0'}
              />
             <View style={{position:'absolute'}}>
             <FastImage
                source={ICON_NAMES.scooter}
                style={{height: 20, width: 20}}
                resizeMode="contain"
                tintColor={ deliver ? colors.black :''}

                />
       
             </View>
                </View>
              <View style={{paddingLeft: 10}}>
                <Text fontSize={11}>18:15</Text>
                <Text fontSize={13} fontFamily={fonts.BOLD}>
                  2. Your order is on its way
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{position:'relative' , justifyContent:'center' , alignItems:"center"}} >
          <FastImage
                source={ICON_NAMES.blankCircle}
                style={{height: 38, width: 38}}
                resizeMode="contain"
                tintColor={ deliver ? colors.green :'#E0E0E0'}
              />
             <View style={{position:'absolute'}}>
             <FastImage
                source={ICON_NAMES.smallBag}
                style={{height: 20, width: 20}}
                resizeMode="contain"
                tintColor={ deliver ? colors.black :''}

                />
             </View>
                </View>
              <View style={{paddingLeft: 10}}>
                <Text fontSize={11}>18:15</Text>
                <Text fontSize={13} fontFamily={fonts.BOLD}>
                  3. The deliveryman has arrived at
                </Text>
                <Text fontSize={13} fontFamily={fonts.BOLD}>
                  your location.
                </Text>
              </View>
            </View>
            <Touchable
              onPress={() => deliverHandler()}
              style={{flexDirection: 'row', paddingTop: 10}}>
                <View style={{position:'relative' , justifyContent:'center' , alignItems:"center" , }} >
        {/* <Text>kjhkjhk</Text> */}


          <FastImage
                source={ICON_NAMES.blankCircle}
                style={{height: 38, width: 38}}
                resizeMode="contain"
                tintColor={ deliver ? colors.green :'#E0E0E0'}
              />
             <View style={{position:'absolute'}}>
             <FastImage
                source={ICON_NAMES.dChecked}
                style={{height: 20, width: 20}}
                resizeMode="contain"
                tintColor={ deliver ? colors.black :''}

                />
             </View>
                </View>
              <View style={{paddingLeft: 10}}>
                <Text fontSize={11}>18:15</Text>
                <Text fontSize={13} fontFamily={fonts.BOLD}>
                  4. Delivered
                </Text>
              </View>
            </Touchable>
        </View>
          </View>
        {/* </View> */}
        
       

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  horizontalLine: {
    borderBottomWidth: 2,
    width: '100%',
    borderBottomColor: colors.white,
  },
  verticalLine: {
    borderLeftWidth: 2,
    width: 13,
    right: 13,
    borderLeftColor: colors.black,
    height:18,
    alignItems:"center",
    justifyContent:"center"
    
  },
});

export default GetDirectionView;
