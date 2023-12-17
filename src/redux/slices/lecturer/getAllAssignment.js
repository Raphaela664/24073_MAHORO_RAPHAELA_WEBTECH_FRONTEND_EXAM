import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
  sortBy: "createdAt",
  filteredAssignments: [],
  searchTerm: "",
  loading: true
};

const assignmentSlice = createSlice({
  name: "allAssignment",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
      state.filteredAssignments = action.payload;
      state.loading = false;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilteredAssignments: (state, action) => {
      state.filteredAssignments = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  }
});

export const { setAssignments, setSortBy, setFilteredAssignments, setSearchTerm, setLoading } =
  assignmentSlice.actions;

export default assignmentSlice.reducer;
