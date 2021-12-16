import { configureStore } from '@reduxjs/toolkit';
import createPost from './createPostSlice';
import material from './materialNavSlice';
import imageUpload from './imageUploadSlice';
import profile from './profileSlice';
import forgotPassword from './forgotPasswordSlice';

let storeEnhancers = [];

if (__DEV__) {
  const reactotron = require('../ReactotronConfig').default;
  reactotron.initiate();
  storeEnhancers = [...storeEnhancers, reactotron.createEnhancer()];
}

export default configureStore({
  enhancers: [...storeEnhancers],
  reducer: {
    createPost,
    material,
    imageUpload,
    profile,
    forgotPassword,
  },
});
