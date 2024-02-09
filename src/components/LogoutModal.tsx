import React from 'react';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors, fonts, screenHeight} from '../helpers/styles';
import {Button} from '../widgets';
import Text from './Text';
import Touchable from './Touchable';
const LogoutModal = (props: any) => {
  const deviceHeight = Dimensions.get('screen').height;
 
  return (
    <View style={{flex: 1}}>
      <Touchable
        onPress={props.toggleModal}
        style={{paddingHorizontal: 20, paddingTop: 12}}>
        <Text fontSize={14} color={colors.black} fontFamily={fonts.BOLD}>
          Logout
        </Text>
      </Touchable>
      <Modal
        statusBarTranslucent
        isVisible={props.isModalVisible}
        backdropOpacity={0.3}
        deviceHeight={deviceHeight}>
        <View style={styles.moadalConatiner}>
          <View style={{alignItems: 'center', top: 8}}>
            <Text fontFamily={fonts.BOLD} fontSize={16}>
              Are you sure you want to logout?
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              bottom: 8,
            }}>
            <View style={{width: '45%'}}>
              <Button value="No" onPress={props.toggleModal} />
            </View>
            <View style={{width: '45%'}}>
            <Button value="Yes" onPress={props.logout} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  moadalConatiner: {
    backgroundColor: colors.white,
    flex: 0.2,
    justifyContent: 'space-around',
    borderRadius: 18,
  },
});
