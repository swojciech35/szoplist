import {createSlice} from '@reduxjs/toolkit';
export const listSlice = createSlice({
  name: 'list',
  initialState: {
    listId: [],
    sharedListId: [],
    listData: [],
    sharedListData: [],
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
    addListId: (state: any, action) => {
      state.listId.push(action.payload);
    },
    addListData: (state: any, action) => {
      state.listData.push(action.payload);
    },
  },
});

export const {
  setListId,
  setSharedListId,
  setListData,
  setSharedListData,
  addListId,
  addListData,
} = listSlice.actions;
export default listSlice.reducer;
