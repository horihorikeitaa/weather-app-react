import React from 'react';
import LocationAddressDisplay from './LocationAddressDisplay';

interface WeatherCardProps {
  temperature: number;
  weatherCode: string;
  coordinates?: { lat: number; lon: number } | null;
  showLocation?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  weatherCode,
  coordinates,
  showLocation = true,
}) => {
  return (
    <div className="card">
      <h2 className="card-title">Current Weather</h2>
      {showLocation && coordinates && (
        <LocationAddressDisplay coordinates={coordinates} />
      )}
      <div className="space-y-2">
        <p className="card-content">
          Temperature: <span className="font-medium">{temperature}°C</span>
        </p>
        <p className="card-content">
          Weather Code: <span className="font-medium">{weatherCode}</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
