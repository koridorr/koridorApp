import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Props = {
	children: React.ReactNode;
};

const SafeAreaContext = ({ children }: Props) => {
	return <SafeAreaProvider>{children}</SafeAreaProvider>;
};

export default SafeAreaContext;
