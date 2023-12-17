import { createSlice } from "@reduxjs/toolkit";

const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setLoading } = logoutSlice.actions;
export default logoutSlice.reducer;
