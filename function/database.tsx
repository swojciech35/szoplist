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

export const getUserLists = (userId: string) =>
  databaseConnect
    .ref(`/user/${userId}/list`)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });

export const getUserSharedLists = (userId: string) =>
  databaseConnect
    .ref(`/user/${userId}/sharedList`)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });

export const addNewList = (userId: string, listId: string, list: object) => {
  databaseConnect.ref(`/user/${userId}/list/${listId}`).set(list);
};

export const shareList = (userId: string, listId: string, list: object) => {
  databaseConnect.ref(`/user/${userId}/sharedList/${listId}`).set(list);
};

export const deleteList = (userId: string, listId: string) => {
  databaseConnect.ref(`/user/${userId}/list/${listId}`).remove();
};
export const deleteSharedList = (userId: string, listId: string) => {
  databaseConnect.ref(`/user/${userId}/sharedList/${listId}`).remove();
};
