import React, {useState} from 'react';
import ShowToast from '../../../../../utils/Toast';
import {AddNewCardView} from './AddNewCardView';
import Stripe from 'react-native-stripe-api';
import {usePostAddCardMutation} from '../../../../../services/booking';
import {generateEncryptedKey} from '../../../../../widgets/CryptoPrivacy';
import {goBack, navigate} from '../../../../../navigation';
import moment from 'moment';
const AddNewCard = (props: any) => {
  const [addCardApi] = usePostAddCardMutation();
  const [cardNum, setCardNum] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [yearexp, setyear] = useState('');
  const [monthexp, setmonth] = useState('');
  const [loading, setLoading] = useState(false);

  const addCard = async () => {
    if (cardNum === '' || expDate === '' || cvv === '' || name === '') {
      ShowToast('All fields are required');
    } else if (cardNum.length != 16) {
      ShowToast('Please enter valid Card Number');
    } else if (expDate.length != 5) {
      ShowToast('Please enter valid expDate');
    } else if (cvv.length != 3) {
      ShowToast('Please enter valid CVV Number');
    } else if (name.length < 3) {
      ShowToast('Please enter valid name');
    } else {
      setLoading(true);
      const apiKey =
        'pk_test_51No5vcGbC8TRPF9fDruG619UuE7IXi4B1nBXGwvZa8Nz8ph3KN5h9rmiKEFi6VC66c442FiJ2mViYHMRo89zArxf00vWpJap4P';
      const client = new Stripe(apiKey);
      const token = await client.createToken({
        name: name,
        number: cardNum,
        exp_month: monthexp,
        exp_year: yearexp,
        cvc: cvv,
      });
      if (token?.error) {
        setLoading(false);

        ShowToast(token.error.message);
      } else {
        let body = {
          cardToken: token?.id,
          appkey: moment.utc().valueOf().toString(),
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
          const payload = await addCardApi(params as pramasType).unwrap();
          ShowToast(payload?.message || '');
          if (payload?.statusCode === 200) {
            goBack();
          }
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          ShowToast(error?.data?.message || '');
        }
        // dispatch(addCard.request(body));
      }
    }
    setLoading(false);
  };

  const onChnageExpDate = async (text: string) => {
    if (text.length > 5) return;
    if (text.length > expDate.length) {
      if (expDate.length === 2) {
        let str = expDate;
        str = str.concat('/' + text.charAt(text.length - 1));
        setExpDate(str);
      } else {
        setExpDate(text);
        let yearset = text.split('/');
        let year = yearset[yearset.length - 1];
        setyear(year);
        let monthset = text.split('/');
        let month = monthset[monthset.length - 2];
        setmonth(month);
      }
    } else {
      setExpDate(text);
    }
  };

  return (
    <AddNewCardView
      cardNum={cardNum}
      cvv={cvv}
      name={name}
      expDate={expDate}
      setCardNum={setCardNum}
      setExpDate={setExpDate}
      setCvv={setCvv}
      setName={setName}
      onChnageExpDate={onChnageExpDate}
      addCard={addCard}
      loading={loading}
    />
  );
};

export default AddNewCard;
