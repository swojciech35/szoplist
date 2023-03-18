import {createSlice} from '@reduxjs/toolkit';
export const listSlice = createSlice({
  name: 'list',
  initialState: {
    listId: null,
    sharedListId: null,
  },
  reducers: {
    setListId: (state, action) => {
      state.listId = action.payload;
    },
    setSharedListId: (state, action) => {
      state.sharedListId = action.payload;
    },
  },
});

export const {setListId, setSharedListId} = listSlice.actions;
export default listSlice.reducer;
