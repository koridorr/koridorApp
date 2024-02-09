import React from 'react';
import WelcomeScreenView from './WelcomeScreenView';
import {replace} from '../../../navigation';

const WelcomeScreen = (props: any) => {
  const forwordNavigate = () => {
    replace('MainFlow', {screen: 'HomeScreen'});
  };
  return <WelcomeScreenView forwordNavigate={forwordNavigate} />;
};

export default WelcomeScreen;
