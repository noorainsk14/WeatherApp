export async function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
    import.meta.env.VITE_API_KEY
  }&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("City not found");
  }

  const data = await response.json();

  return data;
}
