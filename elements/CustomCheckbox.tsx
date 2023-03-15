import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

type CheckboxProps = {
  isChecked: boolean;
};

const CustomCheckbox = (props: CheckboxProps) => {
  let isX = props.isChecked ? 'checkbox-active' : 'checkbox-passive';
  return (
    // <View style={{}}>
    //   <Icon name={isX} size={20} color="black" />
    // </View>
    <View style={styles.square}>
      {props.isChecked ? <Icon name="check" color="black" /> : null}
    </View>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  square: {
    backgroundColor: 'white',
    aspectRatio: 1,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
