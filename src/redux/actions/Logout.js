import { setLoading } from "../slices/Logout";
import axios from "../../utils/api";

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const refreshTokenValue = localStorage.getItem("refresh-token");
    const refreshToken = JSON.parse(refreshTokenValue);

    const response = await axios.post("/api/auth/logout", { refreshToken });

    if (response.status !== 200) {
      throw new Error("Failed to logout");
    }

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    throw error;
  }
};
