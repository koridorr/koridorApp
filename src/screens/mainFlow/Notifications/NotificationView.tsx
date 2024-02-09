import moment from 'moment';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../components';
import {ICON_NAMES} from '../../../helpers/constants';
import {
  colors,
  fonts,
  screenHeight,
  screenWidth,
} from '../../../helpers/styles';
import Loader from '../../../widgets/Loader';
type notificationType = {
  title: string;
  message: string;
  createdAt: string;
};
type NotificationViewType = {
  loading: boolean;
  notificationData: notificationType[];
  clearAll: () => void;
};
const NotificationView = ({
  notificationData,
  clearAll,
  loading,
}: NotificationViewType) => {
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={{paddingHorizontal: 18}}>
        <Text fontSize={18} fontFamily={fonts.BOLD}>
          Notification
        </Text>
      </View>
      {notificationData?.length > 0 ? (
        <View style={{flex: 1}}>
          <View>
            {notificationData?.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  backgroundColor: '#F7FFE9',
                  padding: 20,
                  justifyContent: 'space-between',
                }}>
                <Text fontSize={14} fontFamily={fonts.BOLD}>
                  {`${notificationData?.length} Notification`}
                </Text>
                <Touchable onPress={() => clearAll()}>
                  <Text fontSize={12}>Clear All</Text>
                </Touchable>
              </View>
            ) : null}
          </View>

          <View style={{paddingTop: 8, flex: 1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              // onRefresh={() => onRefresh()}
              // refreshing={refreshing}
              data={notificationData}
              renderItem={({item, index}) => (
                <View style={{paddingVertical: 8, flex: 1}}>
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 15,
                      backgroundColor: '#F7FFE9',
                      width: screenWidth,
                      paddingHorizontal: 15,
                      flex: 1,
                    }}>
                    <View>
                      <FastImage
                        source={ICON_NAMES.notification}
                        style={{height: 24, width: 24, top: 3}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{paddingLeft: 10}}>
                      <Text fontSize={13} fontFamily={fonts.BOLD}>
                        {item?.title}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: screenWidth / 1.4,
                        }}>
                        <Text color="#757885" fontSize={11}>
                          {item?.message}
                        </Text>
                        <Text
                          customStyle={{left: 10}}
                          color={colors.grey}
                          fontSize={10}>
                          {moment(item?.createdAt).format('D-MM-YY') +
                            ' at' +
                            moment(item?.createdAt).format(' h:mm A')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              // onEndReached={getMoreData}
            />
            <View style={{paddingVertical: 35}} />
          </View>
        </View>
      ) : (
        <View
          style={{alignSelf: 'center', justifyContent: 'center', flex: 0.9}}>
          <Text fontFamily={fonts.BOLD}>No notification found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,

    paddingTop: 20,
  },
});

export default NotificationView;
