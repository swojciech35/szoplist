import {createSlice} from '@reduxjs/toolkit';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
