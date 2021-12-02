import { configureStore } from '@reduxjs/toolkit';
import createPost from './createPostSlice';

export default configureStore({
  reducer: {
    createPost,
  },
});
