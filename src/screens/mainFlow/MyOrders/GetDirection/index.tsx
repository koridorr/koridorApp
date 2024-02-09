import React, {useState} from 'react';
import GetDirectionView from './GetDirectionView';

const GetDirection = () => {
  const [deliver, setDeliver] = useState(false);

  const deliverHandler = () => {
    setDeliver(true);
  };

  return <GetDirectionView deliverHandler={deliverHandler} deliver={deliver} />;
};

export default GetDirection;
