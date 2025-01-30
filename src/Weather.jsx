import React, { useEffect, useState, useRef } from "react";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";

const weatherIcons = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": cloudIcon,
  "03n": cloudIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
};

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setWeatherData(null);
        return;
      }
      setWeatherData({
        humidity: data.main?.humidity ?? "N/A",
        windSpeed: data.wind?.speed ?? "N/A",
        temperature: Math.floor(data.main?.temp ?? 0),
        location: data.name ?? "Unknown",
        icon: weatherIcons[data.weather?.[0]?.icon] || clearIcon,
      });
    } catch (error) {
      setError("Error fetching weather data.");
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("London");
  }, []);

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-900 to-indigo-700 p-10 rounded-xl shadow-xl w-96 mx-auto mt-10 justify-center">
      <div className="flex items-center gap-4 mb-6">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="h-12 px-4 text-gray-800 bg-white rounded-full focus:outline-none w-60 placeholder:text-center"
        />
        <img
          src={searchIcon}
          alt="Search"
          onClick={() => fetchWeather(inputRef.current.value)}
          className="w-12 p-2 bg-white rounded-lg cursor-pointer"
        />
      </div>
      {error && <p className="text-red-500 text-lg">{error}</p>}
      {loading ? (
        <p className="text-white text-xl">Loading...</p>
      ) : (
        weatherData && (
          <>
            <img
              src={weatherData.icon}
              alt="Weather Icon"
              className="w-32 my-4"
            />
            <p className="text-white text-6xl">{weatherData.temperature}°C</p>
            <p className="text-white text-2xl">{weatherData.location}</p>
            <div className="flex justify-between w-full mt-6 text-white">
              <WeatherDetail
                icon={humidityIcon}
                value={`${weatherData.humidity} %`}
                label="Humidity"
              />
              <WeatherDetail
                icon={windIcon}
                value={`${weatherData.windSpeed} Km/h`}
                label="Wind Speed"
              />
            </div>
          </>
        )
      )}
    </div>
  );
};

const WeatherDetail = ({ icon, value, label }) => {
  return (
    <div className="flex items-center gap-3 justify-center">
      <img src={icon} alt={label} className="w-8" />
      <div>
        <p className="text-lg">{value}</p>
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
};

export default Weather;
