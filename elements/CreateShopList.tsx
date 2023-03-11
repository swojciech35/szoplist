import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import type {RouteProp} from '@react-navigation/native';
import type {DrawerScreenProps} from '@react-navigation/drawer';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CreateShopListProps} from 'navTypes';
import {useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function CreateShopList({route, navigation}: CreateShopListProps): JSX.Element {
  const [list, setList] = useState(route.params.list);
  const [listName, setName] = useState('');

  var mappedList = list.map(category =>
    category.products.map(product => (
      <Text key={product.name}>
        {product.name} ({category.category})
      </Text>
    )),
  );

  console.log('CreateShopList: ', list);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>Create Shop List Screen</Text>
      <TextInput
        value={listName}
        onChangeText={setName}
        style={{borderWidth: 2, borderColor: 'black'}}
      />
      {mappedList}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Select products screen', {list: list});
        }}>
        <Text>EDYTUJ LISTĘ</Text>
      </TouchableOpacity>
    </View>
  );
}
export default CreateShopList;
