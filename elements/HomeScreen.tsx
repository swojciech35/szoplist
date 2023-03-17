import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import DrawerShowButton from './element/DrawerShowButton';

function HomeScreen({navigation}: any): JSX.Element {
  return (
    <>
      <View>
        <DrawerShowButton navigation={navigation} />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'black'}}>Home Screen</Text>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Create New List');
            navigation.navigate('Show List');
          }}>
          <Text>Utwórz nową listę</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
export default HomeScreen;
