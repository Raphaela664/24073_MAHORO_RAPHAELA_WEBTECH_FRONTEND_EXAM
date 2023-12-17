import { createSlice } from "@reduxjs/toolkit";

const deleteAssignmentSlice = createSlice({
  name: "deleteAssignment",
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setLoading } = deleteAssignmentSlice.actions;
export default deleteAssignmentSlice.reducer;
