import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { productEntitiesAdapter } from "../entities/products";
import {
  fetchProducts,
  removeProduct,
} from "../../processes/product.process";

const INITIAL_STATE = productEntitiesAdapter.getInitialState({
  ids: [],
  loading: false,
  page: 1,
  totalItems: 0,
});

const productListSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          productEntitiesAdapter.setAll(
            state,
            action.payload?.products || []
          );

          if (state.page === 1 && action.payload?.totalItems) {
            state.totalItems = ~~action.payload?.totalItems;
          }
        }
      )
      .addCase(
        removeProduct.fulfilled,
        (state, action) => {
          productEntitiesAdapter.removeOne(state, action.payload?.id);
        }
      )
      .addMatcher(
        isAnyOf(fetchProducts.fulfilled, fetchProducts.rejected),
        (state) => {
          state.loading = false;
        }
      );
  },
  initialState: INITIAL_STATE,
  name: "productsList",
  reducers: {
    filtersChanged: (state, action) => {
      state[action.payload.field] = action.payload.value;

      if (action.payload.resetPagination) {
        state.page = 1;
      }
    },
  },
});

export const { filtersChanged } = productListSlice.actions;

export const getProductsListState = state => state.productsList || {};

export default productListSlice.reducer;
