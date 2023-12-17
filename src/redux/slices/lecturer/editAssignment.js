import { createSlice } from "@reduxjs/toolkit";

const assignmentUpdateSlice = createSlice({
  name: "assignmentUpdate",
  initialState: {
    loading: false,
    error: null
  },
  reducers: {
    updateAssignmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateAssignmentSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    updateAssignmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { updateAssignmentRequest, updateAssignmentSuccess, updateAssignmentFailure } =
  assignmentUpdateSlice.actions;

export default assignmentUpdateSlice.reducer;
