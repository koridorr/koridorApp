import React, { useState } from 'react';
import PaymentCompletedView from './PaymentCompletedView';

const PaymentCompleted = (props:any) => {
  const [orderDetails, setOrderDetails] = useState(props?.route?.params)
  
  return <PaymentCompletedView orderDetails={orderDetails} />;
};

export default PaymentCompleted;
