import React, { Dispatch } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  colors,
  fonts,
} from '../../../../../helpers/styles';
import { Button, Header, Input } from '../../../../../widgets';
import FastImage from 'react-native-fast-image';
import { ICON_NAMES } from '../../../../../helpers/constants';
import { Text } from '../../../../../components';
import CheckBox from '../../../../../widgets/Checkbox';
import { SetStateAction } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../../../widgets/Loader';

type AddNewCardViewType = {
  loading: boolean
  cardNum: string
  cvv: string
  name: string
  expDate: string
  setCardNum: Dispatch<SetStateAction<string>>;
  setExpDate: Dispatch<SetStateAction<string>>;
  setCvv: Dispatch<SetStateAction<string>>;
  setName: Dispatch<SetStateAction<string>>;
  onChnageExpDate: (text: string) => Promise<void>
  addCard: () => void
}

export const AddNewCardView = ({
  loading, cardNum, cvv, name, expDate, setCardNum, setExpDate, setCvv, setName, onChnageExpDate, addCard

}: AddNewCardViewType) => (
  <>
    <Header title="Add New Card" />
    <Loader loading={loading} />
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={true}


    >
      <View style={styles.container}>
        <View>
          <Input
            keyboardType={'numeric'}
            placeholder="Card number*"
            customContainerStyle={{
              borderBottomWidth: 1,
            }}
            value={cardNum}
            onChange={(val: string) => {
              setCardNum(val);
            }}
            maxLength={16}
          />
          <Input
            keyboardType={'numeric'}
            placeholder="Expiry date*"
            customContainerStyle={{
              top: 2,
              borderBottomWidth: 1,
            }}
            value={expDate}
            onChange={(text) => onChnageExpDate(text)}
          />
          <Input
            keyboardType={'numeric'}
            placeholder="CVV*"
            customContainerStyle={{
              top: 2,
              borderBottomWidth: 1,
            }}
            value={cvv}
            onChange={(val: string) => {
              setCvv(val);
            }}
          />
          <Input
            placeholder="Card holder name*"
            customContainerStyle={{
              top: 2,
              borderBottomWidth: 1,
            }}
            value={name}
            onChange={text => {
              if (text !== ' ') {
                setName(text);
              }
            }}

          />
        </View>
        {/* <View style={{ flexDirection: 'row', top: 14, left: 4 }}>
          <CheckBox isChecked={false} setChecked={() => { }} />

          <Text fontSize={12}>Save this for future purchases</Text>
        </View> */}

        <View style={{ paddingVertical: 50 }}>
          <Button
            onPress={() => !loading ? addCard() : console.log('lklk')
            }

            value="Add Card"
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FastImage
            source={ICON_NAMES.secure}
            style={{
              height: 25,
              width: 25,
              paddingVertical: 15,
            }}
            resizeMode="contain"
          />
          <Text color="#4E4F4F" fontSize={12} fontFamily={fonts.BOLD}>
            100% SECURE DATA ENCRYPTION
          </Text>
          <Text color="#4E4F4F" fontSize={12}>
            We guarantee security of every transaction
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  profileInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.black,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FFE9',
    height: 45,
    width: 110,
    justifyContent: 'center',
    borderRadius: 50,
    margin: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    height: 45,
    width: 110,
    justifyContent: 'center',
    borderRadius: 50,
    margin: 4,
  },
});
