import {Linking} from 'react-native';
import {ICON_NAMES, STORAGE_KEYS} from '../../../../helpers/constants';
import {useAppSelector} from '../../../../hooks/store';
import {getCms} from '../../../../reducers/commonSlice';
import ShowToast from '../../../../utils/Toast';
import {openComposer} from 'react-native-email-link';

import {ContactUsView} from './ContactUsView';
import React = require('react');

const ContactUs = (props: any) => {
  const cmsData = useAppSelector(getCms);
  const GeneralList = [
    {
      id: 1,
      name: 'Call Now',
      text: 'For a better experience, call from your registered number',
      icon: ICON_NAMES.fon,
    },
    {
      id: 2,
      name: 'Write to Us',
      text: 'Average response time 24-48 Hrs',
      icon: ICON_NAMES.edit,
    },
  ];

  const contactHandler = (id: number) => {
    if (id === 1) {
      if (cmsData?.contactUs?.dialCode && cmsData?.contactUs?.phone) {
        Linking.openURL(
          `tel:${cmsData?.contactUs?.dialCode}${cmsData?.contactUs?.phone}`,
        );
      } else {
        ShowToast('No contact number found!');
      }
    } else {
      if (cmsData?.contactUs?.email) {
        openComposer({
          to: cmsData?.contactUs?.email,
        });
      } else {
        ShowToast('No email found!');
      }
    }
  };

  return (
    <ContactUsView GeneralList={GeneralList} contactHandler={contactHandler} />
  );
};

export default ContactUs;
