import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { customerEntitiesAdapter } from "../entities/customers";

import {
  getCustomer,
  createCustomer,
  updateCustomer,
} from "../../processes/customer.process";

const INITIAL_STATE = customerEntitiesAdapter.getInitialState({
  id: null,
  loading: false,
  customer: {
    name: "",
    type: "CUSTOMER",
    customer_entity: "PF",
    email: null,
    phone: null,
    cnpj: null,
    cpf: null,
    address: null,
  },
});

const customerFormState = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getCustomer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {

        state.customer = action.payload;

        state.customer.customer_entity = action.payload.is_pf ? "PF" : "PJ";
      })
      .addMatcher(
        isAnyOf(createCustomer.pending, updateCustomer.pending),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(createCustomer.fulfilled, updateCustomer.fulfilled),
        (state) => {
          state.customer = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getCustomer.fulfilled,
          createCustomer.fulfilled,
          updateCustomer.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
  initialState: INITIAL_STATE,
  name: "customerForm",
  reducers: {
    resetForm: () => {
        return {
            ...INITIAL_STATE
        };
    }
  }
});

export const { resetForm } = customerFormState.actions;

export const getCustomerFormState = (state) => state.customerForm || {};

export default customerFormState.reducer;
