import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import {
  fetchCustomers,
  removeCustomer,
  updateCustomer,
} from "../../processes/customer.process";

export const customerEntitiesAdapter = createEntityAdapter();

const initialState = customerEntitiesAdapter.getInitialState();

const customerEntitiesSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        customerEntitiesAdapter.setMany(state, action.payload.customers || []);
      })
      .addCase(removeCustomer.fulfilled, (state, action) => {
        customerEntitiesAdapter.removeOne(state, action.payload?.id);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        customerEntitiesAdapter.setOne(state, action.payload);
      });
  },
  initialState,
  name: "customers",
});

export const { selectById: getCustomerById } =
  customerEntitiesAdapter.getSelectors((state) => state.entities.customers);

export default customerEntitiesSlice.reducer;
