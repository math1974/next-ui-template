import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { productEntitiesAdapter } from "../entities/products";

import {
  getProduct,
  createProduct,
  updateProduct,
} from "../../processes/product.process";

const INITIAL_STATE = productEntitiesAdapter.getInitialState({
  id: null,
  loading: false,
  product: {
    name: "",
    price: 0,
    unity: "",
  },
});

const productFormState = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addMatcher(
        isAnyOf(createProduct.pending, updateProduct.pending),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(createProduct.fulfilled, updateProduct.fulfilled),
        (state) => {
          state.product = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getProduct.fulfilled,
          createProduct.fulfilled,
          createProduct.rejected,
          updateProduct.fulfilled,
          updateProduct.rejected
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
  initialState: INITIAL_STATE,
  name: "productForm",
  reducers: {
    resetForm: () => {
      return {
        ...INITIAL_STATE,
      };
    },
  },
});

export const { resetForm } = productFormState.actions;

export const getProductFormState = (state) => state.productForm || {};

export default productFormState.reducer;
