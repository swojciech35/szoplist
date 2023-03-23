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

export const addNewList = (listId: string, list: object) => {
  databaseConnect.ref(`/list/${listId}`).set(list);
};

export const getists = () =>
  databaseConnect
    .ref(`/list`)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });

export const getList = (id: string) =>
  databaseConnect
    .ref(`/list/${id}`)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });

export const deleteList = (id: string) => {
  databaseConnect.ref(`/list/${id}`).remove();
};

export const addListIdToUser = (userId: string, listId: string) => {
  databaseConnect.ref(`/user/${userId}/list/${listId}`).set({id: listId});
};

export const getUserIdList = (id: string | undefined) =>
  databaseConnect
    .ref(`/user/${id}/list`)
    .once('value')
    .then(snapshot => {
      return snapshot.val() != null ? Object.values(snapshot.val()) : [];
    });

export const addListIdToShareUser = (userId: string, listId: string) => {
  databaseConnect.ref(`/user/${userId}/sharedlist/${listId}`).set({id: listId});
};

export const getUsersharedIdList = (id: string) =>
  databaseConnect
    .ref(`/user/${id}/sharedlist`)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });

export const deleteSharedList = (userId: string, listId: string) => {
  databaseConnect.ref(`/user/${userId}/sharedlist/${listId}`).remove();
};

export const deleteListIdUser = (userId: string, listId: string) => {
  databaseConnect.ref(`/user/${userId}/list/${listId}`).remove();
};

export const addFriendToDatabase = (
  userId: string,
  friendId: string,
  friend: object,
) => {
  databaseConnect.ref(`/user/${userId}/friends/${friendId}`).set(friend);
};
export const deleteFriend = (userId: string, friendId: string) => {
  console.log(userId);
  console.log(friendId);
  databaseConnect.ref(`/user/${userId}/friends/${friendId}`).remove();
};

export const getFriends = (id: string | undefined) =>
  databaseConnect
    .ref(`/user/${id}/friends`)
    .once('value')
    .then(snapshot => {
      return snapshot.val() != null ? Object.values(snapshot.val()) : [];
    });
