import { createSlice } from "@reduxjs/toolkit";
import { getInfo } from "../../processes/user.process";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    token: null,
    loading: false
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;

      localStorage.setItem('token', state.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
