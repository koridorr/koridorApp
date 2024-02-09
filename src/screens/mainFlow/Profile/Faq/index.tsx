import {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../hooks/store';
import {getCms} from '../../../../reducers/commonSlice';

import {FaqView} from './FaqView';

export const Faqs = () => {
  const [selected, setSelected] = useState(-1);

  const cmsData = useAppSelector(getCms);

  const handleChange = (id: number) => {
    if (selected === id) {
      setSelected(-1);
    } else {
      setSelected(id);
    }
  };

  return (
    <FaqView
      faqData={cmsData}
      selected={selected}
      handleChange={handleChange}
    />
  );
};
