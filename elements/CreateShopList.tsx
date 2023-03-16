import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {CreateShopListProps} from 'navTypes';
import {useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomTextInput from './element/CustomTextInput';
import Icon from 'react-native-vector-icons/Entypo';
import Btn from './element/Btn';
import uuid from 'react-native-uuid';

function CreateShopList({route, navigation}: CreateShopListProps): JSX.Element {
  const list = route.params.list;
  const [listName, setName] = useState('');

  const createList = () => {
    return {name: listName, listOfProducts: list, id: uuid.v4().toString()};
  };

  let mappedList = list.map(category =>
    category.products.map(product => (
      <View
        key={product.name}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="dot-single" size={20} color="black" />
        <Text style={{fontSize: 20, color: 'black'}}>{product.name}</Text>
        <Text style={{fontSize: 20, color: '#333333', fontStyle: 'italic'}}>
          {' '}
          ({category.category})
        </Text>
      </View>
    )),
  );

  const numberOfProducts = () => {
    let result = 0;
    list.forEach(category => (result += category.products.length));
    return result;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
      <Text
        style={{
          color: 'black',
          fontSize: 30,
          margin: 10,
          textAlign: 'center',
        }}>
        NOWA LISTA
      </Text>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontSize: 20,
        }}>
        Nazwa:
      </Text>
      <CustomTextInput value={listName} onChangeText={setName} />
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontSize: 20,
        }}>
        Produkty ({numberOfProducts()}):
      </Text>
      <ScrollView style={{padding: 20}}>
        {list.length > 0 ? (
          mappedList
        ) : (
          <Text style={{fontSize: 20, color: '#333333'}}>
            Brak wybranych produktów
          </Text>
        )}
      </ScrollView>
      <Btn
        function={() => {
          navigation.navigate('Select products screen', {list: list});
        }}
        name="Wybierz/edytuj produkty"
      />
      <Btn
        name="Utwórz listę"
        function={() => {
          console.log(createList());
          navigation.navigate('Home');
        }}
      />
    </SafeAreaView>
  );
}
export default CreateShopList;
