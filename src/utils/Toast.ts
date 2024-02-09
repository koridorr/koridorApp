import Toast from 'react-native-simple-toast';

const ShowToast = async (message: string) => {
	Toast.show(message, Toast.SHORT);
};

export default ShowToast;
