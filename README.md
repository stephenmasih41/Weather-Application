# Weather App

## Overview:- 

This is a simple weather application built using React.js and OpenWeatherMap API. It allows users to search for a city and view the current weather conditions, including temperature, humidity, and wind speed.

## Features:-

- 🔍 Search for a city to get real-time weather data.

- 🌦 Displays temperature, humidity, and wind speed.

- 🎨 Beautiful UI with Tailwind CSS.

- 🌍 Default weather for London on initial load.

- 🔄 Error handling for incorrect city names or API failures.

- 🚀 Responsive design that works on all devices.

## Tech Stack:-

- React.js (useState, useEffect, useRef)

- Tailwind CSS for styling

- OpenWeatherMap API for weather data

## Functionality Breakdown:- 

### 1. Weather.js

- useRef is used to reference the input field.

- useState manages weatherData, loading, and error states.

- useEffect fetches weather data for London on initial render.

### 2. fetchWeather(city):

- Fetches weather data from OpenWeatherMap API.

- Updates state variables (weatherData, loading, error).

- Handles API errors and invalid city names.

### 3. WeatherDetail Component:

- Displays additional weather details (humidity and wind speed).
