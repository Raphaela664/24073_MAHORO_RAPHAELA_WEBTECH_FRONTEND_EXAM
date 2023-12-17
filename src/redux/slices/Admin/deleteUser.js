import { createSlice } from "@reduxjs/toolkit";

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setLoading } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;
