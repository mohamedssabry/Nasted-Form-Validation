import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { adminApi } from "../features/adminSlice";
import { customerApi } from "../features/customerSlice";
import { freeApi } from "../features/freeSlice";
import { webApi } from "../features/webSlice";

const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [freeApi.reducerPath]: freeApi.reducer,
    [webApi.reducerPath]: webApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      adminApi.middleware,
      customerApi.middleware,
      freeApi.middleware,
      webApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
