// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user.slice";

import customerListReducer from "./features/customerList.state";
import customerFormReducer from "./features/modalCustomerForm.state";

import productListReducer from "./features/productList.state";
import productFormReducer from "./features/modalProductForm.state";

import customerEntitiesReducer from "./entities/customers";
import productEntitiesReducer from "./entities/products";

export const store = configureStore({
  reducer: {
    user: userReducer,
    customersList: customerListReducer,
    customerForm: customerFormReducer,
    productsList: productListReducer,
    productForm: productFormReducer,
    entities: combineReducers({
      customers: customerEntitiesReducer,
      products: productEntitiesReducer,
    }),
  },
});
