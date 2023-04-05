import {createSlice} from '@reduxjs/toolkit';
export const listSlice = createSlice({
  name: 'list',
  initialState: {
    listId: [],
    sharedListId: null,
    listData: [],
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
  addListData,
} = listSlice.actions;
export default listSlice.reducer;
