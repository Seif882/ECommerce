import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let token = localStorage.getItem("token");

let dataSlice = createSlice({
  name: "userData",
  initialState: {
    token: "",
    name: "",
  },
  reducers: {
    setData(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      localStorage.setItem("name", action.payload.name);
      state.name = action.payload.name;
    },
    removeData(state) {
      localStorage.clear();
      state.name = state.token = "";
    },
  },
});

export let dataReducer = dataSlice.reducer;

export let { setData, removeData } = dataSlice.actions;
