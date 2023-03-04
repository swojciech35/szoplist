import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './elements/HomeScreen';
import CreateShopList from './elements/CreateShopList';
import SelectProductsScreen from './elements/SelectProductsScreen';
import ShopList from './elements/ShopList';
import LoginScreen from './elements/LoginScreen';
import RegisterScreen from './elements/RegisterScreen';
import {setUser} from './redux/userSlice';
import {useAppSelector, useAppDispatch} from './hooks';
import {getData} from './function/async-storage';
const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    getData('@User').then(value => {
      dispatch(setUser(value));
    });
  }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Create New List" component={CreateShopList} />
        <Drawer.Screen
          name="Select products screen"
          component={SelectProductsScreen}
        />
        <Drawer.Screen name="Show List" component={ShopList} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Register" component={RegisterScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
