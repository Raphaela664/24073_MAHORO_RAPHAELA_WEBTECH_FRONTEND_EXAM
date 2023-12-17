import axios from "../../../utils/api";
import {
  updateAssignmentRequest,
  updateAssignmentSuccess,
  updateAssignmentFailure
} from "../../slices/lecturer/editAssignment";
import { toast } from "react-toastify";
import { fetchAssignments, fetchDraftAssignments } from "./getAllAssignment";

export const updateAssignment = (assignmentId, updatedData) => async (dispatch) => {
  try {
    dispatch(updateAssignmentRequest());

    const accessToken = JSON.parse(localStorage.getItem("access-token"));

    const response = await axios.patch(`/api/assignment/edit/${assignmentId}`, updatedData, {
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
    toast.error(`An error occurred while updating assignment: ${error.message}`);
    dispatch(updateAssignmentFailure(error.message));
  }
};

export const updateDraftAssignment = (assignmentId, updatedData) => async (dispatch) => {
  try {
    dispatch(updateAssignmentRequest());

    const accessToken = JSON.parse(localStorage.getItem("access-token"));

    const response = await axios.patch(`/api/assignment/edit/${assignmentId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 200) {
      toast.success(`Assignment updated successfully`);
      dispatch(updateAssignmentSuccess());
      dispatch(fetchDraftAssignments());
    } else {
      toast.error(`Failed to update assignment`);
      dispatch(updateAssignmentFailure("Failed to update assignment"));
      dispatch(fetchDraftAssignments());
    }
  } catch (error) {
    toast.error(`An error occurred while updating assignment: ${error.message}`);
    dispatch(updateAssignmentFailure(error.message));
  }
};
