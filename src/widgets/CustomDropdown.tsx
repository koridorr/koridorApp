import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ICON_NAMES} from '../helpers/constants';
import {colors, fonts, screenHeight, screenWidth} from '../helpers/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';

type CustomDropdownType = {
  items: any;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
  setVendors: Dispatch<SetStateAction<any>>;
  bottom: boolean;
  value: any;
  showLeftImage: boolean;
  highlighted: boolean;
};

const CustomDropdown = ({
  highlighted,
  items,
  value,
  placeholder,
  setValue,
  bottom,
  setVendors,
  showLeftImage,
}: CustomDropdownType) => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef();
  const newData = items?.filter((item: any) => {
    return item?.storeName.toLowerCase().includes(search.toLowerCase());
  });
  const deviceHeight = Dimensions.get('screen').height;
  const [show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(false);
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          width: '100%',
          height:
            Platform.OS == 'android' ? screenHeight / 12 : screenHeight / 14.5,
          borderRadius: 10,
          borderWidth: bottom ? 0 : 1,
          borderBottomWidth: 1,
          borderColor: highlighted
            ? colors.red
            : clicked
            ? colors.green
            : '#F3F3F3',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={() => {
          setClicked(!clicked), setShow(true);
        }}>
        {showLeftImage ? (
          <Image
            source={ICON_NAMES.shop}
            resizeMode="contain"
            style={{
              height:
                Platform.OS == 'ios' ? screenHeight / 17 : screenHeight / 16,
              width: Platform.OS == 'ios' ? screenWidth / 8 : screenWidth / 8,
              right: 7,
              alignSelf: 'center',
            }}
          />
        ) : null}

        <View
          style={{
            justifyContent: 'flex-start',
            flex: 1,
            marginHorizontal: 11,
          }}>
          <Text
            style={{
              fontFamily: fonts.REGULAR,
              color: value == '' || value === undefined ? '#A2A2A2' : 'black',
            }}>
            {value == '' || value === undefined
              ? placeholder
              : value?.storeName}
          </Text>
        </View>
        {!clicked ? (
          <Image source={ICON_NAMES.arrow} style={{width: 16, height: 8}} />
        ) : (
          <Image source={ICON_NAMES.dropUp} style={{width: 16, height: 8}} />
        )}
      </TouchableOpacity>
      <View style={{}}>
        <Modal
          isVisible={show}
          style={{}}
          // deviceHeight={deviceHeight / 55}
          statusBarTranslucent
          backdropOpacity={0.2}
          onBackButtonPress={toggleModal}
          onBackdropPress={toggleModal}>
          <View style={{paddingVertical: 5, flex: 0.5}}>
            <View
              style={{
                elevation: 5,
                marginTop: 10,
                alignSelf: 'center',
                width: '90%',
                backgroundColor: '#fff',
                borderRadius: 10,
                borderWidth: 1,
                flex: 1,
                borderColor: '#F3F3F3',
              }}>
              <TextInput
                placeholder="Search.."
                placeholderTextColor={'grey'}
                value={search}
                ref={searchRef}
                onChangeText={txt => {
                  setSearch(txt);
                }}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                style={{
                  width: '80%',
                  height: 40,
                  alignSelf: 'center',
                  borderWidth: 3,
                  borderColor: '#F3F3F3',
                  borderRadius: 8,
                  marginTop: 10,
                  paddingLeft: 20,
                  color: 'black',
                }}
              />
              {items?.length > 0 &&
              items?.filter((item: any) => {
                return item?.storeName
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })?.length > 0 ? (
                <FlatList
                  data={newData}
                  style={{height: 200}}
                  renderItem={({item, index}) => {
                    return (
                      <View style={{flex: 1}}>
                        {item?.storeName ? (
                          <TouchableOpacity
                            style={{
                              paddingVertical: 11,
                              width: '85%',
                              alignSelf: 'center',
                              justifyContent: 'center',
                              borderBottomWidth: 1,
                              borderColor: 'lightgrey',
                            }}
                            onPress={() => {
                              setValue(item);
                              setClicked(!clicked);
                              setSearch('');
                              setShow(false);
                            }}>
                            <Text
                              style={{
                                fontFamily: fonts.REGULAR,
                                textAlign: 'center',
                                color: 'grey',
                              }}>
                              {item?.storeName}
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    );
                  }}
                />
              ) : (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: fonts.REGULAR,
                      fontSize: 13,
                      color: 'black',
                    }}>
                    No Store Found
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default CustomDropdown;
