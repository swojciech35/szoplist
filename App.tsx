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
import SplashScreen from 'react-native-splash-screen';
import {RootStackParamList} from 'navTypes';
import {checkInternetConnection} from 'function/internet';

const Drawer = createDrawerNavigator<RootStackParamList>();


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(checkInternetConnection());
    SplashScreen.hide();
    getData('@User').then(value => {
      dispatch(setUser(value));
    });
  }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />

        <Drawer.Screen
          options={{unmountOnBlur: true}}
          name="Create New List"
          component={CreateShopList}
          initialParams={{list: []}}
        />
        <Drawer.Screen
          options={{unmountOnBlur: true}}
          name="Select products screen"
          component={SelectProductsScreen}
          initialParams={{list: []}}

        />
        <Drawer.Screen name="Show List" component={ShopList} />
        <Drawer.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
        <Drawer.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
