/* eslint-disable no-console */
import API from "../../../utils/api";

const GetSingleAssignment = async (assignmentId) => {
  try {
  

    const response = await API.get(`assignment/viewSingleAssignment/${assignmentId}`);
    console.log(response)
    return response;
  } catch (error) {
 
    console.error(error);
    throw error;
  }
};

export default GetSingleAssignment;
