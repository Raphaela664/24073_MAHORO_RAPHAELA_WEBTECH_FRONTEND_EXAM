/* eslint-disable no-console */
import API from "../../utils/api";
import { toast } from "react-toastify";
import {
  updateStart,
  updateSuccess,
  clearSuccessCondition,
  updateError,
  clearError,
  updateAccessToken
} from "../slices/authSlice";

export const login = async (authData, dispatch, navigate, setAuthData) => {
  dispatch(updateStart());
  try {
    const res = await API.post("Authentication/login", authData);
    console.log(res)
    dispatch(updateSuccess(res.data));
    // toast.success("Login successful");

    dispatch(clearSuccessCondition());
    setAuthData({
      email: "",
      password: ""
    });

    if (res.data.role === "ADMIN") {
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("id", res.data.admin_id);
      navigate("/admin/dashboard");
    }
    if (res.data.role === "LECTURER") {
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("id", res.data.lecturer_id);
      navigate("/lecturer/dashboard");
    }
    if (res.data.role === "STUDENT") {
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("id", res.data.student_id);
      navigate("/student/dashboard");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch(updateError(error.response.data.message));
    } else if (error.message === "Network Error") {
      toast.error(error.message);
      dispatch(clearError());
    } else {
      console.log(error)
      toast.error(error.message)
      dispatch(updateError("An error occurred."));
    }

    setTimeout(() => {
      dispatch(clearError());
    }, [3000]);
  }
};

