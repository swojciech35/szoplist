import {View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { RouteProp } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CreateShopListProps } from 'navTypes';


function CreateShopList({route,navigation} : CreateShopListProps): JSX.Element {

console.log(route.params.list);



    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'black'}}>Create Shop List Screen</Text>
       <Text>{(route.params.list).toString()}</Text>
      </View>
    );
  }
  export default CreateShopList;