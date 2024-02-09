import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';

import {ICON_NAMES, IMAGE_NAMES} from '../../../../helpers/constants';
import SeeAllRecentlyVisitedView from './SeeAllRecentlyVisitedView';

const SeeAllRecentlyVisited = (props:any) => {
  const [venderData, setvVenderData] = useState([])
  const [favVendors, setFavVendors] = useState([])
  
  useEffect(() => {
   if (props?.route?.params) {
    setvVenderData(props?.route?.params)
   }
   checkFavProduct()
  }, [props?.route?.params?.data])
  
  useFocusEffect(
    useCallback(() => {
      checkFavProduct()
    }, [venderData]),
  )


  const checkFavProduct = () => {
    const favVendors = venderData
    .filter((item :any) => item.isFavourite)
    .map(item => item);
  setFavVendors(favVendors)
  }

  
  return <SeeAllRecentlyVisitedView setFavVendors={setFavVendors} favVendors={favVendors} venderData={venderData} />;
};

export default SeeAllRecentlyVisited;
