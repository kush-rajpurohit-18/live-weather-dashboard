import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTempUnit } from "../store/weatherSlice";
import "./temperatureToggle.css";

const TemperatureToggle: React.FC = () => {
  const dispatch = useDispatch();
  const isCelsius = useSelector((state: any) => state.weather.isCelsius);
  const [activeTab, setActiveTab] = useState("Week");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="header-container">
      <div className="tabs">
        <button className={activeTab === "Today" ? "tab active-tab" : "tab"}>
          Today
        </button>
        <button
          className={activeTab === "Week" ? "tab active-tab" : "tab"}
          onClick={() => handleTabClick("Week")}
        >
          Week
        </button>
      </div>
      <div className="temperature-toggle">
        <div className="temperature-toggle-degree">
          <button
            className={isCelsius ? "active" : ""}
            onClick={() => dispatch(toggleTempUnit())}
          >
            °C
          </button>
          <button
            className={!isCelsius ? "active" : ""}
            onClick={() => dispatch(toggleTempUnit())}
          >
            °F
          </button>
        </div>
        <div className="profile-picture">
          <img
            src="https://lh3.googleusercontent.com/a/ACg8ocKfDAUpo6_wSrWt_H1n94iVREgqf42xli7L2onKbWAkzo1as_4=s96-c"
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default TemperatureToggle;
