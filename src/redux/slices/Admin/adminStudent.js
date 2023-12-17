import { createSlice } from "@reduxjs/toolkit";

const StudentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    isLoading: false,
    sortOption: "student_id"
  },
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    }
  }
});

export const { setStudents, setIsLoading, setSortOption } = StudentSlice.actions;
export default StudentSlice.reducer;
