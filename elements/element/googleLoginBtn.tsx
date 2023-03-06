import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React from 'react';
import {setUser} from '../../redux/userSlice';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {storeData} from '../../function/async-storage';

function GoogleLoginBtn(): JSX.Element {
  const dispatch = useAppDispatch();
  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        dispatch(setUser(auth().currentUser));
        storeData('@User', auth().currentUser);
      });
  }
  return (
    <GoogleSigninButton
      style={{width: '55%', height: 48}}
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  );
}
export default GoogleLoginBtn;
