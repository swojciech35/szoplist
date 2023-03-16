import {ReactElement, ReactNode, useEffect} from 'react';
import {View, Text, ScrollView, Modal, StyleSheet} from 'react-native';
import {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import CustomCheckbox from './CustomCheckbox';
import allProducts from './allProducts';
import {SelectProductsScreenProps} from 'navTypes';
import Btn from './element/Btn';
import CustomTextInput from './element/CustomTextInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DrawerShowButton from './element/DrawerShowButton';

function SelectProductsScreen({
  route,
  navigation,
}: SelectProductsScreenProps): JSX.Element {
  const previousList = route.params.list;

  const [list, setList] = useState(allProducts());
  const [openTabs, setTabs] = useState(
    new Array(allProducts().length).fill(false),
  );
  const [markedProducts, setMarked] = useState(
    new Array(allProducts().length)
      .fill(null)
      .map((item, index) =>
        Array(allProducts()[index].products.length).fill(false),
      ),
  );
  const [newProductWindow, setWindow] = useState(false);
  const [newProductCategoryIndex, setCategoryIndex] = useState(0);
  const [newProductName, setName] = useState('');

  const listOfCategories = list.map((cat, catIndex) => (
    <View key={'C' + catIndex}>
      <TouchableOpacity
        style={{
          backgroundColor: '#5a8196',
          flexDirection: 'row',
          borderWidth: 2,
          borderRadius: 8,
          margin: 5,
        }}
        onPress={() => toggleCategory(catIndex)}>
        <Icon
          name={openTabs[catIndex] ? 'expand-less' : 'expand-more'}
          size={30}
          color="black"
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {cat.category}
        </Text>
      </TouchableOpacity>
      {openTabs[catIndex]
        ? cat.products.map((prod, prodIndex) => (
            <View style={{flexDirection: 'row'}} key={'P' + prodIndex}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}
                onPress={() => {
                  markProduct(catIndex, prodIndex);
                }}>
                <CustomCheckbox
                  isChecked={markedProducts[catIndex][prodIndex]}
                />
                <Text style={{color: 'black', fontSize: 20}}> {prod.name}</Text>
              </TouchableOpacity>
            </View>
          ))
        : null}
    </View>
  ));
  const namesOfCategories = list.map(x => x['category']);
  const menuOfCategories = namesOfCategories.map((cat, index) => (
    <TouchableOpacity
      key={'CM' + index}
      style={{
        width: '100%',
      }}
      onPress={() => {
        setCategoryIndex(index);
      }}>
      <Text
        style={{
          fontWeight: index === newProductCategoryIndex ? 'bold' : 'normal',
          fontSize: 20,
          color: 'black',
        }}>
        {index === newProductCategoryIndex ? '> ' + cat + ' <' : cat}
      </Text>
    </TouchableOpacity>
  ));
  const modal = (
    <Modal visible={newProductWindow} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{color: 'black', fontSize: 30, marginBottom: 20}}>
            NOWY PRODUKT
          </Text>

          <Text style={{color: 'black', fontSize: 20}}>Nazwa:</Text>
          <CustomTextInput value={newProductName} onChangeText={setName} />

          <Text style={{color: 'black', fontSize: 20, marginBottom: 20}}>
            Kategoria:
          </Text>
          {menuOfCategories}

          <Btn
            name="Dodaj produkt"
            minWidth="60%"
            function={() => {
              setWindow(!newProductWindow);
              addProduct(newProductName, newProductCategoryIndex);
            }}
          />

          <Btn
            function={() => {
              setCategoryIndex(0);
              setName('');
              setWindow(!newProductWindow);
            }}
            name="Anuluj"
            minWidth="60%"
          />
        </View>
      </View>
    </Modal>
  );

  const toggleCategory = (index: number) => {
    setTabs(check => check.map((item, idx) => (idx === index ? !item : item)));
  };
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

  const changeTabs = (ifOpen: boolean) => {
    setTabs(check => check.map(() => ifOpen));
  };

  useEffect(() => {
    if (previousList != null) {
      list.forEach((defaultCategory, index) => {
        previousList.forEach(previousListCategory => {
          if (defaultCategory.category === previousListCategory.category) {
            for (var i = 0; i < previousListCategory.products.length; i++) {
              for (var j = 0; j < defaultCategory.products.length; j++) {
                if (
                  previousListCategory.products[i].name ===
                  defaultCategory.products[j].name
                ) {
                  break;
                }
                if (j == defaultCategory.products.length - 1) {
                  addProduct(previousListCategory.products[i].name, index);
                  break;
                }
              }
            }
          }
        });
      });

      list.forEach((defaultCategory, index) => {
        previousList.forEach(previousListCategory => {
          if (defaultCategory.category === previousListCategory.category) {
            for (var i = 0; i < previousListCategory.products.length; i++) {
              for (var j = 0; j < defaultCategory.products.length; j++) {
                if (
                  previousListCategory.products[i].name ===
                  defaultCategory.products[j].name
                ) {
                  if (!markedProducts[index][j]) {
                    markProduct(index, j);
                  }
                  break;
                }
              }
            }
          }
        });
      });
    }
  }, []);

  const addProduct = (name: string, catIndex: number) => {
    let newProduct = {name: name, checked: false};
    let newList = list;
    newList[catIndex].products.push(newProduct);
    setList(newList);

    let newMarked = markedProducts;
    markedProducts[catIndex].push(true);
    setMarked(newMarked);

    setCategoryIndex(0);
    setName('');
  };

  const createList = () => {
    let tmp = Object.assign([{}], list);

    for (var i = list.length - 1; i >= 0; i--) {
      for (var j = list[i].products.length - 1; j >= 0; j--) {
        if (markedProducts[i][j] == false) {
          tmp[i].products.splice(j, 1);
        }
      }

      if (tmp[i].products.length == 0) {
        tmp.splice(i, 1);
      }
    }

    navigation.navigate('Create New List', {list: tmp});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
      <DrawerShowButton navigation={navigation} />
      {modal}
      <Text
        style={{
          color: 'black',
          fontSize: 30,
          margin: 10,
          textAlign: 'center',
        }}>
        WYBIERZ PRODUKTY
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Btn name="Schowaj wszystkie" function={() => changeTabs(false)} />
        <Btn name="Rozwiń wszystkie" function={() => changeTabs(true)} />
      </View>
      <ScrollView>{listOfCategories}</ScrollView>
      <Btn name="Dodaj produkt" function={() => setWindow(!newProductWindow)} />
      <Btn name="Utwórz listę" function={() => createList()} />
    </SafeAreaView>
  );
}

export default SelectProductsScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#5a8196',
    borderRadius: 20,
    borderWidth: 2,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 20,
  },
});
