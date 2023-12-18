/* eslint-disable no-console */
import API from "../../../utils/api";

const GetSingleAssignment = async (assignment_id) => {
  try {
  

    const response = await API.get(`assignment/ViewSingleAssignment/${assignment_id}`);
   
    return response.data;
  } catch (error) {
 
    console.error(error);
    throw error;
  }
};

export default GetSingleAssignment;
