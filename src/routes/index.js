import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "../components/navBar";
import AdminStudent from "../pages/admin/adminStudent";
import AdminLecturer from "../pages/admin/adminLecturer";
import AdminDashboard from "../pages/admin/adminDashboard";
import AdminLogin from "../components/authentication/LoginForm";
import Notfound from "../components/404";
import ProtectedRoutes from "./PrivateRoute";
import StudentDashboard from "../pages/student/studentDashboard";
import GetAllAssignment from "../pages/lecturer/getAllAssignment";
import LecturerStudent from "../pages/lecturer/lecturerStudents";
import Submission from "../pages/lecturer/submission";
import StudentSubmission from "../pages/student/studentSubmission";
import StudentSingleAssignment from "../pages/student/sSingleAssignment";
import SingleAssignment from "../pages/lecturer/viewSingleAssignment";
import SingleSubmission from "../pages/lecturer/viewSingleSubmission";
import File from "../pages/lecturer/file";

const LayoutAdmin = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const LayoutLecturer = () => (
  <>
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "student",
        element: (
          <ProtectedRoutes>
            <AdminStudent />
          </ProtectedRoutes>
        )
      },
      {
        path: "lecturer",
        element: (
          <ProtectedRoutes>
            <AdminLecturer />
          </ProtectedRoutes>
        )
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <AdminDashboard />
          </ProtectedRoutes>
        )
      }
    ]
  },

  {
    path: "/lecturer",
    element: <LayoutLecturer />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <GetAllAssignment />
          </ProtectedRoutes>
        )
      },
      {
        path: "view-students",
        element: (
          <ProtectedRoutes>
            <LecturerStudent />
          </ProtectedRoutes>
        )
      },
      {
        path: "submission",
        element: (
          <ProtectedRoutes>
            <Submission />
          </ProtectedRoutes>
        )
      },
      {
        path: "assignment/:assignmentId",
        element: (
          <ProtectedRoutes>
            <SingleAssignment />
          </ProtectedRoutes>
        )
      },
      {
        path: "submission/:assignmentId",
        element: (
          <ProtectedRoutes>
            <SingleSubmission />
          </ProtectedRoutes>
        )
      },
      {
        path: "single/submission",
        element: <File />
      }
    ]
  },

  {
    path: "/student",
    element: <LayoutLecturer />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <StudentDashboard />
          </ProtectedRoutes>
        )
      },
      {
        path: "submission",
        element: (
          <ProtectedRoutes>
            <StudentSubmission />
          </ProtectedRoutes>
        )
      },
      {
        path: "single/assignment/:assignmentId",
        element: (
          <ProtectedRoutes>
            <StudentSingleAssignment />
          </ProtectedRoutes>
        )
      }
    ]
  },

  {
    path: "/",
    element: <AdminLogin />
  },
  
  {
    path: "/*",
    element: <Notfound />
  },

]);

export default router;
