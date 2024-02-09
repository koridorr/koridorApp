import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {colors, screenHeight, screenWidth} from '../../../../helpers/styles';
import {IMAGE_NAMES} from '../../../../helpers/constants';
import {Text, Touchable} from '../../../../components';
import {Button} from '../../../../widgets';
import {navigate} from '../../../../navigation';

const ConfirmCompleteOrderView = () => {
  return (
    <View style={styles.container}>
      <Text customStyle={{top: 100}} color={colors.white}>
        ID - 8263WRYERR
      </Text>
      <View style={{alignItems: 'center', justifyContent: 'center', top: 70}}>
        <Image
          resizeMode="contain"
          style={{width: screenWidth / 4, height: screenHeight / 2}}
          source={IMAGE_NAMES.groceries}
        />
      </View>
      <View style={{alignItems: 'center', bottom: 50}}>
        <Text customStyle={styles.welcomeText}>Woo hoo! </Text>
        <Text customStyle={styles.welcomeText}>Order completed</Text>
        <Text fontSize={12} color={colors.white}>
          Rate us so that we can
        </Text>
        <Text fontSize={12} color={colors.white}>
          improve our service
        </Text>
      </View>

      <View style={{paddingVertical: 20, top: 70, width: '100%'}}>
        <Button
          onPress={() => navigate('RateOrder', undefined)}
          customStyle={{borderRadius: 50}}
          value="Rate us"
        />
      </View>
      <Touchable
        onPress={() => navigate('MainFlow', {screen: 'HomeScreen'})}
        style={{
          paddingVertical: 20,
          width: '100%',
          top: 50,
        }}>
        <Text customStyle={{textAlign: 'center'}} color={colors.white}>
          Skip
        </Text>
      </Touchable>
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
    alignItems: 'center',
    paddingVertical: 10,
  },
  welcomeText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: 'bold',
    paddingVertical: 4,
  },
});

export default ConfirmCompleteOrderView;
