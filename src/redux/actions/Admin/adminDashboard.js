import axios from "../../../utils/api";
import { setDashboardData } from "../../slices/Admin/adminDashboard";

export const fetchDashboardData = () => async (dispatch) => {
  try {
    const tokenJSON = localStorage.getItem("access-token");

    if (tokenJSON !== null) {
      const token = JSON.parse(tokenJSON);

      const response = await axios.get("/api/info/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      

      const dashboardData = response.data.data;
      dispatch(
        setDashboardData({
          lecturers: dashboardData.lecturers.count,
          students: dashboardData.students.count,
          assignments: dashboardData.assignments.count,
          submissions: dashboardData.submissions.count
        })
      );
    }
  } catch (error) {
    //
  }
};
