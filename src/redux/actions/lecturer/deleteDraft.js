/* eslint-disable no-console */
import { setLoading } from "../../slices/lecturer/deleteAssignment";
import axios from "../../../utils/api";
import { toast } from "react-toastify";
import { fetchDraftAssignments } from "../../actions/lecturer/getAllAssignment";

const deleteAssignmentAction = async (dispatch, assignmentId) => {
  try {
    dispatch(setLoading(true));

    const accessToken = JSON.parse(localStorage.getItem("access-token"));

    const response = await axios.delete(`/api/assignment/delete/${assignmentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 200) {
      toast.success(`Assignment deleted successfully`);
      dispatch(fetchDraftAssignments());
    } else {
      toast.error(`Failed to delete assignment`);
      dispatch(fetchDraftAssignments());
    }

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error("Error deleting assignment:", error);
  }
};

export default deleteAssignmentAction;
