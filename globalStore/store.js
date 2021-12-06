import { configureStore } from '@reduxjs/toolkit';
import createPost from './createPostSlice';
import material from './materialNavSlice';
import imageUpload from './imageUploadSlice';
import profile from './profileSlice';

export default configureStore({
  reducer: {
    createPost,
    material,
    imageUpload,
    profile,
  },
});
