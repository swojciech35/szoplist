import {View, Text} from 'react-native';
import {Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React from 'react';
function LoginScreen(): JSX.Element {
  const [usr, setUsr] = React.useState<any>(null);
  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    setUsr(auth().currentUser);

    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>Login screen</Text>
      <GoogleSigninButton
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
      />
      <Button title="User data" onPress={() => console.log(usr)} />
    </View>
  );
}
export default LoginScreen;
