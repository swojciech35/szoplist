import {createSlice} from '@reduxjs/toolkit';
export const listSlice = createSlice({
  name: 'list',
  initialState: {
    listId: null,
  },
  reducers: {
    setListId: (state, action) => {
      state.listId = action.payload;
    },
  },
});

export const {setListId} = listSlice.actions;
export default listSlice.reducer;
