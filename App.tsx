import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {setFriends, setUser} from './redux/userSlice';
import {useAppSelector, useAppDispatch} from './hooks';
import {getData} from './function/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {RootStackParamList} from 'navTypes';
import {checkInternetConnection} from 'function/internet';
import CustomDrawer from 'elements/drawer/CustomDrawer';
import { ScreenArray } from './elements/drawer/arrays';

const Drawer = createDrawerNavigator<RootStackParamList>();

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setFriends([{name:"szop1",id:1},{name:"szop2",id:2},{name:"szop3",id:3},{name:"szop4",id:4},{name:"szop5",id:5},{name:"szop6",id:6}]));
    dispatch(checkInternetConnection());
    SplashScreen.hide();
    getData('@User').then(value => {
      dispatch(setUser(value));
    });
  }, []);
  return (
    <NavigationContainer>


      <Drawer.Navigator
      screenOptions={{drawerStyle:{width:260,paddingLeft:10,backgroundColor:'transparent'}}}
      initialRouteName="Home" drawerContent={(props)=><CustomDrawer {...props}/>
    
    }>
      {ScreenArray.map((screen,i)=>(
        <Drawer.Screen key={i} name={screen.route}  component={screen.component} initialParams={screen.initialParams}
        options={{item:screen,unmountOnBlur:screen.unmountOnBlur,headerShown:screen.headerShown}}/>
      ))}
             </Drawer.Navigator>


    </NavigationContainer>
  );
}

export default App;
