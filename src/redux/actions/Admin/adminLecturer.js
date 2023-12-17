import axios from "../../../utils/api";
import { setLecturers, setIsLoading } from "../../slices/Admin/adminLecturer";

export const fetchLecturers = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

      const response = await axios.get("/lecturer/getLecturers");

      dispatch(setLecturers(response.data));
    

    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};
