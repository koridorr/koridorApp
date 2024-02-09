import { StatusBar, TextInput, StyleSheet, View } from 'react-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { colors } from '../helpers/styles';
import { AppNavigation } from '../navigation';
import { store } from './store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { Text } from '../components';
import React from 'react';

interface TextWithDefaultProps extends Text {
	defaultProps?: { allowFontScaling?: boolean };
}

interface TextInputWithDefaultProps extends TextInput {
	defaultProps?: { allowFontScaling?: boolean };
}

(Text as any as TextWithDefaultProps).defaultProps = {
	...((Text as any as TextWithDefaultProps).defaultProps || {}),
	allowFontScaling: false
};

(TextInput as any as TextInputWithDefaultProps).defaultProps = {
	...((TextInput as any as TextInputWithDefaultProps).defaultProps || {}),
	allowFontScaling: false
};

const AppWrapper = () => {
	const [showNoInternet, setShowNoInternet] = useState(false);
	const netInfo = useNetInfo();
	
	useEffect(() => {
		// Subscribe
		const unsubscribe = NetInfo.addEventListener((state) => {
		
		});

		// Unsubscribe
		unsubscribe();
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
		  setShowNoInternet(!netInfo.isConnected);
		},50);
	return () => clearTimeout(timer);
	  }, [netInfo.isConnected]);
	const insets = useSafeAreaInsets();

	return (
		<Provider store={store}>
			<SafeAreaView edges={['top']} style={styles(insets).appWrapper}>
				<StatusBar backgroundColor='#F7FFE9' barStyle={'dark-content'} />
			
				{showNoInternet ? (
					<View
						style={{
							width: '100%',
							backgroundColor: 'red',
							alignItems: 'center'
						}}
					>
						<Text customStyle={{ fontSize: 11, color: colors.white }}>NO INTERNET CONNECTION</Text>
					</View>
				) : null}
				<AppNavigation />
			</SafeAreaView>
		</Provider>
	);
};

const styles = (insets: { bottom: any }) =>
	StyleSheet.create({
		appWrapper: {
			flex: 1,
			backgroundColor: colors.bg
		}
	});

export default AppWrapper;
