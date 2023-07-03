import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./slices/documentApiSlice";

export const store = configureStore({
  reducer: {
    documents: documentReducer,
  },
  devTools: true
});
