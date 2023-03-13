import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import internetReducer from './internetSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    internet:internetReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
