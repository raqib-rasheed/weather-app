import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CityComponent(props) {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && city.trim() !== "") {
      props.onSearch(city);
    }
  };

  const handleLocationClick = () => {
    props.onLocation();
    navigate("/show-weather");
  };

  return (
    <div className="input-part">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        onKeyPress={handleEnterPress}
      />
      <div className="separator"></div>
      <button onClick={handleLocationClick}>Get My Location</button>
    </div>
  );
}

export default CityComponent;
