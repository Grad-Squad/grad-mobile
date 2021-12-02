import { createSlice } from '@reduxjs/toolkit';

export const materialNavSlice = createSlice({
  name: 'imageUpload',
  initialState: {
    imagesUploadQueue: [],
  },
  reducers: {
    alterImageInUploadQueue: (state, action) => {
      const newQueue = state.imagesUploadQueue.map((payload) =>
        payload?.payload?.key === action.payload?.key
          ? {
              payload: {
                ...payload.payload,
                file: {
                  uri: action.payload?.image.uri,
                  name: action.payload?.image.fileName,
                  type: 'image/jpeg',
                },
              },
            }
          : payload
      );
      state.imagesUploadQueue = newQueue;
    },
    removeLastXFromUploadQueue: (state, action) => {
      state.imagesUploadQueue = state.imagesUploadQueue.slice(
        0,
        state.imagesUploadQueue.length - action.payload
      );
    },
    removeImageFromUploadQueue: (state, action) => {
      state.imagesUploadQueue = state.imagesUploadQueue.filter(
        (payload) => payload?.payload?.key !== action.payload
      );
    },
    clearImageUploadQueue: (state) => {
      state.imagesUploadQueue = [];
    },
    addImageToUploadQueue: (state, action) => {
      state.imagesUploadQueue.append(action.payload);
    },
    popImageFromUploadQueue: (state) => {
      state.imagesUploadQueue = state.imagesUploadQueue.slice(1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMCQQuestions } = materialNavSlice.actions;

export default materialNavSlice.reducer;
