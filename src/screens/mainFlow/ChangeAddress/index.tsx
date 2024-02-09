import React from 'react';
import {ICON_NAMES} from '../../../helpers/constants';
import {ChangeAddressView} from './ChangeAddressView';

const ChangeAddress = () => {
  const Addresses = [
    {
      name: 'Other',
      text: '145 Stafford Rd, Wallington 13732',
      icon: ICON_NAMES.pinLocation,
    },
    {
      name: 'Other',
      text: '145 Stafford Rd, Wallington 13732, Sector 14',
      icon: ICON_NAMES.pinLocation,
    },
    {
      name: 'Other',
      text: '145 Stafford Rd, Wallington 13732, Sector 14',
      icon: ICON_NAMES.pinLocation,
    },
    {
      name: 'Other',
      text: '145 Stafford Rd, Wallington 13732, Sector 14',
      icon: ICON_NAMES.pinLocation,
    },
    {
      name: 'Other',
      text: '145 Stafford Rd, Wallington 13732, Sector 14',
      icon: ICON_NAMES.pinLocation,
    },
  ];

  return <ChangeAddressView Addresses={Addresses} />;
};

export default ChangeAddress;
