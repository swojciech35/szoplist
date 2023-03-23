import {View, Text, ToastAndroid, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {setFriends, setUser} from '../redux/userSlice';
import {useAppSelector, useAppDispatch} from '../hooks';
import {storeData} from '../function/async-storage';
import GoogleLoginBtn from './element/googleLoginBtn';
import Btn from './element/Btn';
import CustomTextInput from './element/CustomTextInput';
import DrawerShowButton from './element/DrawerShowButton';
import {getFriends, getUserIdList} from 'function/database';
import {setListId} from 'redux/listSlice';
function LoginScreen({navigation}: any): JSX.Element {
  const usr = useAppSelector(state => state.user.userData);
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function emailLogin() {
    if (email.length > 0 && password.length > 0) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User login succesfull');
          dispatch(setUser(auth().currentUser));
          storeData('@User', auth().currentUser);
          getFriends(auth().currentUser?.uid).then(value => {
            dispatch(setFriends(value));
            storeData('@Friends', value);
          });
          getUserIdList(auth().currentUser?.uid).then(value => {
            dispatch(setListId(value));
            storeData('@ListId', value);
          });
          ToastAndroid.show('Zalogowano pomyślnie', ToastAndroid.SHORT);
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            console.log('user is not exist');
            ToastAndroid.show(
              'Niepoprawne dane logowania sprawdź adres email i hasło ',
              ToastAndroid.SHORT,
            );
          }

          if (error.code === 'auth/wrong-password') {
            console.log('wrong password');
            ToastAndroid.show(
              'Niepoprawne dane logowania sprawdź adres email i hasło',
              ToastAndroid.SHORT,
            );
          }
          if (error.code === 'auth/invalid-email') {
            console.log('invalid-email');
            ToastAndroid.show(
              'Niepoprawny format adresu Email',
              ToastAndroid.SHORT,
            );
          }

          console.error(error);
        });
    } else {
      ToastAndroid.show('Podaj dane do logowania', ToastAndroid.SHORT);
    }
  }

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
        <View>
          <DrawerShowButton navigation={navigation} />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontSize: 50}}>ZALOGUJ SIĘ</Text>
          <CustomTextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            label="Email"
          />
          <CustomTextInput
            placeholder="Hasło"
            onChangeText={setPassword}
            value={password}
            mode="password"
            label="Hasło"
          />
          <Btn
            name={'Zaloguj się'}
            function={() => emailLogin()}
            minWidth={'65%'}
          />
          <GoogleLoginBtn navigation={navigation} />
          <Text style={{fontSize: 20, color: 'black', margin: 20}}>LUB</Text>
          <Btn
            name={'Zarejestruj się'}
            function={() => navigation.navigate('Register')}
            minWidth={'65%'}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
export default LoginScreen;
