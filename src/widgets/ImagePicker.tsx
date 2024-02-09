import ImagePicker from 'react-native-image-crop-picker';
import {Alert, Linking, Platform} from 'react-native';
const SingleImagePicker = async () => {
  try {
    const image = await ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 0.2,
    });
    return image;
  } catch (error) {
    if (error?.message === 'User did not grant camera permission.') {
      Alert.alert('App Camera Permission', 'App needs access to your camera', [
        {
          text: 'OK',
          onPress: () => {
            Platform.OS === 'android'
              ? Linking.openSettings()
              : Linking.openURL('app-settings:');
          },
        },
      ]);
    }
  }
};

const MultiImagePicker = async () => {
  try {
    const image = await ImagePicker.openPicker({
      multiple: true,
    });
    return image;
  } catch (error) {
    console.log(error);
  }
};

const VideoPicker = async () => {
  try {
    const video = ImagePicker.openPicker({
      mediaType: 'video',
    });
    return video;
  } catch (error) {
    console.log(error);
  }
};

const OpenCameraForImage = async () => {
  try {
    const image = await ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.2,
    });
    return image;
  } catch (error) {
    if (error?.message === 'User did not grant camera permission.') {
      Alert.alert('App Camera Permission', 'App needs access to your camera', [
        {
          text: 'OK',
          onPress: () => {
            Platform.OS === 'android'
              ? Linking.openSettings()
              : Linking.openURL('app-settings:');
          },
        },
      ]);
    }
  }
};

const OpenCameraForVideo = async () => {
  try {
    const video = await ImagePicker.openCamera({
      mediaType: 'video',
    });
    return video;
  } catch (error) {
    console.log(error);
  }
};

export default {
  SingleImagePicker,
  MultiImagePicker,
  VideoPicker,
  OpenCameraForImage,
  OpenCameraForVideo,
};
