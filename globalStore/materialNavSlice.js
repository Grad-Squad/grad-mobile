import { createSlice } from '@reduxjs/toolkit';

export const materialNavSlice = createSlice({
  name: 'material',
  initialState: {
    mcqQuestions: [],
  },
  reducers: {
    setMCQQuestions: (state, action) => {
      state.mcqQuestions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMCQQuestions } = materialNavSlice.actions;

export default materialNavSlice.reducer;
