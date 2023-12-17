import axios from "../../../utils/api";
import {
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure
} from "../../slices/Admin/editUser";
import { toast } from "react-toastify";
import { fetchLecturers } from "./adminLecturer";
import { fetchStudents } from "./adminStudent";

export const updateLecturer = (userId, updatedData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());

    const accessToken = JSON.parse(localStorage.getItem("access-token"));

    const response = await axios.patch(`/api/user/lecturers/update/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 200) {
      toast.success(`Lecturer updated successfully`);
      dispatch(updateUserSuccess());
      dispatch(fetchLecturers());
    } else {
      toast.error(`Failed to Update Lecturer`);
      dispatch(updateUserFailure("Failed to update Lecturer"));
    }
  } catch (error) {
    toast.error("An error occurred while updating Lecturer");
    dispatch(updateUserFailure(error.message));
  }
};

export const updateStudent = (userId, updatedData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());

    const accessToken = JSON.parse(localStorage.getItem("access-token"));

    const response = await axios.patch(`/api/user/students/update/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 200) {
      toast.success(`Student updated successfully`);
      dispatch(updateUserSuccess());
      dispatch(fetchStudents());
    } else {
      toast.error(`Failed to update Student`);
      dispatch(updateUserFailure("Failed to update Student"));
      dispatch(fetchStudents());
    }
  } catch (error) {
    toast.error("An error occurred while updating Student");
    dispatch(updateUserFailure(error.message));
  }
};
