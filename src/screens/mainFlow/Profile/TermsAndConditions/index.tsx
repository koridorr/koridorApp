import React from 'react';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../hooks/store';
import {getCms} from '../../../../reducers/commonSlice';
import {TermsAndConditionsView} from './TermsAndConditionsView';

const TermsAndConditions = (props: any) => {
  const cmsData = useAppSelector(getCms);
  const [termsAndConditions, setTermsAndConditions] = useState('');

  const cmsHandler = () => {
    setTermsAndConditions(cmsData?.termsAndConditions);
  };

  useEffect(() => {
    cmsHandler();
  }, []);

  return <TermsAndConditionsView termsAndConditions={termsAndConditions} />;
};

export default TermsAndConditions;
