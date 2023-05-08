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
      let index = state.listId.findIndex(
        value => value.id == action.payload.id,
      );
      if (index == -1) {
        state.listId.push(action.payload);
      }
    },
    addListData: (state: any, action) => {
      let index = state.listData.findIndex(
        value => value.id == action.payload.id,
      );

      if (index == -1) {
        state.listData.push(action.payload);
      } else {
        state.listData[index] = action.payload;
      }
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
