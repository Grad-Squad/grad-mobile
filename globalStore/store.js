import { configureStore } from '@reduxjs/toolkit';
import createPost from './createPostSlice';
import material from './materialNavSlice';

export default configureStore({
  reducer: {
    createPost,
    material,
  },
});
