import {createSlice} from '@reduxjs/toolkit';
export const listSlice = createSlice({
  name: 'list',
  initialState: {
    listId: null,
    sharedListId: null,
    listData: null,
    sharedListData: null,
  },
  reducers: {
    setListId: (state, action) => {
      state.listId = action.payload;
    },
    setSharedListId: (state, action) => {
      state.sharedListId = action.payload;
    },
    setListData: (state, action) => {
      state.listData = action.payload;
    },
    setSharedListData: (state, action) => {
      state.sharedListData = action.payload;
    },
  },
});

export const {setListId, setSharedListId, setListData, setSharedListData} = listSlice.actions;
export default listSlice.reducer;
