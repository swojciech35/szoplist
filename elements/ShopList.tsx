import { ShopListProps } from 'navTypes';
import {View, Text} from 'react-native';
function ShopList({route,navigation} : ShopListProps): JSX.Element {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>Selected Shop list screen</Text>
    </View>
  );
}
export default ShopList;
