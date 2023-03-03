import {View, Text, ToastAndroid} from 'react-native';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {TextInput} from 'react-native-element-textinput';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
function LoginScreen(): JSX.Element {
  const [usr, setUsr] = React.useState<any>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    setUsr(auth().currentUser);

    return auth().signInWithCredential(googleCredential);
  }

  async function emailLogin() {
    if (email.length > 0 && password.length > 0) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User login succesfull');
          setUsr(auth().currentUser);
          ToastAndroid.show('Zalogowano pomyślnie', ToastAndroid.SHORT);
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

  function signOut() {
    if (usr != null) {
      auth()
        .signOut()
        .then(() => {
          setUsr(null);
          console.log('User signed out!');
        });
    }
  }

  return (
    <>
      <View style={{alignItems: 'center', margin: 40}}>
        <Text style={{color: 'black', fontSize: 50}}>ZALOGUJ SIĘ</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <TextInput
          style={{
            flex: 1,
            maxHeight: 80,
            minHeight: 65,
            margin: 20,
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
            margin: 20,
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
            onPress={() => emailLogin()}>
            Zaloguj się
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'black', margin: 20}}>LUB</Text>
        <GoogleSigninButton
          style={{width: '55%', height: 48}}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
        <Button title="User data" onPress={() => console.log(usr)} />
        <Button title="Wyloguj" onPress={() => signOut()} />
      </View>
    </>
  );
}
export default LoginScreen;
