import {createSlice} from '@reduxjs/toolkit';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    friends: [],
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
  },
});

export const {setUser, setFriends, addFriend} = userSlice.actions;
export default userSlice.reducer;
