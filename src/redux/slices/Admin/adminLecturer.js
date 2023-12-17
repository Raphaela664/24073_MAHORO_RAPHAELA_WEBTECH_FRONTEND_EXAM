import { createSlice } from "@reduxjs/toolkit";

const lecturerSlice = createSlice({
  name: "lecturer",
  initialState: {
    lecturers: [],
    isLoading: false
  },
  reducers: {
    setLecturers: (state, action) => {
      state.lecturers = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setLecturers, setIsLoading } = lecturerSlice.actions;
export default lecturerSlice.reducer;
