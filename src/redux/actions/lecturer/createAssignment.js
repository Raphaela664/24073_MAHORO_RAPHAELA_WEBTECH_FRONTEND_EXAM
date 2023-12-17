import Axios from "../../../utils/api";
import { toast } from "react-toastify";
import { setIsCreatingPublish, setIsCreatingDraft } from "../../slices/lecturer/createAssignment";
import { fetchAssignments } from "../../actions/lecturer/getAllAssignment";

export const createAssignment = (formData) => async (dispatch) => {
  dispatch(setIsCreatingPublish(true));
  const id = localStorage.getItem("id");
  console.log(id)
  try {
    let students=[];
    for(let i=0; i<formData.studentIds.length; i++){
      students.push({"student_id": formData.studentIds[i]})
    }
   
    const assignment = {
      title: formData.title,
      assignment_description: formData.assignment_description,
      deadline: formData.deadline,
      lecturer: {
        lecturer_id: id
      }
    };
    const assignmentRequest = {
      assignment:assignment,
      students
    }
    const response = await Axios.post(
      '/assignment/createAssignment', assignmentRequest
    
      
     
    );

    if (response.status === 200) {
      toast.success(response.data.message);
      dispatch(fetchAssignments());
    } else {
      toast.error("Assignment not created");
    }
  } catch (error) {
    toast.error("Error creating assignment:", error);
  } finally {
    dispatch(setIsCreatingPublish(false));
  }
};
