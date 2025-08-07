import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../features/weatherSclice.js";
import { fetchWeatherByCity } from "../Api/weatherApi.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Rain from "../assets/Rain.webp";
import Winter from "../assets/winter.avif";
import Summer from "../assets/summer.avif";
import Haze from "../assets/haze.avif";
import SummerIcon from "../assets/SVG/SummerIcon.svg";
import ColdIcon from "../assets/SVG/ColdIcon.svg";
import RainIcon from "../assets/SVG/RainIcon.svg";
import HazeIcon from "../assets/SVG/HazeIcon.svg";

export default function ActionAreaCard() {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.weather.city);
  const { weatherData, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      dispatch(fetchWeatherStart());
      try {
        const data = await fetchWeatherByCity(city);
        dispatch(fetchWeatherSuccess(data));
      } catch (err) {
        dispatch(fetchWeatherFailure(err.message));
      }
    };

    fetchWeather();
  }, [city, dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!weatherData) return null;

  const { name, main, weather } = weatherData;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const getWeatherIcon = () => {
    const condition = weather?.[0]?.main?.toLowerCase();
    console.log(condition);

    const temp = main?.temp;

    if (condition === "haze") return HazeIcon;
    if (condition === "rain") return RainIcon;

    if (temp !== undefined) {
      if (temp < 20) return ColdIcon;
      else return SummerIcon;
    }

    // fallback in case data is missing
    return SummerIcon;
  };

  return (
    <Card
      style={{
        backgroundColor: "#E5E0D8",
        border: "2px solid #333",
        borderRadius: "12px",
        padding: "16px",
      }}
      sx={{ maxWidth: 500, margin: "auto", mt: 4 }}
    >
      <CardMedia
        component="img"
        height="140"
        image={
          weather[0].main === "Rain"
            ? Rain
            : weather[0].main === "Haze"
            ? Haze
            : main.temp > 25
            ? Summer
            : Winter
        }
        alt={weather[0].description}
      />
      <CardContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography
              style={{ fontWeight: "bold", fontSize: "30px" }}
              gutterBottom
              variant="h5"
            >
              {name}
            </Typography>

            {main?.temp !== undefined && (
              <img
                src={getWeatherIcon()}
                alt="weather icon"
                style={{ width: "32px", height: "32px", paddingBottom: "10px" }}
              />
            )}
          </div>
        </div>
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography
            style={{ fontWeight: "bold", fontSize: "30px" }}
            gutterBottom
            variant="h5"
            // component="div"
          >
            {name}
            {main?.temp !== undefined && (
              <img src={getWeatherIcon()} alt="weather icon" />
            )}
          </Typography>
        </div> */}
        <Typography
          style={{ fontWeight: "700", color: "black", fontSize: "20px" }}
          variant="body2"
          color="text.secondary"
        >
          Feels Like: {main.feels_like}°C
        </Typography>
        <Typography
          style={{ fontWeight: "700", color: "black", fontSize: "20px" }}
          variant="body2"
          color="text.secondary"
        >
          Temperature: {main.temp}°C
        </Typography>
        <Typography
          style={{ fontWeight: "700", color: "black", fontSize: "20px" }}
          variant="body2"
          color="text.secondary"
        >
          Humidity: {main.humidity} %
        </Typography>
        <Typography
          style={{ fontWeight: "700", color: "black", fontSize: "20px" }}
          variant="body2"
          color="text.secondary"
        >
          Condition: {weather[0].description}
        </Typography>
      </CardContent>
    </Card>
  );
}
