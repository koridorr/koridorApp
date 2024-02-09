import AsyncStorage from '@react-native-async-storage/async-storage';

const addKeyToStorage = async (address: string, key: any) => {
	await AsyncStorage.setItem(address, JSON.stringify(key));
};

const getKeyFromStorage = async (address: string) => {
	return JSON.parse((await AsyncStorage.getItem(address)) as any);
};

const removeKeyFromStorage = async (address: string) => {
	try {
		await AsyncStorage.removeItem(address);
		return true;
	} catch (exception) {
		return false;
	}
};

const clearStorage = async () => {
	try {
		await AsyncStorage.clear();
		return true;
	} catch (exception) {
		return false;
	}
};

export { addKeyToStorage, getKeyFromStorage, removeKeyFromStorage, clearStorage };
