import { ReactElement, ReactNode, useEffect } from 'react';
import {View, Text, ScrollView, Modal, StyleSheet} from 'react-native';
import { useState } from 'react';
import { TextInput} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import CustomCheckbox from './CustomCheckbox';
import allProducts from './allProducts';
import { SelectProductsScreenProps } from 'navTypes';

function SelectProductsScreen({route,navigation} : SelectProductsScreenProps): JSX.Element {

var previousList = (route.params.list);


var listWithProducts = allProducts();

console.log("dzieje sie");

const [list, setList] = useState(listWithProducts);   
const [openTabs,setTabs] = useState(new Array(list.length).fill(false))
const [markedProducts, setMarked] = useState(new Array(list.length).fill(null).map((item,index) => Array(list[index].products.length).fill(false)))
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

useEffect(()=>
{
if (previousList != null){
list.map((defaultCategory,index) => {previousList.map((previousListCategory) => {if (defaultCategory.category === previousListCategory.category){
     for (var i=0;i<previousListCategory.products.length;i++){
          for (var j=0;j<defaultCategory.products.length;j++){
               if (previousListCategory.products[i].name === defaultCategory.products[j].name){
                    markProduct(index,j)
                    break;
               }

               if (j == defaultCategory.products.length - 1){
addProduct(previousListCategory.products[i].name, index);
               }
               
          }
     }
}})})}
},[])


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
     console.log(tmp[0].products);
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