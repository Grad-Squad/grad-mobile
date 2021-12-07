import { createSlice } from '@reduxjs/toolkit';

export const createPostSlice = createSlice({
  name: 'createPost',
  initialState: {
    materialList: [],
  },
  reducers: {
    clearMaterialList: (state) => {
      state.materialList = [];
    },
    setCreateMaterialItem: (state, action) => {
      state.materialList = action.payload;
    },
    addCreateMaterialItem: (state, action) => {
      state.materialList.unshift(action.payload);
    },
    replaceCreateMaterialItem: (state, action) => {
      state.materialList[action.payload.index] = action.payload.material;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearMaterialList,
  setCreateMaterialItem,
  addCreateMaterialItem,
  replaceCreateMaterialItem,
} = createPostSlice.actions;

export default createPostSlice.reducer;
