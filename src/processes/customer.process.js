import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "../api/axiosClient";

export const fetchCustomers = createAsyncThunk(
  "customers/list",
  async ({ type, name, page }) => {
    try {
      const response = await axiosClient.get("/customers", {
        params: { type, name, page }
      });

      return { customers: response.customers, totalItems: response.totalItems };
    } catch (error) {
      return null;
    }
  }
);

export const getCustomer = createAsyncThunk(
  "customers/find",
  async ({ customerId }) => {
    try {
      const response = await axiosClient.get(`/customers/${customerId}`);

      return response;
    } catch (error) {
      return null;
    }
  }
);
export const createCustomer = createAsyncThunk(
  "customers/create",
  async (customer) => {
    try {
      const response = await axiosClient.post(`/customers`, customer);

      return response;
    } catch (error) {
      return null;
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, ...customer }) => {
    try {
      const response = await axiosClient.put(`/customers/${id}`, customer);

      return response;
    } catch (error) {
      return null;
    }
  }
);

export const removeCustomer = createAsyncThunk(
  "customers/delete",
  async (customerId) => {
    try {
      await axiosClient.delete(`/customers/${customerId}`);

      return {
        id: customerId,
      };
    } catch (error) {
      return null;
    }
  }
);
