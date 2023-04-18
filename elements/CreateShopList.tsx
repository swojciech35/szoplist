import {View, Text, SafeAreaView, ScrollView, ToastAndroid} from 'react-native';
import {CreateShopListProps} from 'navTypes';
import {useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomTextInput from './element/CustomTextInput';
import Icon from 'react-native-vector-icons/Entypo';
import Btn from './element/Btn';
import uuid from 'react-native-uuid';
import DrawerShowButton from './element/DrawerShowButton';
import {addListIdToUser, addNewList} from 'function/database';
import {useAppDispatch, useAppSelector} from 'hooks';
import {addListData} from 'redux/listSlice';

function CreateShopList({route, navigation}: CreateShopListProps): JSX.Element {
  const list = route.params.list;
  const [listName, setName] = useState(route.params.name);
  const id = route.params.id == null ? uuid.v4().toString() : route.params.id;
  const usr = useAppSelector(state => state.user.userData);
  const ifListSaved = route.params.id == null ? false : true;
  const dispatch = useAppDispatch();
  const createList = () => {
    return {name: listName, listOfProducts: list, id: id};
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
      <DrawerShowButton navigation={navigation} />
      <Text
        style={{
          color: 'black',
          fontSize: 30,
          margin: 10,
          textAlign: 'center',
        }}>
        {ifListSaved ? 'EDYTUJ LISTĘ' : 'NOWA LISTA'}
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
          navigation.navigate('Select products screen', {
            name: listName,
            list: list,
            id: route.params.id,
          });
        }}
        name="Wybierz/edytuj produkty"
      />
      <Btn
        name="Zapisz listę"
        function={() => {
          if (listName == '') {
            ToastAndroid.show('Nazwa nie może być pusta', ToastAndroid.SHORT);
          } else {
            addNewList(id, createList());
            if (usr != null) addListIdToUser(usr.uid, id);
            dispatch(addListData(createList()));
            navigation.navigate('Show List', {listId: id});
          }
        }}
      />
    </SafeAreaView>
  );
}
export default CreateShopList;
