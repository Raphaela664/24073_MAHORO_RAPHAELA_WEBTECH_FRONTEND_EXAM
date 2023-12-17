import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  isLoading: false
};

const createAccountSlice = createSlice({
  name: "createAccount",
  initialState,
  reducers: {
    closeAlert: (state) => {
      state.isOpen = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    openAlert: (state) => {
      state.isOpen = true;
    }
  }
});

export const { closeAlert, setLoading, openAlert } = createAccountSlice.actions;

export default createAccountSlice.reducer;
