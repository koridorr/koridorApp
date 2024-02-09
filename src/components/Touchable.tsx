import React from 'react';
import { TouchableOpacity } from 'react-native';

/**
 *
 * @param disabled
 * @param onPress
 * @param children
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */

type TouchableProps = {
	disabled?: boolean;
	onPress: any;
	children: React.ReactNode;
	style?: any;
	activeOpacity?: number;
};

const Touchable = ({
	disabled = false,
	onPress,
	children,
	style,
	activeOpacity = 0.6
}: TouchableProps): JSX.Element => {
	const _Touchable = TouchableOpacity;

	return (
		<_Touchable
			activeOpacity={activeOpacity}
			children={children}
			disabled={disabled}
			style={style}
			onPress={onPress}
		/>
	);
};

export default Touchable;
