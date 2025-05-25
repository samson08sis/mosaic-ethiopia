// components/CompactWeatherForecast.js
import { useEffect, useState } from "react";

export default function Weather({
  location = "Addis Ababa",
  days = 5,
  className = "",
}) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${
            process.env.WEATHER_API_KEY
          }&q=${encodeURIComponent(location)}&days=${days}&aqi=no&alerts=no`
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location, days]);

  const weatherCondition =
    weather?.current?.condition?.text.toLowerCase() || "";
  const isDaytime = weather?.current?.is_day !== 0;

  if (loading)
    return (
      <div
        className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${className}`}>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div
        className={`p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm ${className}`}>
        Error: {error}
      </div>
    );

  if (!weather)
    return (
      <div
        className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm ${className}`}>
        Weather data unavailable
      </div>
    );

  return (
    <div
      className={`p-3 rounded-xl transition-colors duration-300 
      ${
        isDaytime
          ? weatherCondition.includes("sunny")
            ? "bg-amber-50 dark:bg-amber-900/30"
            : weatherCondition.includes("rain")
            ? "bg-blue-50 dark:bg-blue-900/30"
            : weatherCondition.includes("cloud")
            ? "bg-gray-50 dark:bg-gray-700/30"
            : "bg-gray-100 dark:bg-gray-800"
          : "bg-gray-100 dark:bg-gray-800"
      } ${className}`}>
      {/* Current Weather Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            {weather.location.name}
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {new Date(weather.location.localtime).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center">
          <img
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
            className="w-8 h-8"
          />
          <span className="text-lg font-bold text-gray-900 dark:text-white ml-1">
            {weather.current.temp_c}°
          </span>
        </div>
      </div>

      {/* Compact Forecast with Side-by-Side Temperatures */}
      <div className="grid grid-cols-5 gap-1">
        {weather.forecast.forecastday.map((day, index) => (
          <div
            key={day.date}
            className="flex flex-col items-center p-1 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              {index === 0
                ? "Now"
                : new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
            </span>
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="w-6 h-6 mb-1"
            />
            <div className="flex items-center justify-center space-x-1">
              <span className="text-xs font-semibold text-gray-900 dark:text-white">
                {Math.round(day.day.maxtemp_c)}°
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(day.day.mintemp_c)}°
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info - Very Compact */}
      <div className="flex justify-between mt-2 text-[0.65rem] text-gray-600 dark:text-gray-400">
        <span>H: {weather.current.humidity}%</span>
        <span>W: {weather.current.wind_kph}km/h</span>
        <span>UV: {weather.current.uv}</span>
      </div>
    </div>
  );
}
