import React from 'react';
import {View, Text, ToastAndroid, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {setUser} from '../redux/userSlice';
import {useAppSelector, useAppDispatch} from '../hooks';
import {storeData} from '../function/async-storage';
import GoogleLoginBtn from './element/googleLoginBtn';
import {addNewUserToDatabase} from 'function/database';
import CustomTextInput from './element/CustomTextInput';
import Btn from './element/Btn';
import DrawerShowButton from './element/DrawerShowButton';
function RegisterScreen({navigation}: any): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');

  async function emailAddUserAndLogin() {
    if (
      password === passwordRepeat &&
      email.length > 0 &&
      password.length > 0 &&
      passwordRepeat.length > 0
    ) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          dispatch(setUser(auth().currentUser));
          storeData('@User', auth().currentUser);
          addNewUserToDatabase(
            auth().currentUser?.uid,
            auth().currentUser?.email,
          );
          ToastAndroid.show('Zarejestrowano i zalogowano', ToastAndroid.SHORT);
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            ToastAndroid.show('Adres email jest zajęty!', ToastAndroid.SHORT);
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            ToastAndroid.show(
              'Adres email jest niepoprawny!',
              ToastAndroid.SHORT,
            );
          }
          if (error.code === 'auth/weak-password') {
            console.log('weak-password');
            ToastAndroid.show(
              'Hasło musi mieć minimum 6 znaków',
              ToastAndroid.SHORT,
            );
          }

          console.error(error);
        });
    } else {
      ToastAndroid.show('Sprawdź dane do rejestracji', ToastAndroid.SHORT);
    }
  }
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
      <DrawerShowButton navigation={navigation}/>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontSize: 40}}>ZAREJESTRUJ SIĘ</Text>

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

          <CustomTextInput
            placeholder="Hasło"
            onChangeText={setPasswordRepeat}
            value={passwordRepeat}
            mode="password"
            label="Hasło"
          />
          <Btn
            name={'Zarejestruj się'}
            function={() => emailAddUserAndLogin()}
            minWidth={'65%'}
          />

          <Text style={{fontSize: 20, color: 'black', margin: 20}}>
            Masz już konto?
          </Text>

          <Btn
            name={'Zaloguj się'}
            function={() => navigation.navigate('Login')}
            minWidth={'65%'}
          />
          <GoogleLoginBtn navigation={navigation} />
        </View>
      </SafeAreaView>
    </>
  );
}
export default RegisterScreen;
