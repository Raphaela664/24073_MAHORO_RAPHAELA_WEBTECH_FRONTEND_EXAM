import axios from "../../../utils/api";
import { setStudents, setIsLoading } from "../../slices/Admin/adminStudent";

export const fetchStudents = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

      const response = await axios.get("/student/getStudents");
      
      console.log(response)
      dispatch(setStudents(response.data));
    
    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};
