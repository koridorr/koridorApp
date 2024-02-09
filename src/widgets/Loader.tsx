import {ActivityIndicator, View} from 'react-native';
import {colors, screenHeight, screenWidth} from '../helpers/styles';

const Loader = ({loading}: {loading: boolean}) => {
  return (
    <>
      {loading ? (
        <View
          style={{
            height: screenHeight / 1.1,
            width: screenWidth,
            position: 'absolute',
            zIndex: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <ActivityIndicator color={colors.black} size={'large'} />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default Loader;
