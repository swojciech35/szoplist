import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TextInput} from 'react-native-element-textinput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setUser} from '../redux/userSlice';
import {useAppSelector, useAppDispatch} from '../hooks';
import {storeData} from '../function/async-storage';
import GoogleLoginBtn from './element/googleLoginBtn';
function RegisterScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');

  async function emailAddUserAndLogin() {
    if (password === passwordRepeat) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          dispatch(setUser(auth().currentUser));
          storeData('@User', auth().currentUser);
          ToastAndroid.show('Zarejestrowano i zalogowano', ToastAndroid.SHORT);
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
      ToastAndroid.show('Hasła się różnią', ToastAndroid.SHORT);
    }
  }
  return (
    <>
      <KeyboardAwareScrollView>
        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{color: 'black', fontSize: 40}}>REJESTRACJA</Text>
        </View>
        <View>
          <TextInput
            style={{
              flex: 1,
              maxHeight: 80,
              minHeight: 65,
              marginTop: 15,
              marginLeft: 20,
              marginRight: 20,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#000000',
            }}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            label="Email"
            labelStyle={{color: 'black'}}
            placeholderStyle={{color: 'gray'}}
          />
          <TextInput
            style={{
              flex: 1,
              maxHeight: 80,
              minHeight: 65,
              marginTop: 15,
              marginLeft: 20,
              marginRight: 20,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#000000',
            }}
            placeholder="Hasło"
            onChangeText={setPassword}
            value={password}
            mode="password"
            label="Hasło"
            labelStyle={{color: 'black'}}
            placeholderStyle={{color: 'gray'}}
          />
          <TextInput
            style={{
              flex: 1,
              maxHeight: 80,
              minHeight: 65,
              marginTop: 15,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#000000',
            }}
            placeholder="Hasło"
            onChangeText={setPasswordRepeat}
            value={passwordRepeat}
            mode="password"
            label="Hasło"
            labelStyle={{color: 'black'}}
            placeholderStyle={{color: 'gray'}}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={{flex: 2, alignItems: 'center', display: 'flex'}}>
        <TouchableOpacity
          style={{
            display: 'flex',
            borderWidth: 2,
            borderRadius: 8,
            padding: 5,
            minWidth: '55%',
          }}>
          <Text
            style={{fontSize: 20, color: 'black', textAlign: 'center'}}
            onPress={() => emailAddUserAndLogin()}>
            Zarejestruj się
          </Text>
        </TouchableOpacity>
        <GoogleLoginBtn/>
      </View>
    </>
  );
}
export default RegisterScreen;
