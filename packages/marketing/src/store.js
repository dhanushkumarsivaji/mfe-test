import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    userMarketing: userReducer,
  },
});

export default store;