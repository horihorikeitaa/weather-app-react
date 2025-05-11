import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMapLocation } from '../../infrastructure/api/MapAPI';

interface LocationAddressDisplayProps {
  coordinates: { lat: number; lon: number } | null;
}

const LocationAddressDisplay: React.FC<LocationAddressDisplayProps> = ({
  coordinates,
}) => {
  const { data: location, isLoading } = useQuery({
    queryKey: ['mapLocation', coordinates],
    queryFn: async () => {
      if (!coordinates) throw new Error('Coordinates not available');
      return fetchMapLocation({
        latitude: coordinates.lat,
        longitude: coordinates.lon,
      });
    },
    enabled: !!coordinates,
  });

  if (!coordinates) return null;

  return (
    <div className="text-center mb-4">
      <p>
        地点: 緯度 {coordinates.lat.toFixed(4)}, 経度{' '}
        {coordinates.lon.toFixed(4)}
      </p>
      {isLoading ? (
        <p>住所を取得中...</p>
      ) : location ? (
        <p>住所: {location.address}</p>
      ) : null}
    </div>
  );
};

export default LocationAddressDisplay;
