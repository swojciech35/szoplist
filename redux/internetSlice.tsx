import {createSlice} from '@reduxjs/toolkit';
export const internetSlice = createSlice({
  name: 'internet',
  initialState: {
    internetConnection: null,
  },
  reducers: {
    setInternetConnection: (state, action) => {
      state.internetConnection = action.payload;
    },
  },
});

export const {setInternetConnection} = internetSlice.actions;
export default internetSlice.reducer;
