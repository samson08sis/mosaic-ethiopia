"use client";

import { useEffect, useState } from "react";
import { getWeatherData } from "@/lib/api/weather/route";

interface WeatherProps {
  location?: string;
  days?: number;
  className?: string;
}

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface WeatherData {
  location: {
    name: string;
    region: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    uv: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export default function Weather({
  location = "Addis Ababa",
  days = 5,
  className = "",
}: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getWeatherData(location, days);
        setWeather(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location, days]);

  const weatherCondition =
    weather?.current?.condition?.text.toLowerCase() || "";
  const isDaytime = weather?.current?.is_day !== 0;

  // Loading state
  if (loading)
    return (
      <div
        className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${className}`}>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(days)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-300 dark:bg-gray-700 rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  // Error state
  if (error)
    return (
      <div
        className={`p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm ${className}`}>
        {error}
      </div>
    );

  // No data fallback
  if (!weather)
    return (
      <div
        className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm ${className}`}>
        Weather data unavailable
      </div>
    );

  // Main render
  return (
    <div
      className={`p-3 rounded-xl transition-colors duration-300 ${
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
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            {weather.location.region && `${weather.location.region}, `}
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
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="w-8 h-8"
          />
          <span className="text-lg font-bold text-gray-900 dark:text-white ml-1">
            {weather.current.temp_c}°
          </span>
        </div>
      </div>

      {/* Forecast */}
      <div
        className={`grid grid-cols-${weather.forecast.forecastday.length} gap-1`}>
        {weather.forecast.forecastday.map((day, index) => (
          <div
            key={day.date}
            className="w-full flex flex-col items-center p-1 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              {index === 0
                ? "Today"
                : new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
            </span>
            <img
              src={day.day.condition.icon}
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

      {/* Extras */}
      <div className="flex justify-between mt-2 text-[0.65rem] text-gray-600 dark:text-gray-400">
        <span>H: {weather.current.humidity}%</span>
        <span>W: {weather.current.wind_kph}km/h</span>
        <span>UV: {weather.current.uv}</span>
      </div>
    </div>
  );
}
