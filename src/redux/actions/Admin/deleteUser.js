/* eslint-disable no-console */
import { setLoading } from "../../slices/Admin/deleteUser";
import axios from "../../../utils/api";
import { toast } from "react-toastify";
import { fetchLecturers } from "./adminLecturer";
import { fetchStudents } from "./adminStudent";

export const deleteLecturer = async (dispatch, userId) => {
  try {
    dispatch(setLoading(true));

    const accessToken = JSON.parse(localStorage.getItem("access-token"));

    const response = await axios.delete(`/api/user/lecturers/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 204) {
      toast.success(`Lecturer deleted successfully`);
      dispatch(fetchLecturers());
    } else {
      toast.error(`Failed to delete Lecturer`);
      dispatch(fetchLecturers());
    }

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error("Error deleting Lecturer:", error);
  }
};

export const deleteStudent = async (dispatch, userId) => {
  try {
    dispatch(setLoading(true));

    const accessToken = JSON.parse(localStorage.getItem("access-token"));

    const response = await axios.delete(`/api/user/students/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 204) {
      toast.success(`Student deleted successfully`);
      dispatch(fetchStudents());
    } else {
      toast.error(`Failed to delete Student`);
      dispatch(fetchStudents());
    }

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error("Error deleting Student:", error);
  }
};
