/* eslint-disable no-console */
import Axios from "../../../utils/api";
import {
  setAssignments,
  setFilteredAssignments,
  setLoading
} from "../../slices/lecturer/getAllAssignment";

export const fetchAssignments = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const lecturer_id = localStorage.getItem("id")
    const response = await Axios.get(`/assignment/getAssignments/${lecturer_id}`);

    const assignmentsData = response.data;

   

    dispatch(setAssignments(assignmentsData));
   
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
  }
};

export const fetchDraftAssignments = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const accessToken = JSON.parse(localStorage.getItem("access-token"));
    const response = await Axios.get("/api/assignment", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const assignmentsData = response.data.data;

    const filteredAssignments = assignmentsData.filter((assignment) => assignment.isDraft === true);

    dispatch(setAssignments(filteredAssignments));
    dispatch(setFilteredAssignments(filteredAssignments));
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
  }
};

export const fetchStudentAssignments = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const student_id = localStorage.getItem("id")
    const response = await Axios.get(`/invitation/getInvitations/${student_id}`);

    const assignmentsData = response.data;
    let assignments = [];
    for(let i=0; i< assignmentsData.length; i++){
      assignments.push(assignmentsData[0].assignment)
    }
 

    dispatch(setAssignments(assignments));
   
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
  }
};
