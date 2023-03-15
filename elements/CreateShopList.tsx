import {View, Text} from 'react-native';
import {CreateShopListProps} from 'navTypes';
import {useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function CreateShopList({route, navigation}: CreateShopListProps): JSX.Element {
  const list = route.params.list;
  const [listName, setName] = useState('');

  const createList = () => {
    return {name: listName, listOfProducts: list};
  };

  let mappedList = list.map(category =>
    category.products.map(product => (
      <Text key={product.name}>
        {product.name} ({category.category})
      </Text>
    )),
  );

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
        <Text>WYBIERZ/EDYTUJ PRODUKTY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log(createList());
          navigation.navigate('Home');
        }}>
        <Text>UTWÓRZ LISTĘ</Text>
      </TouchableOpacity>
    </View>
  );
}
export default CreateShopList;
