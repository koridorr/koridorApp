import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../../components';
import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import {colors, fonts, screenWidth} from '../../../../helpers/styles';
import {goBack} from '../../../../navigation';
import {Input} from '../../../../widgets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ChatSectionView = () => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={{flexDirection: 'row', top: 12}}>
          <Touchable onPress={() => goBack()}>
            <FastImage
              source={IMAGE_NAMES.arrow_left}
              style={{height: 30, width: 30}}
              resizeMode="contain"
            />
          </Touchable>

          <View style={{paddingHorizontal: 10}}>
            <FastImage
              source={IMAGE_NAMES.iDummy}
              style={{height: 40, width: 40, borderRadius: 50, bottom: 4}}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text
              customStyle={{bottom: 5}}
              fontSize={12}
              fontFamily={fonts.REGULAR}>
              Jack Willumson
            </Text>
            <Text customStyle={{bottom: 5}} fontSize={12} color="#908FA1">
              ST3751 - Toyota Vios
            </Text>
          </View>
        </View>
        <View style={[styles.orTextContainer, {top: 30}]}>
          <View style={styles.horizontalLine} />
          <View style={{width: '20%', display: 'flex', alignItems: 'center'}}>
            <Text fontSize={10} customStyle={{color: colors.grey}}>
              TODAY
            </Text>
          </View>
          <View style={styles.horizontalLine} />
        </View>

        <View style={{alignItems: 'flex-end', paddingTop: 50}}>
          <View
            style={{
              backgroundColor: colors.green,
              padding: 10,
              borderRadius: 25,
              paddingHorizontal: 30,
            }}>
            <Text fontSize={14} fontFamily={fonts.REGULAR}>
              Hello, are you nearby?
            </Text>
            <Text fontFamily={fonts.REGULAR} customStyle={styles.time}>
              05:19 PM
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-start', paddingTop: 25}}>
          <View style={styles.chatText}>
            <Text fontSize={14} fontFamily={fonts.REGULAR}>
              I'll be there in a few mins
            </Text>
            <Text color={colors.grey} fontSize={10} fontFamily={fonts.REGULAR}>
              05:19 PM
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end', paddingVertical: 20}}>
          <View
            style={{
              backgroundColor: colors.green,
              padding: 10,

              borderRadius: 25,
              paddingHorizontal: 30,
              width: screenWidth / 2,
            }}>
            <Text fontSize={14} fontFamily={fonts.REGULAR}>
              OK, I'm in front of
            </Text>
            <Text fontSize={14} fontFamily={fonts.REGULAR}>
              the bus stop
            </Text>
            <Text fontFamily={fonts.REGULAR} customStyle={styles.time}>
              05:19 PM
            </Text>
          </View>
        </View>

        <View style={[styles.orTextContainer, {top: 0}]}>
          <View style={styles.horizontalLine} />
          <View style={{width: '20%', display: 'flex', alignItems: 'center'}}>
            <Text fontSize={10} customStyle={{color: colors.grey}}>
              5:33 PM
            </Text>
          </View>
          <View style={styles.horizontalLine} />
        </View>

        <View style={{alignItems: 'flex-start', paddingTop: 25}}>
          <View style={styles.chatText}>
            <Text fontSize={14} fontFamily={fonts.REGULAR}>
              Sorry , I'm stuck in traffic.
            </Text>
            <Text fontSize={14} fontFamily={fonts.REGULAR}>
              Please give me a moment.
            </Text>
            <Text color={colors.grey} fontSize={10} fontFamily={fonts.REGULAR}>
              05:19 PM
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          paddingBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Input
          placeholder="Type a message .."
          customContainerStyle={{
            borderWidth: 1,
            borderRadius: 50,
            width: screenWidth / 1.2,
            height: 50,
          }}
        />

        <FastImage
          source={ICON_NAMES.sendIcon}
          style={{height: 35, width: 35, left: 5, bottom: 5}}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  horizontalLine: {
    borderBottomWidth: 0.3,
    width: '40%',
    borderBottomColor: colors.lightGrey,
  },
  orTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 10,
    left: 16,
  },
  chatText: {
    backgroundColor: colors.lightestGrey,
    padding: 10,
    paddingHorizontal: 30,
    borderBottomEndRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: screenWidth / 1.6,
  },
});

export default ChatSectionView;
