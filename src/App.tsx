// src/App.tsx
import React from "react";
import SearchBar from "./components/searchBar";
import TemperatureToggle from "./components/temperatureToggle";
import WeatherHighlights from "./components/weatherHighlights";
import "./App.css";
import WeeklyWeather from "./components/weeklyWeather";
import CurrentWeather from "./components/currentWeather";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="left-panel">
        <SearchBar />
        <CurrentWeather />
      </div>

      <div className="right-panel">
        <TemperatureToggle />
        <WeeklyWeather />
        <WeatherHighlights />
      </div>
    </div>
  );
};

export default App;
