import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ICON_NAMES } from '../helpers/constants';
import Text from './Text';
import Touchable from './Touchable';

type dateTypes = {
	date: any;
	setDate: (val: string) => void;
	highlighted: any;
};

const DatePicker = ({ date, setDate, highlighted }: dateTypes) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (value: any) => {
		hideDatePicker();
		setDate(value);
	};

	return (
		<View>
			<Touchable
				style={[
					{
						backgroundColor: '#F7F4F4',
						paddingVertical: 17,
						borderRadius: 12,
						borderColor: 'red'
					},
					{ borderWidth: highlighted ? 1 : 0 }
				]}
				onPress={showDatePicker}
			>
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: 20
					}}
				>
					<View>
						<Text fontSize={14}>{date ? `${moment(date).format('DD-MM-YYYY')}` : `Date Of birth`}</Text>
					</View>

					<View style={{ paddingLeft: 15 }}>
						<FastImage resizeMode='contain' source={ICON_NAMES.arrow} style={{ height: 15, width: 15 }} />
					</View>
				</View>
			</Touchable>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode='date'
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
				maximumDate={new Date(moment().subtract(13, 'year') as any)}
			/>
		</View>
	);
};

export default DatePicker;
