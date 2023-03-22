import {createSlice} from '@reduxjs/toolkit';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    friends: [{name: null, id: null}],
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addFriend: (state: any, action) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      const friendToRemove = action.payload;
      state.friends = state.friends.filter(friend => {
        return (
          friend.id !== friendToRemove.id || friend.name !== friendToRemove.name
        );
      });
    },
  },
});

export const {setUser, setFriends, addFriend, removeFriend} = userSlice.actions;
export default userSlice.reducer;
