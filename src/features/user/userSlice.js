import { createSlice } from "@reduxjs/toolkit";
import { mockUsers } from "../../utils/data";

const savedUsers = JSON.parse(localStorage.getItem("app_state"))?.users;

const initialState = savedUsers || {
  users: mockUsers,
};


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    
  },
});

export default userSlice.reducer;
