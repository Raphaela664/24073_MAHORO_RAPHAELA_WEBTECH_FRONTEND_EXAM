import { createSlice } from "@reduxjs/toolkit";

const AdminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    lecturers: 0,
    students: 0,
    assignments: 0,
    submissions: 0
  },
  reducers: {
    setDashboardData: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const { setDashboardData } = AdminDashboardSlice.actions;
export default AdminDashboardSlice.reducer;
