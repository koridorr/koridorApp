import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {ICON_NAMES, IMAGE_NAMES} from '../helpers/constants';
import {colors, fonts} from '../helpers/styles';
import ProfileViewModal from './ProfileViewModal';

import Text from './Text';
import Touchable from './Touchable';

function ImagePickerModal(props: any) {
  const deviceHeight = Dimensions.get('screen').height;

  return (
    <View style={{top: 30}}>
      <View style={{alignItems: 'center'}}>
        <ProfileViewModal
          profileImage={props.profileImage}
          openPickerModal={props.toggleModal}
        />
      </View>
      <Touchable onPress={props.toggleModal} style={styles.cameraButton}>
        <View style={{position: 'relative'}}>
          <FastImage
            resizeMode="contain"
            source={IMAGE_NAMES.camera}
            style={{height: 27, width: 27}}
          />
        </View>
      </Touchable>

      <Modal
        deviceHeight={deviceHeight}
        statusBarTranslucent
        isVisible={props.isModalVisible}
        backdropOpacity={0.3}
        onBackButtonPress={props.toggleModal}
        onBackdropPress={props.toggleModal}>
        <View>
          <View style={styles.modalContainer}>
            <View>
              <View style={styles.uploadButton}>
                <Text fontFamily={fonts.SEMI_BOLD}>Upload From</Text>
              </View>
              <Touchable onPress={props.handleCameraImage}>
                <View style={styles.uploadButton}>
                  <FastImage
                    source={IMAGE_NAMES.camera}
                    style={{height: 30, width: 30}}
                  />
                  <Text customStyle={{paddingLeft: 12}}>Open Camera</Text>
                </View>
              </Touchable>
              <View style={styles.divider} />
              <Touchable onPress={props.handleGalleryImage}>
                <View style={styles.uploadButton}>
                  <FastImage
                    source={IMAGE_NAMES.gallery}
                    style={{height: 30, width: 30}}
                    resizeMode="contain"
                  />
                  <Text customStyle={{paddingLeft: 12}}>
                    Import From Gallery
                  </Text>
                </View>
                <View style={styles.divider} />
              </Touchable>
              <Touchable onPress={props.toggleModal}>
                <View style={styles.CancelButton}>
                  <Text customStyle={{paddingLeft: 12}}>Cancel</Text>
                </View>
              </Touchable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ImagePickerModal;

const styles = StyleSheet.create({
  cameraButton: {
    paddingVertical: 10,
    bottom: 33,
    alignItems: 'center',
    // backgroundColor: 'pink',
    height: 64,
    paddingBottom: 12,
    borderRadius: 100,
    justifyContent: 'center',
    // paddingHorizontal: 12,
  },
  uploadButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  divider: {
    borderBottomWidth: 0.3,
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomColor: colors.lightGrey,
  },
  modalContainer: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 18,
  },
  CancelButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'center',
  },
});
