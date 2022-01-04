import { createSlice } from '@reduxjs/toolkit';

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    email: '',
    token: '',
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setEmail, setToken } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
