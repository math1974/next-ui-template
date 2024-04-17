import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "../api/axiosClient";

export const getInfo = createAsyncThunk("user/info", async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosClient.get("/users/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.user;
  } catch (error) {
    return null;
  }
});
