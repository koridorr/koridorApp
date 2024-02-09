import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {LogoutModal, Text, Touchable} from '../../../../components';

import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../../helpers/styles';
import {ProfileListType} from '../../../../types/ProfileList.d.types';
import {User} from '../../../../types/User';
import FastImage from 'react-native-fast-image';
import ProfileListCard from '../../../../components/ProfileListCard';
import {navigate} from '../../../../navigation';
import Loader from '../../../../widgets/Loader';
import React from 'react';

type ProfileFlowViewType = {
  GeneralList: ProfileListType[];
  userData: User | undefined;
  logout: () => void;
  isModalVisible: boolean;
  toggleModal: () => void;
  askToDelete:()=>void
  loading: boolean;
  user: User | null;
};

export const ProfileFlowView = ({
  GeneralList,
  logout,
  userData,
  toggleModal,
  isModalVisible,
  loading,
  user,
  askToDelete
}: ProfileFlowViewType) => (
  <View style={styles.container}>
    <Loader loading={loading} />
    <View>
      <Text fontSize={17} fontFamily={fonts.BOLD}>
        Account
      </Text>
    </View>
    <View style={styles.backImage}>
      <FastImage
        source={
          userData?.image || user?.image
            ? {uri: userData?.image || user?.image}
            : IMAGE_NAMES.dummyProfile
        }
        style={{
          height: 85,
          width: 85,
          borderRadius: 50,
          marginRight: 18,
        }}
        resizeMode="cover"
      />

      <View
        style={{
          maxWidth: screenWidth / 1.5,
        }}>
        <Text
          customStyle={{bottom: 4}}
          fontSize={18}
          numberOfLines={1}
          color={colors.black}
          fontFamily={fonts.BOLD}>
          {`${user?.firstName || userData?.firstName || 'User'} `}
        </Text>
        <Text fontSize={12} color={colors.black} fontFamily={fonts.REGULAR}>
          {user?.email || userData?.email || 'User email'}
        </Text>
        <Touchable
          onPress={() => navigate('EditProfile', undefined)}
          style={{flexDirection: 'row', alignItems: 'center', top: 5}}>
          <Text fontSize={13} color={colors.black} fontFamily={fonts.REGULAR}>
            View Profile
          </Text>
          <FastImage
            source={ICON_NAMES.leftArrow}
            style={{
              height: 13,
              width: 13,
              left: 5,
            }}
            resizeMode="contain"
          />
        </Touchable>
      </View>
    </View>

    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={true}
      contentContainerStyle={{
        paddingBottom: screenHeight / 10,
      }}>
      <View>
        <View style={{paddingTop: 10}}>
          {GeneralList.map((item, index) => (
            <View key={index}>
              <ProfileListCard
                navigateTo={item.navigateTo}
                icon={item.icon}
                name={item.name}
                text={item.text}
                key={index}
                addressType={''}
                apartmentNo={''}
                address1={''}
              />
              <View style={styles.horizontalLine} />
            </View>
          ))}
        </View>
        <Touchable
          onPress={() => navigate('ContactUs', undefined)}
          style={{paddingHorizontal: 20, paddingTop: 12}}>
          <Text fontSize={14} color="#4F4F4F" fontFamily={fonts.REGULAR}>
            Contact Us
          </Text>
        </Touchable>

        <Touchable
          onPress={() => navigate('TermsAndConditions', undefined)}
          style={{paddingHorizontal: 20, paddingTop: 12}}>
          <Text fontSize={14} color="#4F4F4F" fontFamily={fonts.REGULAR}>
            Terms & Conditions
          </Text>
        </Touchable>
        <Touchable
          onPress={() => navigate('PrivacyPolicy', undefined)}
          style={{paddingHorizontal: 20, paddingTop: 12}}>
          <Text fontSize={14} color="#4F4F4F" fontFamily={fonts.REGULAR}>
            Privacy Policy
          </Text>
        </Touchable>
        <Touchable
          onPress={() => navigate('Faqs', undefined)}
          style={{paddingHorizontal: 20, paddingTop: 12}}>
          <Text fontSize={14} color="#4F4F4F" fontFamily={fonts.REGULAR}>
            FAQ's
          </Text>
        </Touchable>
        <Touchable
          onPress={() => askToDelete()}
          style={{paddingHorizontal: 20, paddingTop: 12}}>
          <Text fontSize={14} color="#4F4F4F" fontFamily={fonts.REGULAR}>
            Delete Account
          </Text>
        </Touchable>
        <LogoutModal
          toggleModal={toggleModal}
          isModalVisible={isModalVisible}
          logout={logout}
        />
          
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  backImage: {
    padding: 18,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FFE9',
    marginTop: 20,
  },
  profileImg: {
    marginRight: 20,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 100,
  },
  horizontalLine: {
    borderBottomWidth: 0.8,
    width: '100%',
    borderBottomColor: colors.lightestGrey,
  },
});
