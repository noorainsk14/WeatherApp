import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSclice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
