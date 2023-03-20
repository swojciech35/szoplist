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
  },
});

export const {setUser, setFriends} = userSlice.actions;
export default userSlice.reducer;
