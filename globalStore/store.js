import { configureStore } from '@reduxjs/toolkit';
import createPost from './createPostSlice';
import material from './materialNavSlice';
import imageUpload from './imageUploadSlice';
import profile from './profileSlice';

export const reducers = {
  createPost,
  material,
  imageUpload,
  profile,
};

export default configureStore({
  reducer: reducers,
});
