import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React from 'react';
import {setFriends, setUser} from '../../redux/userSlice';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {storeData} from '../../function/async-storage';
import {
  addNewUserToDatabase,
  getFriends,
  getList,
  getUserIdList,
} from 'function/database';
import Btn from './Btn';
import {addListData, setListId} from 'redux/listSlice';
import {getListFromDB} from 'function/getDataFromDB';
function GoogleLoginBtn({navigation}: any): JSX.Element {
  const dispatch = useAppDispatch();
  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth()
      .signInWithCredential(googleCredential)
      .then(result => {
        dispatch(setUser(auth().currentUser));
        storeData('@User', auth().currentUser);
        if (result.additionalUserInfo?.isNewUser) {
          addNewUserToDatabase(
            auth().currentUser?.uid,
            auth().currentUser?.email,
          );
        } else {
          getFriends(auth().currentUser?.uid).then(value => {
            dispatch(setFriends(value));
            storeData('@Friends', value);
          });
          getUserIdList(auth().currentUser?.uid).then(value => {
            dispatch(setListId(value));
            storeData('@ListId', value);
            dispatch(getListFromDB(value));
          });
        }

        navigation.navigate('Home');
      });
  }
  return (
    // <GoogleSigninButton
    //   style={{width: '55%', height: 48}}
    //   onPress={() =>
    //     onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
    //   }
    // />
    <Btn
      function={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
      name={'Zaloguj się z Google'}
      minWidth={'65%'}
      googleLogo={true}
    />
  );
}
export default GoogleLoginBtn;
