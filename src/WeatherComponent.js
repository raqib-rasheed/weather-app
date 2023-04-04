import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherComponent = ({ data }) => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "7554d12a44a56751a9db5fab1a7736f2";

  useEffect(() => {
    if (data?.name && data?.sys?.country) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${data?.name},${data?.sys?.country}&appid=${apiKey}&units=metric`;
      console.log("called here");
      axios
        .get(apiUrl)
        .then((response) => {
          console.log("here");
          setWeatherData({
            city: response.data.name,
            country: response.data.sys.country,
            temp: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
            iconId: response.data.weather[0].icon,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [apiKey, data?.name, data?.sys?.country]);

  return (
    <section className="weather-part">
      <img
        src={`http://openweathermap.org/img/w/${weatherData?.iconId}.png`}
        alt={weatherData?.description}
      />
      <div className="temp">
        <span className="numb">{weatherData?.temp}</span>
        <span className="deg">&deg;C</span>
      </div>
      <div className="weather-description">{weatherData?.description}</div>
      <div className="location">
        <i className="bx bx-map"></i>
        <span>
          {weatherData?.city}, {weatherData?.country}
        </span>
      </div>
      <div className="bottom-details">
        <div className="column feels">
          <i className="bx bxs-thermometer"></i>
          <div className="details">
            <div className="temp-2">
              <span className="numb-2">{weatherData?.feelsLike}</span>
              <span className="deg">&deg;C</span>
            </div>
            <p>Feels like</p>
          </div>
        </div>
        <div className="column humidity">
          <i className="bx bxs-droplet-half"></i>
          <div className="details">
            <span> {weatherData?.humidity}%</span>
            <p>Humidity</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherComponent;
