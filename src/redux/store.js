import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/authSlice";
import customAlertReducer from "./slices/Admin/createAccount";
import lecturerReducer from "./slices/Admin/adminLecturer";
import StudentReducer from "./slices/Admin/adminStudent";
import dashboardReducer from "./slices/Admin/adminDashboard";
import LogoutReducer from "./slices/Logout";
import assignmentReducer from "./slices/lecturer/createAssignment";
import getAllAssignmentReducer from "./slices/lecturer/getAllAssignment";
import deleteAssignmentSlice from "./slices/lecturer/deleteAssignment";
import editAssignmentSlice from "./slices/lecturer/editAssignment";
import editUser from "./slices/Admin/editUser";
import deleteUser from "./slices/Admin/deleteUser";

const store = configureStore({
  reducer: {
    user: userSlice,
    customAlert: customAlertReducer,
    lecturer: lecturerReducer,
    student: StudentReducer,
    dashboard: dashboardReducer,
    logout: LogoutReducer,
    assignment: assignmentReducer,
    allAssignment: getAllAssignmentReducer,
    deleteAssignment: deleteAssignmentSlice,
    assignmentUpdate: editAssignmentSlice,
    userUpdate: editUser,
    userDelete: deleteUser
  }
});

export default store;
