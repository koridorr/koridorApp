import React from 'react';
import {useState} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {IMAGE_NAMES} from '../helpers/constants';
import {screenHeight, screenWidth} from '../helpers/styles';
import Touchable from './Touchable';

function ProfileViewModal(props: any) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const deviceHeight = Dimensions.get('screen').height;

  return (
    <View style={{}}>
      <Touchable
        onPress={props.profileImage ? toggleModal : props.openPickerModal}
        style={{alignItems: 'center'}}>
        <FastImage
          resizeMode={props?.profileImage ? 'cover' : 'contain'}
          source={
            props?.profileImage
              ? {uri: props.profileImage}
              : IMAGE_NAMES.dummyProfile
          }
          style={{
            height:
              Platform.OS === 'android' ? screenHeight / 7 : screenHeight / 8,
            width:
              Platform.OS === 'android' ? screenHeight / 7 : screenHeight / 8,
            borderRadius: 100,
          }}
        />
      </Touchable>

      <Modal
        deviceHeight={deviceHeight}
        statusBarTranslucent
        isVisible={showModal}
        backdropOpacity={0.8}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}>
        <View>
          <View style={styles.modalContainer}>
            <View>
              <FastImage
                resizeMode="cover"
                source={
                  props?.profileImage
                    ? {uri: props.profileImage}
                    : IMAGE_NAMES.dummyProfile
                }
                style={{height: screenHeight / 1.8, width: screenWidth}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ProfileViewModal;

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 10,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
