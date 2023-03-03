import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './elements/HomeScreen';
import CreateShopList from './elements/CreateShopList';
import SelectProductsScreen from './elements/SelectProductsScreen';
import ShopList from './elements/ShopList';
import LoginScreen from './elements/LoginScreen';
import RegisterScreen from './elements/RegisterScreen';
import store from './redux/store';
import {Provider} from 'react-redux';
const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
