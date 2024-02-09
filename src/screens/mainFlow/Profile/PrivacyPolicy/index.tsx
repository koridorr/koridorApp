import {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../hooks/store';
import {getCms} from '../../../../reducers/commonSlice';
import {PrivacyPolicyView} from './PrivacyPolicyView';

const PrivacyPolicy = (props: any) => {
  const cmsData = useAppSelector(getCms);
  const [privacyPolicy, setPrivacyPolicy] = useState('');

  const cmsHandler = () => {
    setPrivacyPolicy(cmsData?.privacyPolicy);

  };

  useEffect(() => {
    cmsHandler();
  }, []);

  return <PrivacyPolicyView privacyPolicy={privacyPolicy} />;
};

export default PrivacyPolicy;
