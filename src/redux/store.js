import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { postsReducer } from './postsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
