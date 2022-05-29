import { combineReducers } from "redux";
import products from "./products";
import filters from "./filters";
import category from "./category";
import cart from "./cart";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  products,
  filters,
  category,
  cart,
});

export type RootState = ReturnType<typeof rootReducer>;

// export type AppDispatch = typeof store.dispatch;

// const store = configureStore({
//   reducer: {
//     products,
//     filters,
//     category,
//     cart,
//   },
// });

// export default store;

// type RootState = typeof rootReducer;

// export type AppState = ReturnType<RootState>;

export default rootReducer;
