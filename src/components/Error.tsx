import { StyleSheet, View } from 'react-native';
import Text from './Text';
import { colors } from '../helpers/styles';
import React from 'react';

/**
 *
 * @prop {type} example - example description
 */
const Error = ({ error }: { error: string }) => {
	return (
		<View style={styles.container}>
			<Text children={error} color={colors.red} fontSize={12} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 4
	}
});

export default Error;
