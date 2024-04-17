import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "../api/axiosClient";

export const fetchProducts = createAsyncThunk(
  "products/list",
  async ({ name, page }) => {
    const response = await axiosClient.get("/products", {
      params: { name, page },
    });

    return { products: response.products, totalItems: response.totalItems };
  }
);

export const getProduct = createAsyncThunk(
  "products/find",
  async (productId) => {
    const response = await axiosClient.get(`/products/${productId}`);

    return response;
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (product) => {
    const response = await axiosClient.post(`/products`, product);

    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, ...product }) => {
    const response = await axiosClient.put(`/products/${id}`, product);

    return response;
  }
);

export const removeProduct = createAsyncThunk(
  "products/delete",
  async (productId) => {
    await axiosClient.delete(`/products/${productId}`);

    return {
      id: productId,
    };
  }
);
