import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import {
  fetchProducts,
  removeProduct,
  updateProduct,
} from "../../processes/product.process";

export const productEntitiesAdapter = createEntityAdapter();

const initialState = productEntitiesAdapter.getInitialState();

const productEntitiesSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        productEntitiesAdapter.setMany(state, action.payload.products || []);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        productEntitiesAdapter.removeOne(state, action.payload?.id);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        productEntitiesAdapter.setOne(state, action.payload);
      });
  },
  initialState,
  name: "products",
});

export const { selectById: getProductById } =
  productEntitiesAdapter.getSelectors((state) => state.entities.products);

export default productEntitiesSlice.reducer;
