/* eslint-disable no-console */
import { setLoading } from "../../slices/lecturer/deleteAssignment";
import axios from "../../../utils/api";
import { toast } from "react-toastify";
import { fetchAssignments } from "../../actions/lecturer/getAllAssignment";

const deleteAssignmentAction = async (dispatch, assignment_id) => {
  try {
    dispatch(setLoading(true));
  
    const response = await axios.delete(`/assignment/deleteAssignment/${assignment_id}`);

    if (response.status === 200) {
      toast.success(`Assignment deleted successfully`);
      dispatch(fetchAssignments());
    } else {
      toast.error(`Failed to delete assignment`);
      dispatch(fetchAssignments());
    }

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error("Error deleting assignment:", error);
  }
};

export default deleteAssignmentAction;
