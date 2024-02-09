import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {ICON_NAMES, IMAGE_NAMES} from '../helpers/constants';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';
import Text from './Text';
import FastImage from 'react-native-fast-image';
import Touchable from './Touchable';
import moment from 'moment';
import {generateEncryptedKey} from '../widgets/CryptoPrivacy';
import {useAddFavoriteProductMutation} from '../services/home';
import {navigate} from '../navigation';

type venderDataType = {
  image: any;
  name: string;
};
type propsType = {
  data: any;
  page: string;
  favVendors: venderDataType[];
  setFavVendors: any;
};

const VisitedStore = ({data, page, favVendors, setFavVendors}: propsType) => {
  const [like, setLike] = useState(false);
  const [addFavoriteItem] = useAddFavoriteProductMutation();

  const addFavoriteProduct = async (venData: any) => {
    try {
      let data = {
        vendorId: venData?._id,
        appkey: moment.utc().valueOf().toString(),
      };
      const encryptedKey = generateEncryptedKey(data) || {sek: '', hash: ''};
      const body = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      const payload = await addFavoriteItem({
        body,
        type: 'product',
      }).unwrap();
      if (payload.statusCode === 200) {
        if (favVendors.includes(venData)) {
          var arr1 = [];
          arr1 = favVendors.filter(i => i !== venData);
          setFavVendors([...arr1]);
        } else {
          favVendors?.push(venData);
          setFavVendors([...favVendors]);
        }
      }
    } catch (error) {}
  };

  return (
    <Touchable
      onPress={() =>
        navigate('OrderStack', {
          screen: 'MyCart',
          params: {
            data: data,
          },
        })
      }>
      <ImageBackground
        source={{uri: data?.businessImages[0]}}
        resizeMode="cover"
        style={{
          height: screenHeight / 4.4,
          width: screenWidth / 1.16,
          borderRadius: 11,
          overflow: 'hidden',
          backgroundColor: '#F9F9F9',
        }}>
        <View style={{alignSelf: 'flex-end', right: 8, paddingTop: 11}}>
          <Touchable
            onPress={() => addFavoriteProduct(data)}
            style={{
              backgroundColor: colors.white,
              padding: 2,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FastImage
              source={
                favVendors?.includes(data)
                  ? ICON_NAMES.heart2
                  : ICON_NAMES.heart
              }
              style={{
                height: 22,
                width: 22,
                top: 1,
              }}
              resizeMode="contain"
            />
          </Touchable>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            rowGap: 8,
            alignSelf: 'center',
            paddingBottom: 8,
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              width: screenWidth / 1.24,
              height: screenHeight / 10,
              borderRadius: 11,
            }}>
            <View
              style={{
                justifyContent: 'center',
                flex: 1,
                paddingHorizontal: 11,
              }}>
              <Text fontSize={14} fontFamily={fonts.BOLD}>
                {data?.storeName || ''}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <FastImage
                  source={ICON_NAMES.locationIcn}
                  style={{height: 14, width: 14, top: 2}}
                  resizeMode="contain"
                />
                <Text
                  fontFamily={fonts.REGULAR}
                  customStyle={{paddingLeft: 2}}
                  color={colors.lightGrey}
                  fontSize={12}>
                  {data?.completeAddress}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <FastImage
                    source={ICON_NAMES.star}
                    style={{height: 14, width: 14, top: 2}}
                    resizeMode="contain"
                  />

                  <Text customStyle={{paddingLeft: 2}} fontSize={10}>
                    {data?.rating > 0 ? data?.rating?.toFixed(1) : data?.rating}
                  </Text>
                </View>
                {/* <View style={{ flexDirection: "row" }}>
                <FastImage
                tintColor={colors.black}
                      source={ICON_NAMES.clock}
                      style={{ height: 14, width: 14 ,top:2}}
                      resizeMode="contain"
                    />
                
                  <Text customStyle={{paddingLeft:2}} fontSize={10}>60 min</Text>
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Touchable>
  );
};

export default VisitedStore;

const styles = StyleSheet.create({});
