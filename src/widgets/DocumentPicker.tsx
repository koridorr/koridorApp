import DocumentPicker, { types } from 'react-native-document-picker';

const pickDocument = async () => {
	try {
		const pickerResult = await DocumentPicker.pickSingle({
			presentationStyle: 'fullScreen',
			copyTo: 'cachesDirectory',
			type: [types.pdf]
		});
		return pickerResult;
	} catch (e) {
		console.log({ e });
		return null;
	}
};

export default pickDocument;
