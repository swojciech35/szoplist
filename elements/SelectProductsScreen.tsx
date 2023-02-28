import { ReactElement, ReactNode } from 'react';
import {View, Text, ScrollView} from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
function SelectProductsScreen(): JSX.Element {

     var allProducts = 
     [{category: "warzywa i owoce", products: [{name: "banany", checked: false},{name: "poamarańcze", checked: false},{name: "cytryna", checked: false},{name: "cebula", checked: false},{name: "jabłka", checked: false},{name: "ziemniaki", checked: false}]},
     {category: "nabiał",products: [{name: "jogurt", checked: false},{name: "masło", checked: false},{name: "śmietana", checked: false},{name: "ser", checked: false}]},{category: "mięso i wędliny",products: [{name: "banany", checked: false},{name: "kiełbasa", checked: false},{name: "wędlina", checked: false},{name: "parówki", checked: false},{name: "filet z kurczaka", checked: false},{name: "mięso mielone", checked: false}]},
     {category: "napoje",products: [{name: "sok", checked: false},{name: "woda niegazowana", checked: false},{name: "woda gazowana", checked: false},{name: "oranżada", checked: false},{name: "wino czerwone", checked: false},{name: "wino białe", checked: false}]},
     {category: "przekąski",products: [{name: "paluszki", checked: false},{name: "popcorn", checked: false},{name: "talarki", checked: false},{name: "herbatniki", checked: false},{name: "prażynki", checked: false},{name: "ziemniaki", checked: false}]}];

const [isOpen, setOpen] = useState(false);

var listOfCategories = allProducts.map((cat) => (<View><TouchableOpacity onPress={() => setOpen(!isOpen)}><Text style = {{fontSize: 20, fontWeight: 'bold'}}>{cat.category}</Text></TouchableOpacity>{isOpen ? (cat.products).map((prod) => (<View style={{flexDirection: 'row'}}><Text>{prod.name}</Text></View>)):null}</View>));


return (

<ScrollView>
{listOfCategories}
</ScrollView>

)
}
export default SelectProductsScreen;
