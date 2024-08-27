import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./Slices/userDataSlice";

export const store = configureStore({
  reducer: {
    userData: dataReducer,
  },
});
