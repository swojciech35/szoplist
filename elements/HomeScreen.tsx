import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';

function HomeScreen({navigation}: any): JSX.Element {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>Home Screen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Create New List');
        }}>
        <Text>Utwórz nową listę</Text>
      </TouchableOpacity>
    </View>
  );
}
export default HomeScreen;
