import React, { useEffect } from "react";

import "./weatherHighlights.css";
import { fetchWeatherData } from "../store/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";

const WeatherHighlights: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { weatherData } = useSelector((state: any) => state.weather);

  useEffect(() => {
    const defaultCity = "new_york";
    dispatch(fetchWeatherData(defaultCity));
  }, [dispatch]);

  return (
    <div className="highlights">
      <h2 style={{ fontWeight: "500" }}>Today's Highlights</h2>
      <div className="highlights-grid">
        <div className="highlight-box">
          <p>UV Index</p>
          <p>{weatherData?.current.uv}</p>
        </div>
        <div className="highlight-box">
          <p>Wind Status</p>
          <p>
            {weatherData?.current.wind_kph} km/h {weatherData?.current.wind_dir}
          </p>
        </div>
        <div className="highlight-box">
          <p>Sunrise & Sunset</p>
          <p>6:45 AM / 7:15 PM</p>{" "}
        </div>
        <div className="highlight-box">
          <p>Humidity</p>
          <p>{weatherData?.current.humidity}%</p>
        </div>
        <div className="highlight-box">
          <p>Visibility</p>
          <p>{weatherData?.current.vis_km} km</p>
        </div>
        <div className="highlight-box">
          <p>Air Quality</p>
          <p>Good</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default WeatherHighlights;
