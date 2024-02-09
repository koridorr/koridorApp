import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from '../../../components';
import {colors, screenHeight, screenWidth} from '../../../helpers/styles';
import {IMAGE_NAMES} from '../../../helpers/constants';
import {Button} from '../../../widgets';
import {navigate} from '../../../navigation';

type PropTypes = {
  forwordNavigate: () => void;
};

const WelcomeScreenView = ({forwordNavigate}: PropTypes) => {
  return (
    <View style={styles.container}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', bottom: 30}}>
        <Image
          resizeMode="contain"
          style={{width: screenWidth, height: screenHeight / 2.4}}
          source={IMAGE_NAMES.welcome}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text customStyle={styles.welcomeText}>Welcome</Text>
        <Text
          customStyle={{
            color: colors.white,
            textAlign: 'center',
            fontSize: 14,
            paddingVertical: 10,
          }}>
          Congratulations, your account has been created. You can start using
          the app.
        </Text>
      </View>
      <Text>Welcome</Text>

      <View style={{paddingVertical: 20, top: 10}}>
        <Button
          onPress={() => forwordNavigate()}
          customStyle={{borderRadius: 50}}
          value="Continue"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 18,
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default WelcomeScreenView;
