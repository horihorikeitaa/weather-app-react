import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useWeatherStore from '../../store/weatherStore';
import { fetchWeather } from '../../infrastructure/api/WeatherAPI';
import WeatherCard from './WeatherCard';

const CurrentLocationWeather: React.FC = () => {
  const { coordinates, setCoordinates, setError } = useWeatherStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lon: longitude });
      },
      () => {
        setError('Failed to fetch current location.');
      }
    );
  }, [setCoordinates, setError]);

  const {
    data: weather,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['weather', coordinates],
    queryFn: async () => {
      if (!coordinates) throw new Error('Coordinates not available');
      return fetchWeather({
        latitude: coordinates.lat,
        longitude: coordinates.lon,
      });
    },
    enabled: !!coordinates,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching weather data.</p>;

  return weather ? (
    <WeatherCard
      temperature={weather.current_weather.temperature}
      weatherCode={weather.current_weather.weathercode}
      coordinates={coordinates}
    />
  ) : null;
};

export default CurrentLocationWeather;
