import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector for Redux
import "./weeklyWeather.css";
import { fetchWeekWeatherData } from "../store/weatherSlice";
import { AppDispatch } from "../store";

const WeeklyWeather: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { forecastday } = useSelector((state: any) => state.weather);

  useEffect(() => {
    const defaultCity = "new_york";
    dispatch(fetchWeekWeatherData(defaultCity));
  }, [dispatch]);

  return (
    <div>
      <div className="weekly-cards">
        {forecastday &&
          forecastday.map((day: any, index: number) => (
            <div key={index} className="day-card">
              <p>
                {new Date(day.date)
                  .toLocaleDateString("en-US", {
                    weekday: "long",
                  })
                  .substring(0, 3)}
              </p>
              <img
                src={`http:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="weather-icon"
              />
              <p>
                {`${Math.round(day.day.avgtemp_c)}`}{" "}
                <span style={{ color: "silver" }}>
                  {`${Math.round(day.day.avgtemp_f)}`}
                </span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeeklyWeather;
