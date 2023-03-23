import {ListToSaveType, ShopListProps} from 'navTypes';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomCheckbox from './CustomCheckbox';
import DrawerShowButton from './element/DrawerShowButton';
import {ProgressBar} from 'react-native-paper';
import {useEffect, useState} from 'react';
import Btn from './element/Btn';
import {ToastAndroid} from 'react-native/Libraries/Components/ToastAndroid/ToastAndroid';
import {addNewList, getList} from 'function/database';
function ShopList({route, navigation}: ShopListProps): JSX.Element {
  const [list, setList] = useState({
    id: '',
    listOfProducts: [
      {
        category: '',
        products: [{name: '', checked: false}],
      },
    ],
    name: '',
  });
  const [marked, setMarked] = useState([[false]]);
  const [loading, setLoading] = useState(true);

  const markProduct = (catIndex: number, prodIndex: number) => {
    setMarked(check =>
      check.map((itemC, indexC) =>
        indexC === catIndex
          ? check[indexC].map((itemP, indexP) =>
              indexP === prodIndex ? !itemP : itemP,
            )
          : itemC,
      ),
    );
  };

  const getListFromDatabase = async () => {
    try {
      const json = await getList(route.params.listId);

      setMarked(
        Array(json.listOfProducts.length)
          .fill(null)
          .map((item, index) =>
            Array(json.listOfProducts[index].products.length)
              .fill(false)
              .map((prod, prodIndex) => {
                return json.listOfProducts[index].products[prodIndex].checked;
              }),
          ),
      );

      setList(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const howMany = () => {
    let resultMarked = 0;
    let resultAll = 0;
    marked.forEach(category => {
      resultAll += category.length;

      resultMarked += category.filter(item => {
        return item;
      }).length;
    });

    return [resultMarked, resultAll];
  };

  const updateList = () => {
    // if (howMany()[0] == howMany()[1]) {
    //   ToastAndroid.show('Wszystkie!', ToastAndroid.SHORT);
    // }

    let tmp = list;
    tmp.listOfProducts.forEach((category, categoryIndex) =>
      category.products.forEach(
        (product, productIndex) =>
          (product.checked = marked[categoryIndex][productIndex]),
      ),
    );
    return tmp;
  };

  useEffect(() => {
    getListFromDatabase();
  }, []);

  let mappedList = list.listOfProducts.map((category, categoryIndex) =>
    category.products.map((product, productIndex) => (
      <TouchableOpacity
        key={product.name}
        onPress={() => markProduct(categoryIndex, productIndex)}
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 6,
          paddingVertical: 3,
        }}>
        <CustomCheckbox isChecked={marked[categoryIndex][productIndex]} />
        <Text style={{fontSize: 20, color: 'black'}}> {product.name}</Text>
        <Text style={{fontSize: 20, color: '#333333', fontStyle: 'italic'}}>
          {' '}
          ({category.category})
        </Text>
      </TouchableOpacity>
    )),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
      <DrawerShowButton navigation={navigation} />

      {loading ? null : (
        <>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              margin: 10,
              textAlign: 'center',
            }}>
            {list.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              textAlign: 'right',
              marginHorizontal: 10,
            }}>
            {howMany()[0]} / {howMany()[1]}
          </Text>
          <ProgressBar
            progress={howMany()[0] / howMany()[1]}
            color="#699A41"
            style={{margin: 15, borderWidth: 2, height: 15, borderRadius: 10}}
          />
          <ScrollView style={{marginHorizontal: 10}}>{mappedList}</ScrollView>
          <Btn
            name="Edytuj listę"
            function={() => {
              navigation.navigate('Create New List', {
                id: list.id,
                list: list.listOfProducts,
                name: list.name,
              });
            }}
          />
          <Btn
            name="Zapisz listę"
            function={() => {
              addNewList(list.id, updateList());
              navigation.navigate('Home');
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}
export default ShopList;
