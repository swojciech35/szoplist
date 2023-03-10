import {firebase} from '@react-native-firebase/database';

const databaseConnect = firebase
  .app()
  .database('https://szoplist-e9866-default-rtdb.firebaseio.com/');
export const addNewUserToDatabase = (
  id: string | undefined,
  email: string | undefined | null,
) => {
  databaseConnect.ref(`/user/${id}`).set({
    id: id,
    email: email,
  });
};

export const getUsers = () =>
  databaseConnect
    .ref('/user')
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });

export const getUserList = (userId: string) =>
  databaseConnect
    .ref(`/${userId}/list`)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });
