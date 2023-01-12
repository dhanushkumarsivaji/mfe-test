import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { name: "", age: null, email: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    updateUserDetails: (state, action) => {
      state.value = action.payload;
    },

    clearUserDetails: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { updateUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;