import axios from "../../../utils/api";
import { toast } from "react-toastify";
import { closeAlert } from "../../slices/Admin/createAccount";

export const createUser = (userData) => async (dispatch) => {
  try {
  

      let response
   
      if(userData.role=="STUDENT"){
         response = await axios.post("/student/saveStudent", userData);
      }
      if(userData.role=="LECTURER"){
         response = await axios.post("/lecturer/saveLecturer", userData);
      }


      if (response.status === 201) {
        toast.success("User created successfully", { autoClose: 4000 });
        dispatch(closeAlert());
      }
    
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.error("User already exists");
    } else {
      toast.error("Error in account creation");
    }
  }
};
