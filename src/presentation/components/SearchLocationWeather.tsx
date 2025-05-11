import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useWeatherStore from '../../store/weatherStore';
import { fetchCoordinates } from '../../infrastructure/api/GeoAPI';
import { fetchWeather } from '../../infrastructure/api/WeatherAPI';
import WeatherCard from './WeatherCard';

const SearchLocationWeather: React.FC = () => {
  const { setCoordinates, setError } = useWeatherStore();
  const [city, setCity] = useState('');
  const [searchCoordinates, setSearchCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const { refetch: fetchGeo } = useQuery({
    queryKey: ['coordinates', city],
    queryFn: async () => {
      const response = await fetchCoordinates({ location: city });
      setSearchCoordinates(response);
      setCoordinates(response); // 検索した地点の座標をグローバル状態に保存
      return response;
    },
    enabled: false,
  });

  const {
    data: weather,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['weather', searchCoordinates],
    queryFn: async () => {
      if (!searchCoordinates) throw new Error('Coordinates not available');
      return fetchWeather({
        latitude: searchCoordinates.lat,
        longitude: searchCoordinates.lon,
      });
    },
    enabled: !!searchCoordinates,
  });

  const handleSearch = async () => {
    try {
      await fetchGeo();
    } catch (error) {
      setError('Failed to fetch coordinates.');
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input"
        />
        <button className="btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching weather data.</p>
      ) : weather ? (
        <WeatherCard
          temperature={weather.current_weather.temperature}
          weatherCode={weather.current_weather.weathercode}
        />
      ) : null}
    </div>
  );
};

export default SearchLocationWeather;
