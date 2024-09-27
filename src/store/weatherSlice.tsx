import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (location: string) => {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=8f41968c68b249ada29152502242609&q=${location}`
    );
    return response.data;
  }
);

export const fetchWeekWeatherData = createAsyncThunk(
  "weather/fetchWeekWeatherData",
  async (location: string) => {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=8f41968c68b249ada29152502242609&q=${location}&days=7`
    );
    return response.data.forecast.forecastday;
  }
);

export const fetchCityImage = createAsyncThunk(
  "weather/fetchCityImage",
  async (location: string) => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${location}&client_id=6phhfF_bUChQbNgLgcL5C8G-1ndENTY56RptWrFs3nc`
    );
    return response.data.results[0].urls.regular;
  }
);

export const fetchUserLocationAndWeather = createAsyncThunk(
  "weather/fetchUserLocationAndWeather",
  async (_, { dispatch }) => {
    return new Promise<void>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const location = `${latitude},${longitude}`;
            const city = await dispatch(fetchWeatherData(location));
            await dispatch(fetchCityImage(city.payload.location.name));
            resolve();
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            reject("Geolocation not available");
          }
        );
      } else {
        reject("Geolocation not supported by this browser");
      }
    });
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: null,
    imageUrl: "",
    isCelsius: true,
    status: "idle",
    error: null,
    forecastday: [],
  },
  reducers: {
    toggleTempUnit: (state) => {
      state.isCelsius = !state.isCelsius;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weatherData = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchWeatherData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchCityImage.fulfilled, (state, action) => {
        state.imageUrl = action.payload;
      })
      .addCase(fetchWeekWeatherData.fulfilled, (state, action) => {
        state.forecastday = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserLocationAndWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserLocationAndWeather.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchUserLocationAndWeather.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { toggleTempUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
