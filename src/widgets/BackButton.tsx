import {StyleSheet} from 'react-native';
import {Touchable} from '../components';
import FastImage from 'react-native-fast-image';
import {goBack} from '../navigation';
import {ICON_NAMES, IMAGE_NAMES} from '../helpers/constants';

/**
 *
 * @param onPress
 * @param value
 * @param type
 * @param disabled
 * @param customStyle
 * @param onLeftIconPress
 * @returns {JSX.Element}
 * @constructor
 */

type BackButtonTypes = {
  customStyle?: any;
  onLeftIconPress?: () => void;
};

const BackButton = ({
  customStyle = {},
  onLeftIconPress,
}: BackButtonTypes): JSX.Element => {
  return (
    <Touchable
      style={[styles.container, , customStyle]}
      onPress={() => (onLeftIconPress ? onLeftIconPress() : goBack())}>
      <FastImage
        tintColor={'#000'}
        source={IMAGE_NAMES.arrow_left}
        style={styles.buttonStyle}
        resizeMode="contain"
      />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 28,
    width: 28,
  },
});

export default BackButton;
