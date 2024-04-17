import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "../api/axiosClient";

export const login = createAsyncThunk(
  "auth/login",
  async values => {
    try {
      const response = await axiosClient.post("/auth/login", {
        email: values.email,
        password: values.password
      });

      return response?.token;
    } catch (error) {
      return null;
    }
  }
);
