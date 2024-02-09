import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {ICON_NAMES, STORAGE_KEYS} from '../../../../helpers/constants';
import {PaymentMethodsView} from './PaymentMethodsView';
import {
  useDeleteCardMutation,
  useLazyGetCardQuery,
} from '../../../../services/booking';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import ShowToast from '../../../../utils/Toast';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';

const PaymentMethods = (props: any) => {
  const [getCardApi] = useLazyGetCardQuery();
  const [deleteCardApi] = useDeleteCardMutation();
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState([]);

  const GeneralList = [
    {
      name: 'Visa',
      text: '**** **** **** 3554',
      icon: ICON_NAMES.visa,
      navigateTo: '',
    },
    {
      name: 'MasterCard',
      text: '**** **** **** 4233',
      icon: ICON_NAMES.masterCard,
      navigateTo: '',
    },
    {
      name: 'MasterCard',
      text: '**** **** **** 4534',
      icon: ICON_NAMES.masterCard,
      navigateTo: '',
    },
  ];
  const askToDelete = async (item: any) => {
    Alert.alert('', 'Are you sure you want to delete this card?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          deleteCard(item);
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      getCardData();
    }, []),
  );

  const getCardData = async () => {
    try {
      setLoading(true);
      const payload: any = await getCardApi({}).unwrap();
      setLoading(false);
      if (payload.statusCode === 200) {
        setCardData(payload?.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteCard = async (item: any) => {
    let indexToDelete = cardData?.indexOf(item);
    let newArray = cardData
      .slice(0, indexToDelete)
      .concat(cardData.slice(indexToDelete + 1));
    setCardData([...newArray]);
    let body = {
      cardId: item?.id,
    };
    try {
      const encryptedKey = generateEncryptedKey(body) || {
        sek: '',
        hash: '',
      };
      type pramasType = {
        sek: string;
        hash: string;
        body: '';
      };
      const params = {
        sek: encryptedKey.sek || '',
        hash: encryptedKey.hash || '',
      };
      setLoading(true);
      const payload = await deleteCardApi(item?.id as pramasType).unwrap();
      ShowToast(payload?.message || '');
      // if (payload?.statusCode===200) {
      //   goBack()
      // }
      setLoading(false);
    } catch (error: any) {
      console.log(error, 'error');

      setLoading(false);
      ShowToast(error?.data?.message || '');
    }
  };

  return (
    <PaymentMethodsView
      GeneralList={GeneralList}
      askToDelete={askToDelete}
      cardData={cardData}
      loading={loading}
    />
  );
};

export default PaymentMethods;
