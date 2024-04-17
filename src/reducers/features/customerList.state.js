import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { customerEntitiesAdapter } from "../entities/customers";
import {
  fetchCustomers,
  removeCustomer,
} from "../../processes/customer.process";

const INITIAL_STATE = customerEntitiesAdapter.getInitialState({
  ids: [],
  loading: false,
  type: 'CUSTOMER',
  page: 1,
  totalItems: 0,
});

const usersListSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCustomers.fulfilled,
        (state, action) => {
          customerEntitiesAdapter.setAll(
            state,
            action.payload?.customers || []
          );

          if (state.page === 1 && action.payload?.totalItems) {
            state.totalItems = ~~action.payload?.totalItems;
          }
        }
      )
      .addCase(
        removeCustomer.fulfilled,
        (state, action) => {
          customerEntitiesAdapter.removeOne(state, action.payload?.id);
        }
      )
      .addMatcher(
        isAnyOf(fetchCustomers.fulfilled, fetchCustomers.rejected),
        (state) => {
          state.loading = false;
        }
      );
  },
  initialState: INITIAL_STATE,
  name: "customersList",
  reducers: {
    filtersChanged: (state, action) => {
      state[action.payload.field] = action.payload.value;

      if (action.payload.resetPagination) {
        state.page = 1;
      }
    },
  },
});

export const { filtersChanged } = usersListSlice.actions;

export const getCustomersListState = state => state.customersList || {};

export default usersListSlice.reducer;
