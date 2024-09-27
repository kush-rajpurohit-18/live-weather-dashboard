import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCityImage,
  fetchWeatherData,
  fetchWeekWeatherData,
} from "../store/weatherSlice";
import "./searchBar.css";
import crosshairIcon from "../Icon/crosshair.png";
import { AppDispatch } from "../store";

const SearchBar: React.FC = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchWeatherData(city));
    dispatch(fetchCityImage(city));
    dispatch(fetchWeekWeatherData(city));
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Search for places"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="icon-button">
            <img src={crosshairIcon} alt="Search" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
