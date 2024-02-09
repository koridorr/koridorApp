import {Dispatch, SetStateAction} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {colors} from '../helpers/styles';

type CheckBoxTypes = {
  isChecked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
};

const CheckBox = ({isChecked, setChecked}: CheckBoxTypes) => {
  return (
    <BouncyCheckbox
      iconStyle={{
        borderRadius: 2,
        borderWidth: 1,
        borderColor: colors.black,
      }}
      fillColor={colors.black}
      unfillColor={colors.white}
      innerIconStyle={{borderWidth: 0}}
      size={14}
      isChecked={isChecked}
      onPress={(val: boolean) => setChecked(!isChecked)}
      textContainerStyle={{
        marginLeft: 8,
      }}
      disableBuiltInState
    />
  );
};

export default CheckBox;
