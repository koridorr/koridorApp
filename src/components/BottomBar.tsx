import React from 'react';
import {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICON_NAMES} from '../helpers/constants';
import {colors, fonts, screenWidth} from '../helpers/styles';
import {STRINGS} from '../localization';
import {navigate, navigationRef} from '../navigation';
import Text from './Text';
import Touchable from './Touchable';

const BottomBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentRoute, setCurrentRoute] = useState('');

  const {BottomTab} = STRINGS;

  useEffect(() => {
    const result = navigationRef?.current?.getCurrentRoute();
    setCurrentRoute(result?.name || '');
  }, [navigationRef?.current?.getCurrentRoute()]);

  useEffect(() => {
    if (currentRoute === 'HomeScreen' && activeTab !== 0) {
      setActiveTab(0);
    } else if (currentRoute === 'MyOrderTabs' && activeTab !== 1) {
      setActiveTab(1);
    } else if (currentRoute === 'Notification' && activeTab !== 2) {
      setActiveTab(2);
    } else if (currentRoute === 'ProfileScreen' && activeTab !== 3) {
      setActiveTab(3);
    }
  }, [currentRoute]);

  const onTabChange = (key: number) => {
    switch (key) {
      case 0:
        navigate('HomeStack', {screen: 'HomeScreen'});
        break;
      case 1:
        navigate('OrderStack', {screen: 'MyOrderTabs'});
        break;

      case 2:
        navigate('Notification', undefined);
        break;

      case 3:
        navigate('ProfileStack', undefined);
        break;

      default:
        break;
    }
  };

  const tabDetails = [
    {
      screenName: BottomTab.home,
      icon: ICON_NAMES.home,
    },
    {
      screenName: BottomTab.orders,
      icon: ICON_NAMES.myOrders,
    },
    {
      screenName: BottomTab.notifications,
      icon: ICON_NAMES.notification,
    },
    {
      screenName: BottomTab.profile,
      icon: ICON_NAMES.profile,
    },
  ];

  if (
    currentRoute === 'HomeScreen' ||
    currentRoute === 'MyOrderTabs' ||
    currentRoute === 'Notification' ||
    currentRoute === 'ProfileScreen'
  ) {
    return (
      <View style={styles.bottomTabWrapper}>
        {tabDetails.map((tab, index) => (
          <Touchable
            style={styles.tabsContainer}
            activeOpacity={activeTab === index ? 1 : 0.6}
            onPress={() => {
              setActiveTab(index);
              onTabChange(index);
            }}
            key={index}>
            <View>
              <FastImage
                tintColor={
                  activeTab === index ? colors.black : colors.lightGrey
                }
                source={tab.icon}
                style={styles.copyIcon}
              />
            </View>
            <View style={{bottom: 4}}>
              <Text
                color={activeTab === index ? colors.black : colors.lightGrey}
                fontSize={10}
                fontFamily={fonts.BOLD}>
                {tab.screenName}
              </Text>
            </View>
          </Touchable>
        ))}
      </View>
    );
  }
  return null;
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomTabWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-around',
    width: '100%',
    bottom: 0,
    paddingVertical: 4,
    backgroundColor: colors.green,
    paddingHorizontal: 15,
    elevation: 20,
    shadowColor: '#000',
    height: Platform.OS === 'ios' ? 80 : undefined,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  tabsContainer: {
    alignItems: 'center',
  },
  copyIcon: {height: 23, width: 23, margin: 5},
});
