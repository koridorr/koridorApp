import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Touchable} from '../../../../components';
import {ICON_NAMES} from '../../../../helpers/constants';
import {colors, screenHeight} from '../../../../helpers/styles';
import {Header} from '../../../../widgets';

type PrivacyPolicyTypesProps = {
  faqData: any;
  selected: number;

  handleChange: (id: number) => void;
};

export const FaqView = ({
  faqData,
  selected,

  handleChange,
}: PrivacyPolicyTypesProps) => {
  return (
    <View>
      <Header title="FAQ's" />
      {faqData?.faq ? (
        <View style={{padding: 15}}>
          {faqData?.faq?.map((item: any, i: any) => {
            return (
              <Touchable
                style={styles.button}
                onPress={() => handleChange(i)}
                key={i}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                  }}>
                  <View style={{width: '92%'}}>
                    <Text
                      fontSize={14}
                      customStyle={styles.text}>{`${item.question}`}</Text>
                  </View>
                  <View style={{width: '8%', marginLeft: 5, marginTop: 8}}>
                    <FastImage
                      source={selected ? ICON_NAMES.up : ICON_NAMES.down}
                      style={{height: 18, width: 18}}
                      resizeMode={'contain'}
                    />
                  </View>
                </View>
                {selected === i ? (
                  <View>
                    {/* <View style={styles.divider} /> */}
                    <Text
                      fontSize={12}
                      color="#4F4F4F"
                      customStyle={styles.text}>{`${item.answer}`}</Text>
                  </View>
                ) : null}
                <View style={styles.divider} />
              </Touchable>
            );
          })}
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: screenHeight / 1.3,
          }}>
          <Text>No Faq's Found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 2,
    width: '100%',
    borderRadius: 12,
    marginBottom: 12,
  },
  text: {
    paddingVertical: 4,
  },
  divider: {
    borderBottomWidth: 0.3,
    paddingVertical: 2,
    marginBottom: 10,
    top: 10,
    borderBottomColor: colors.lightGrey,
  },
});
