import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileId: 0,
  },
  reducers: {
    setProfileId: (state, action) => {
      state.profileId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileId } = profileSlice.actions;

export default profileSlice.reducer;
