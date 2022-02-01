import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    params: {},
  },
  reducers: {
    setParam: (state, action) => {
      state.params[action.payload.key] = action.payload.value;
    },
    removeParam: (state, action) => {
      delete state.params[action.payload];
    },
    resetSearchParams: (state) => {
      state.params = {};
    },
  },
});

export const { setParam, removeParam, resetSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
