import React, { useState } from "react";
import axios from "axios";
import CityComponent from "./CityComponent";
import WeatherComponent from "./WeatherComponent";
import { Route, Routes, useNavigate } from "react-router-dom";

const apiKey = "7554d12a44a56751a9db5fab1a7736f2";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  const handleLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );
        setWeatherData(response.data);
        setError(null);
      });
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="wrapper">
      <header>
        <i onClick={() => navigate("/")} className="bx bx-left-arrow-alt"></i>
        Weather App
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <CityComponent
              onSearch={handleSearch}
              onLocation={handleLocation}
            />
          }
        />
        <Route
          path="/show-weather"
          element={<WeatherComponent data={weatherData} />}
        />
      </Routes>
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
