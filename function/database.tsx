import {firebase} from '@react-native-firebase/database';

export const addNewUserToDatabase = (
  id: string | undefined,
  email: string | undefined | null,
) => {
  firebase
    .app()
    .database('https://szoplist-e9866-default-rtdb.firebaseio.com/')
    .ref(`/user/${id}`)
    .set({
      id: id,
      email: email,
    });
};
