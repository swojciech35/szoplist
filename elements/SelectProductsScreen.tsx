import { ReactElement, ReactNode, useEffect } from 'react';
import {View, Text, ScrollView} from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomCheckbox from './CustomCheckbox';
import { FlipInEasyX } from 'react-native-reanimated';
function SelectProductsScreen(): JSX.Element {

     var allProducts = 
     [{category: "warzywa i owoce", products: [{name: "banany", checked: false},{name: "pomarańcze", checked: false},{name: "cytryna", checked: false},{name: "cebula", checked: false},{name: "jabłka", checked: false},{name: "ziemniaki", checked: false}]},
     {category: "nabiał",products: [{name: "jogurt", checked: false},{name: "masło", checked: false},{name: "śmietana", checked: false},{name: "ser", checked: false}]},{category: "mięso i wędliny",products: [{name: "banany", checked: false},{name: "kiełbasa", checked: false},{name: "wędlina", checked: false},{name: "parówki", checked: false},{name: "filet z kurczaka", checked: false},{name: "mięso mielone", checked: false}]},
     {category: "napoje",products: [{name: "sok", checked: false},{name: "woda niegazowana", checked: false},{name: "woda gazowana", checked: false},{name: "oranżada", checked: false},{name: "wino czerwone", checked: false},{name: "wino białe", checked: false}]},
     {category: "przekąski",products: [{name: "paluszki", checked: false},{name: "popcorn", checked: false},{name: "talarki", checked: false},{name: "herbatniki", checked: false},{name: "prażynki", checked: false}]},
{category:"inne", products: [{name:"zabawki", checked: false}]}];


const [openTabs,setTabs] = useState(new Array(allProducts.length).fill(false))
const [markedProducts, setMarked] = useState(new Array(allProducts.length).fill(null).map((item,index) => Array(allProducts[index].products.length).fill(false)))
const [list, setList] = useState(allProducts);

var listOfCategories = list.map((cat,catIndex) => (<View><TouchableOpacity style={{backgroundColor:'lightblue'}} onPress={() => toggleCategory(catIndex)}><Text style = {{fontSize: 20, fontWeight: 'bold'}}>{cat.category}</Text></TouchableOpacity>{openTabs[catIndex] ? (cat.products).map((prod, prodIndex) => (<View style={{flexDirection: 'row'}}><TouchableOpacity style={{flexDirection: 'row'}} onPress={() =>{markProduct(catIndex,prodIndex)}}><CustomCheckbox isChecked={markedProducts[catIndex][prodIndex]}/><Text> {prod.name}</Text></TouchableOpacity></View>)):null}</View>));


const toggleCategory = (index:Number) => {setTabs(check => check.map((item, idx) => idx === index ? !item : item))};
const markProduct = (catIndex:Number, prodIndex:Number) => {
setMarked(check  => check.map((itemC,indexC) => indexC === catIndex ? (check[indexC].map((itemP, indexP) => indexP === prodIndex ? !itemP : itemP)) : itemC))
}

const changeTabs = (ifOpen:boolean) => {setTabs(check => check.map(() => ifOpen))}

const createList = () =>{

let tmp = list;

console.log(tmp);

for (var i=list.length-1;i>=0;i--){

     console.log("jestem na ",i," z ", list.length )
     for (var j=list[i].products.length-1;j>=0;j--){

          console.log("jestem na ",i," ",j," z ", list[i].products.length )
          if(markedProducts[i][j]==false) 
          {
               tmp[i].products.splice(j,1);
             //  console.log("usuwa sie z ",i," ",j)
          }
     }

     if (tmp[i].products.length == 0){
          tmp.splice(i,1);
     }
}

     // console.log(list)
     
     // tmp[0].products.splice(1,1);
     console.log(tmp);
}

return (
<View>
     <TouchableOpacity onPress={() => changeTabs(false)}><Text>schowaj wszystkie</Text></TouchableOpacity>
     <TouchableOpacity onPress={() => changeTabs(true)}><Text>rozwiń wszystkie</Text></TouchableOpacity>
     <TouchableOpacity onPress={() => createList()}><Text>wyświetl liste</Text></TouchableOpacity>
<ScrollView>
{listOfCategories}
</ScrollView>

</View>

)
}
export default SelectProductsScreen;
