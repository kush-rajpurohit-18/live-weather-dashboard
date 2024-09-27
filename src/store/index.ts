// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
