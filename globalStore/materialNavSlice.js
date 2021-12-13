import { createSlice } from '@reduxjs/toolkit';

export const materialNavSlice = createSlice({
  name: 'material',
  initialState: {
    openMaterialData: {
      title: '',
      data: [],
    },
    materialOwner: [],
  },
  reducers: {
    setOpenMaterialData: (state, action) => {
      state.openMaterialData = action.payload;
    },
    setMaterialOwner: (state, action) => {
      state.materialOwner = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenMaterialData, setMaterialOwner } =
  materialNavSlice.actions;

export default materialNavSlice.reducer;
