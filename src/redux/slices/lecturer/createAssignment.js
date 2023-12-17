import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    title: "",
    deadline: "",
    assignment_description: ""
  },
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setIsCreatingPublish: (state, action) => {
      state.isCreatingPublish = action.payload;
    },
    setIsCreatingDraft: (state, action) => {
      state.isCreatingDraft = action.payload;
    }
  }
});

export const { setFormData, setIsCreatingPublish, setIsCreatingDraft } = assignmentSlice.actions;
export default assignmentSlice.reducer;
