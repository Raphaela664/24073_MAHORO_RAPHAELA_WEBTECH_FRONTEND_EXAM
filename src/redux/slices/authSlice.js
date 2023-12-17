import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    successCondition: false,
    pending: false,
    error: {
      condition: false,
      message: ""
    }
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.successCondition = true;
      state.pending = false;
      state.userInfo = action.payload;
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("name", action.payload.firstname);
    },
    updateError: (state, action) => {
      state.error.condition = true;
      state.error.message = action.payload;
      state.pending = false;
    },
    clearError: (state) => {
      state.error.condition = false;
      state.pending = false;
    },
    clearSuccessCondition: (state) => {
      state.successCondition = false;
    },
    // updateAccessToken: (state, action) => {
    //   // const { accessToken, refreshToken } = action.payload;
    //   // state.userInfo.tokens.access.token = accessToken;
    //   // state.userInfo.tokens.refresh.token = refreshToken;
    //   // localStorage.setItem("access-token", JSON.stringify(accessToken));
    //   // localStorage.setItem("refresh-token", JSON.stringify(refreshToken));
    // }
  }
});

export const {
  updateStart,
  updateSuccess,
  updateError,
  clearError,
  clearSuccessCondition,
  updateAccessToken
} = userSlice.actions;

export default userSlice.reducer;
