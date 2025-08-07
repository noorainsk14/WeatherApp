import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
      state.weatherData = null;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.weatherData = action.payload;
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCity,
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;
