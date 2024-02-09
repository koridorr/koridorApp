import React, { useCallback, useEffect, useState } from 'react';
import {IMAGE_NAMES} from '../../../../helpers/constants';
import SeeAllCategoryView from './SeeAllCategoryView';
import { useFocusEffect } from '@react-navigation/native';

const SeeAllCategory = (props : any) => {
  
  const [allCategory, setAllCategory] = useState([])
  const [selectedInd, setSelectedInd] = useState(-1)
  const [vendorId, setVendorId] = useState('')
  useEffect(() => {
   if (props?.route?.params?.body?.data?.length) {
    setAllCategory(props?.route?.params?.body?.data)
    setVendorId(props?.route?.params?.body?.vendorId)
   }
  }, [props?.route?.params?.data])

  useFocusEffect(
    useCallback(() => {
      setSelectedInd(-1)
    }, []),
  );
  return <SeeAllCategoryView  
  setSelectedInd={setSelectedInd}
  selectedInd={selectedInd} allCategory={allCategory}
  vendorId={vendorId}
  />;
};

export default SeeAllCategory;
