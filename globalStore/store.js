import { configureStore } from '@reduxjs/toolkit';
import createPost from './createPostSlice';
import material from './materialNavSlice';
import profile from './profileSlice';
import search from './searchSlice';
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
    profile,
    forgotPassword,
    search,
  },
});
