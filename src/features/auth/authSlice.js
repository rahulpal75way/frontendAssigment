import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("auth_user"));

const initialState = {
  user: savedUser || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("auth_user", JSON.stringify(action.payload)); 
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("auth_user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
