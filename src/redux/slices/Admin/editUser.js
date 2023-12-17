import { createSlice } from "@reduxjs/toolkit";

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: {
    loading: false,
    error: null
  },
  reducers: {
    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { updateUserRequest, updateUserSuccess, updateUserFailure } = userUpdateSlice.actions;

export default userUpdateSlice.reducer;
