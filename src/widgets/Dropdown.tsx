import React from 'react';
import {Platform} from 'react-native';
import {Dispatch, SetStateAction, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import FastImage from 'react-native-fast-image';
import {ICON_NAMES} from '../helpers/constants';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';

/**
 *
 * @param items
 * @param value
 * @param setValue
 * @param setItems
 * @param placeholder
 * @returns {JSX.Element}
 * @constructor
 */

const Dropdown = ({
  items,
  setValue,
  value,
  setItems,
  placeholder,
}: DropdownPropsType) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      //    searchable = {true}
      // searchPlaceholder="Search"

      placeholder={placeholder}
      placeholderStyle={{color: 'black'}}
      style={{
        backgroundColor: 'white',
        width: screenWidth / 1.05,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'red',
        height:
          Platform?.OS === 'android' ? screenHeight / 15 : screenHeight / 22,
        // left:15
      }}
      textStyle={{
        fontFamily: fonts.REGULAR,
        // left:screenWidth/15
      }}
      dropDownContainerStyle={{
        backgroundColor: '#f3f3f3',
        opacity: 1,
        borderColor: '#f3f3f3',
        position: 'relative',
        top: 2,
        // height:screenHeight,
        width: screenWidth / 1.25,
      }}
      ArrowUpIconComponent={() => (
        <FastImage
          source={ICON_NAMES.arrow}
          style={{
            height: 15,
            width: 15,
            alignSelf: 'flex-end',
            transform: [{rotate: '180deg'}],
          }}
          resizeMode="contain"
        />
      )}
      ArrowDownIconComponent={() => (
        <FastImage
          source={ICON_NAMES.arrow}
          style={{
            height: 15,
            width: 15,
            alignSelf: 'flex-end',
            flex: 1,
          }}
          resizeMode="contain"
        />
      )}
    />
  );
};

export default Dropdown;
