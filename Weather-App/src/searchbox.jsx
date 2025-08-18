import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./searchbox.css"
import { useState } from 'react';
import InfoBox from "./InfoBox";

export default function SearchBox() {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


  let [city, setCity] = useState("");
  let [weatherInfo, setWeatherInfo] = useState(null);
  let [error, setError] = useState(null);

  let getWeather = async () => {
    try {
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      let jsonResponse = await response.json();

      if (jsonResponse.cod === 200) {
        let result = {
          city: jsonResponse.name,
          temp: jsonResponse.main.temp,
          temp_min: jsonResponse.main.temp_min,
          temp_max: jsonResponse.main.temp_max,
          humidity: jsonResponse.main.humidity,
          feelsLike: jsonResponse.main.feels_like,
          weather: jsonResponse.weather[0].main,
        };
        setWeatherInfo(result);
        setError(null); // clear old error
      } else {
        setWeatherInfo(null);
        setError(`City "${city}" not found ❌`);
      }
    } catch (err) {
      setWeatherInfo(null);
      setError("⚠️ Error fetching weather data. Please try again.");
    }
  }

  let handleChange = (e) => {
    setCity(e.target.value);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      getWeather();
      setCity("");
    }
  }

  return (
    <div className="search-box">
      <h3>Search for Weather</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /><br />
        <Button variant="contained" type='submit'>Search</Button>
      </form>

      {/* Show error if city not found */}
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {/* Show weather card if info available */}
      {weatherInfo && <InfoBox info={weatherInfo} />}
    </div>
  );
}
