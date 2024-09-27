import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserLocationAndWeather } from "../store/weatherSlice";
import "./currentWeather.css";
import { AppDispatch } from "../store";

const CurrentWeather: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { weatherData, imageUrl, isCelsius, status, error } = useSelector(
    (state: any) => state.weather
  );

  useEffect(() => {
    dispatch(fetchUserLocationAndWeather());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {weatherData && (
        <div className="forecast-card">
          <div className="current-weather-info-with-icon">
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
              style={{ width: "13rem" }}
            />
            <h1 className="current-weather-degree">
              {isCelsius
                ? `${Math.round(weatherData.current.temp_c)}°C`
                : `${Math.round(weatherData.current.temp_f)}°F`}
            </h1>
            <div style={{ fontSize: "1.5rem" }}>
              {new Date(weatherData.location.localtime).toLocaleDateString(
                "en-US",
                { weekday: "long" }
              )}
              ,{" "}
              <span style={{ color: "silver" }}>
                {new Date(weatherData.location.localtime).toLocaleTimeString(
                  "en-US",
                  { hour: "numeric", minute: "numeric", hour12: false }
                )}
              </span>
            </div>
          </div>
          <hr />
          <p>
            <strong>Status- </strong>
            {weatherData.current.condition.text}
          </p>
          <div className="city-image-container">
            <img
              src={imageUrl}
              alt="City"
              className="city-image"
              style={{ width: "220px", height: "18vh", borderRadius: "1rem" }}
            />
            <p className="country-overlay">{weatherData.location.name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentWeather;
