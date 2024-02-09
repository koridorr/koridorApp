import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {MyAddressCard, Text, Touchable} from '../../../../components';

import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import FastImage from 'react-native-fast-image';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {Button} from '../../../../widgets';
import {navigate} from '../../../../navigation';
import {Dispatch, SetStateAction, useState} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
type filterOptions = {
  value: string;
  name: string;
  icon: any;
};

type ViewType = {
  selectedFilter: string;
  selectedItem: string;
  maxValue: number;
  minValue: number;
  sliderValues: any[];
  setSelectedFilter: Dispatch<SetStateAction<string>>;
  setSliderValues: Dispatch<SetStateAction<number[]>>;
  setSelectedItem: Dispatch<SetStateAction<string>>;
  clearFilter: () => void;
  applyFilter: () => void;
  filterOptions: {
    value: SetStateAction<string>;
    name: string;
  }[];
  ratings: filterOptions[];
  handleSliderValuesChange: (values: any) => void;

  // encryptedBody: { hash: string | undefined; sek: string | undefined };
};

export const FilterScreenView = ({
  filterOptions,
  ratings,
  setSelectedFilter,
  setSliderValues,
  selectedFilter,
  handleSliderValuesChange,
  sliderValues,
  maxValue,
  setSelectedItem,
  minValue,
  selectedItem,
  applyFilter,
  clearFilter,
}: ViewType) => {
  const renderMarker = (value: any, index: any) => {
    return (
      <View key={index} style={{alignItems: 'center'}}>
        <Text>{value}</Text>
      </View>
    );
  };
  
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={true}
          contentContainerStyle={{
            paddingBottom: screenHeight / 10,
            flexGrow: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingTop: 15,
            }}>
        
            <Touchable
              onPress={() => {
                navigate('AllCategories', {body: undefined});
              }}>
               <FastImage
                  source={ICON_NAMES.close}
                  style={{
                    height: screenHeight / 22,
                    width: 18,
                  }}
                  resizeMode="contain"
                />
            </Touchable>
          </View>
          <Text
            fontSize={16}
            fontFamily={fonts.BOLD}
            customStyle={{paddingVertical: 10}}>
            Sort by
          </Text>
          <View>
            {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Text fontFamily={fonts.BOLD}>New</Text>
            <FastImage
              source={ICON_NAMES.radioIcon}
              style={{height: 15, width: 15}}
              resizeMode="cover"
            />
          </View> */}
            <View style={{}}>
              {filterOptions?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedFilter(item?.value)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}
                  key={index}>
                  <Text
                    fontFamily={
                      selectedFilter === item?.value
                        ? fonts.BOLD
                        : fonts.REGULAR
                    }>
                    {item.name}
                  </Text>
                  <FastImage
                    source={
                      selectedFilter === item?.value
                        ? ICON_NAMES.radioIcon
                        : ICON_NAMES.blankRadio
                    }
                    style={{height: 15, width: 15}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.divider} />
          <Text
            fontSize={18}
            fontFamily={fonts.BOLD}
            customStyle={{paddingVertical: 10}}>
            Filters
          </Text>
          <Text
            fontSize={16}
            fontFamily={fonts.REGULAR}
            customStyle={{paddingVertical: 10}}>
            Price Range
          </Text>
          <View style={{paddingHorizontal: 16}}>
            <MultiSlider
              values={sliderValues}
              onValuesChange={values => {
                if (values[0] < values[1]) {
                  setSliderValues(values);
                }
              }}
              min={sliderValues[0]}
              max={10000}
              enabledOne={true}
              enabledTwo={true}
              step={1}
              allowOverlap={false}
              sliderLength={screenWidth / 1.18}
              snapped
              selectedStyle={{
                backgroundColor: '#EAEAEB',
              }}
              unselectedStyle={{
                backgroundColor: 'lightgray',
              }}
              markerStyle={{
                backgroundColor: colors.black,
              }}
              containerStyle={{
                height: 40,
              }}
              trackStyle={{
                height: 4,
              }}
              touchDimensions={{
                height: 50,
                width: 50,
                borderRadius: 20,
                slipDisplacement: 20,
              }}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {renderMarker(sliderValues[0], 0)}
              {renderMarker(sliderValues[1], 1)}
            </View>
          </View>
          <Text>Ratings</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingVertical: 10,
              flex: 5,
            }}>
            {ratings?.map((item, index) => (
              <Touchable
                key={index}
                onPress={() => setSelectedItem(item?.value)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  margin: 5,
                  backgroundColor:
                    selectedItem === item.value ? 'black' : '#EAEAEB',
                  width: 60,
                  borderRadius: 10,
                  height: 40,
                }}>
                <Text
                  color={selectedItem === item.value ? colors?.green : 'black'}
                  fontSize={14}>
                  {item.name}
                </Text>
                <FastImage
                  source={item.icon}
                  style={{height: 12, width: 12}}
                  resizeMode="cover"
                  tintColor={
                    selectedItem === item.value ? colors?.green : 'black'
                  }
                />
              </Touchable>
            ))}
          </View>
          <View style={{top: 20}}>
            <Button onPress={() => applyFilter()} value="Apply Filters" />
          </View>
          <Touchable
            onPress={() => clearFilter()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
              top: 30,
            }}>
            <Text fontSize={14}>Clear filters</Text>
          </Touchable>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-around',
  },
  divider: {
    borderBottomWidth: 4,
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomColor: '#F6F6F6',
    width: 900,
  },
});
