import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    params: {},
    paramsText: {},
  },
  reducers: {
    setParam: (state, action) => {
      state.params[action.payload.key] = action.payload.value;
      state.paramsText[action.payload.key] = action.payload.choice;
    },
    removeParam: (state, action) => {
      delete state.params[action.payload];
      delete state.paramsText[action.payload];
    },
    resetSearchParams: (state) => {
      state.params = {};
      state.paramsText = {};
    },
  },
});

export const { setParam, removeParam, resetSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
