import { createSlice } from '@reduxjs/toolkit';

export const materialNavSlice = createSlice({
  name: 'material',
  initialState: {
    openMaterialData: [],
  },
  reducers: {
    setOpenMaterialData: (state, action) => {
      state.openMaterialData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenMaterialData } = materialNavSlice.actions;

export default materialNavSlice.reducer;
