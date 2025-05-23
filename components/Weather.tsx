// components/Weather.js
import Image from "next/image";
import { useEffect, useState } from "react";

type Weather = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    icon: string;
    description: string;
  }[];
};

export default function Weather({ city = "Addis Ababa" }) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8ceda1a673a6f4a69381113e3696734a`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <div>Loading weather...</div>;
  if (!weather) return <div>Weather data unavailable</div>;

  return (
    <div className="weather-widget flex flex-row text-sm">
      <div>
        <h3>Weather in {weather.name}</h3>
        <div>Temperature: {Math.round(weather.main?.temp)}°C</div>
        <div>Condition: {weather?.weather[0]?.main}</div>
      </div>
      <Image
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        width={80}
        height={80}
        alt={weather.weather[0].description}
      />
    </div>
  );
}
