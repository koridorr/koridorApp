import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { colors, screenWidth } from '../helpers/styles';
import { isNumber } from '../utils/Validations';

const OtpInput = ({ otp, setOtp }: { otp: string; setOtp: Dispatch<SetStateAction<string>> }) => {
	return (
		<View>
			<OTPInputView
				style={{ width: '100%', height: 50 }}
				pinCount={4}
				code={otp}
				onCodeChanged={(code) => {
					if (isNumber(code)) {
						setOtp(code);
					}
				}}
				autoFocusOnLoad={Platform.OS === 'ios' ? true : false}
				codeInputFieldStyle={styles.underlineStyleBase}
				codeInputHighlightStyle={styles.underlineStyleHighLighted}
				onCodeFilled={(code) => {
					console.log(`Code is ${code}, you are good to go!`);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	underlineStyleBase: {
		width: screenWidth / 6,
		height: 45,
		borderWidth: 0,
		borderBottomWidth: 1,
		fontSize: 24,
		color: colors.black
	},
	underlineStyleHighLighted: {
		borderColor: colors.green
	}
});

export default OtpInput;
