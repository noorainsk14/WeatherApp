import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "./features/weatherSclice.js";
import { fetchWeatherByCity } from "./Api/weatherApi.js";
import SearchBar from "./components/SearchBar.jsx";

const Weather = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { weatherData, loading, error } = useSelector((state) => state.weather);

  const handleSearch = async () => {
    if (!city.trim()) return;

    dispatch(fetchWeatherStart());
    try {
      const data = await fetchWeatherByCity(city);
      dispatch(fetchWeatherSuccess(data));
    } catch (err) {
      dispatch(fetchWeatherFailure(err.message));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Weather App</h2>
      <SearchBar />
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
