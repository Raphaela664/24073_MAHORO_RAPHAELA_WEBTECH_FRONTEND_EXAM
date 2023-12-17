import axios from "../../../utils/api";
import {
  updateAssignmentRequest,
  updateAssignmentSuccess,
  updateAssignmentFailure
} from "../../slices/lecturer/editAssignment";
import { toast } from "react-toastify";
import { fetchAssignments } from "./getAllAssignment";

export const updateAssignment = (assignmentId, updatedData) => async (dispatch) => {
  try {
    dispatch(updateAssignmentRequest());

    const accessToken = JSON.parse(localStorage.getItem("access-token"));

    const response = await axios.post(`/api/assignment/add/student/${assignmentId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 200) {
      toast.success(`Assignment updated successfully`);
      dispatch(updateAssignmentSuccess());
      dispatch(fetchAssignments());
    } else {
      toast.error(`Failed to update assignment`);
      dispatch(updateAssignmentFailure("Failed to update assignment"));
    }
  } catch (error) {
    toast.error(`Failed to update assignment: ${error.message}`);
    dispatch(updateAssignmentFailure(error.message));
  }
};
