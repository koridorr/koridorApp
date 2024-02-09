import {getKeyFromStorage} from '../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../helpers/constants';
import DeviceInfo from 'react-native-device-info';

export const UploadImage = async (imageObject: any, isDoc = false) => {
  const deviceId = await DeviceInfo.getUniqueId();

  const formData = new FormData();
  formData.append('file', {
    uri: imageObject?.path,
    type: isDoc ? 'application/pdf' : 'image/jpeg', // or the appropriate MIME type
    name: isDoc ? 'doc.pdf' : 'image.jpg', // or the appropriate file name
  } as any);

  const getToken = await getKeyFromStorage(STORAGE_KEYS.token);
  // const token = JSON.parse(getToken);
  let headers = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: 'Bearer ' + getToken,
    deviceId: deviceId,
  };
  try {
    const res = await fetch(
      'https://apikoridorr.koridorr.com/api/v1/upload/uploadFile',
      {
        method: 'POST',
        headers,
        body: formData,
      },
    );
    let response = await res.json();
    return response;
  } catch (error) {
    console.log(error, '>>>>>>>>>');
    return error;
  }
};
