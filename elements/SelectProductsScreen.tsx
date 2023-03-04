import { ReactElement, ReactNode, useEffect } from 'react';
import {View, Text, ScrollView, Modal, StyleSheet} from 'react-native';
import { useState } from 'react';
import { TextInput} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import CustomCheckbox from './CustomCheckbox';
function SelectProductsScreen(): JSX.Element {

     var allProducts = 
     [{category: "warzywa i owoce", products: [{name: "banany", checked: false},{name: "pomarańcze", checked: false},{name: "cytryna", checked: false},{name: "cebula", checked: false},{name: "jabłka", checked: false},{name: "ziemniaki", checked: false}]},
     {category: "nabiał",products: [{name: "jogurt", checked: false},{name: "masło", checked: false},{name: "śmietana", checked: false},{name: "ser", checked: false}]},{category: "mięso i wędliny",products: [{name: "kiełbasa", checked: false},{name: "wędlina", checked: false},{name: "parówki", checked: false},{name: "filet z kurczaka", checked: false},{name: "mięso mielone", checked: false}]},
     {category: "napoje",products: [{name: "sok", checked: false},{name: "woda niegazowana", checked: false},{name: "woda gazowana", checked: false},{name: "oranżada", checked: false},{name: "wino czerwone", checked: false},{name: "wino białe", checked: false}]},
     {category: "przekąski",products: [{name: "paluszki", checked: false},{name: "popcorn", checked: false},{name: "talarki", checked: false},{name: "herbatniki", checked: false},{name: "prażynki", checked: false}]},
{category:"inne", products: [{name:"zabawki", checked: false}]}];


const [openTabs,setTabs] = useState(new Array(allProducts.length).fill(false))
const [markedProducts, setMarked] = useState(new Array(allProducts.length).fill(null).map((item,index) => Array(allProducts[index].products.length).fill(false)))
const [list, setList] = useState(allProducts);
const [newProductWindow, setWindow] = useState(false);
const [newProductCategoryIndex, setCategoryIndex] = useState(0);
const [newProductName,setName] = useState("");

var listOfCategories = list.map((cat,catIndex) => (<View><TouchableOpacity style={{backgroundColor:'lightblue'}} onPress={() => toggleCategory(catIndex)}><Text style = {{fontSize: 20, fontWeight: 'bold'}}>{cat.category}</Text></TouchableOpacity>{openTabs[catIndex] ? (cat.products).map((prod, prodIndex) => (<View style={{flexDirection: 'row'}}><TouchableOpacity style={{flexDirection: 'row'}} onPress={() =>{markProduct(catIndex,prodIndex)}}><CustomCheckbox isChecked={markedProducts[catIndex][prodIndex]}/><Text> {prod.name}</Text></TouchableOpacity></View>)):null}</View>));

var namesOfCategories = list.map(x => x["category"]);

var menuOfCategories = namesOfCategories.map((cat, index) => (<TouchableOpacity style={{backgroundColor: index === newProductCategoryIndex ? 'lightgreen' : 'white'}} onPress={()=>{setCategoryIndex(index);;}}><Text> {cat}</Text></TouchableOpacity>))
var modal = (<Modal visible={newProductWindow} animationType="slide" transparent={true}><View style={styles.centeredView}><View style={styles.modalView}><Text>wprowadź dane produktu</Text><View style={{minWidth:'75%', display: 'flex', flexDirection:'row'}}><Text>Nazwa:</Text><TextInput value={newProductName} onChangeText={setName} style={{borderWidth: 2, borderColor: 'black'}}/></View><Text>Kategoria:</Text>{menuOfCategories}<TouchableOpacity onPress={()=>{setWindow(!newProductWindow); addProduct(newProductName, newProductCategoryIndex)}}><Text>dodaj produkt</Text></TouchableOpacity></View></View></Modal>
);

const toggleCategory = (index:Number) => {setTabs(check => check.map((item, idx) => idx === index ? !item : item))};
const markProduct = (catIndex:Number, prodIndex:Number) => {
setMarked(check  => check.map((itemC,indexC) => indexC === catIndex ? (check[indexC].map((itemP, indexP) => indexP === prodIndex ? !itemP : itemP)) : itemC))
}

const changeTabs = (ifOpen:boolean) => {setTabs(check => check.map(() => ifOpen))}

const addProduct = (name:string, catIndex:number) =>{
     let newProduct = {"name": name, checked:false};
     let newList = list;
     newList[catIndex].products.push(newProduct);
     setList(newList);

     let newMarked = markedProducts;
     markedProducts[catIndex].push(true);
     setMarked(newMarked);

     setCategoryIndex(0);
     setName("");
}

const createList = () =>{
let tmp = list;
console.log(tmp);
for (var i=list.length-1;i>=0;i--){

     for (var j=list[i].products.length-1;j>=0;j--){

          if(markedProducts[i][j]==false) 
          {
               tmp[i].products.splice(j,1);
          }
     }

     if (tmp[i].products.length == 0){
          tmp.splice(i,1);
     }
}
     console.log(tmp);
}

return (
<View>

{modal}    
 <TouchableOpacity onPress={() => changeTabs(false)}><Text>schowaj wszystkie</Text></TouchableOpacity>
     <TouchableOpacity onPress={() => changeTabs(true)}><Text>rozwiń wszystkie</Text></TouchableOpacity>
     <TouchableOpacity onPress={() => createList()}><Text>wyświetl liste</Text></TouchableOpacity>
     <TouchableOpacity onPress={() => setWindow(!newProductWindow)}><Text>dodaj produkt</Text></TouchableOpacity>
<ScrollView>
{listOfCategories}
</ScrollView>

</View>

)
}
export default SelectProductsScreen;

const styles = StyleSheet.create({
     centeredView: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 22,
     },
     modalView: {
       margin: 20,
       backgroundColor: 'white',
       borderRadius: 20,
       padding: 35,
       alignItems: 'center',
       shadowColor: '#000',
       shadowOffset: {
         width: 0,
         height: 2,
       },
     elevation:30}});