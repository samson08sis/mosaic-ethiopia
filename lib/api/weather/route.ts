export const getWeatherData = async (location: string, days: number) => {
  try {
    const res = await fetch(
      `/api/weather?location=${encodeURIComponent(location)}&days=${days}`
    );

    if (!res.ok) {
      throw new Error(`Weather API error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    throw new Error(`Failed to fetch weather data: ${err.message}`);
  }
};
