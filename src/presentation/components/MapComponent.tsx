// src/presentation/components/MapComponent.tsx
import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import useWeatherStore from '../../store/weatherStore';
import { fetchWeather } from '../../infrastructure/api/WeatherAPI';
import WeatherCard from './WeatherCard';

const MapComponent: React.FC = () => {
  const { setCoordinates, setError } = useWeatherStore();
  const [mapCoordinates, setMapCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] =
    useState(false);

  // 現在地を取得する関数
  const getCurrentLocation = () => {
    setIsGettingCurrentLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // マップを現在地に移動
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 13);
        }
        // 現在地のマーカーを設定
        handleMapClick(latitude, longitude);
        setIsGettingCurrentLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('現在地の取得に失敗しました。');
        setIsGettingCurrentLocation(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  // 地図の初期化
  useEffect(() => {
    // 地図がすでに初期化されている場合は再初期化しない
    if (mapRef.current) return;

    // 初期座標を東京に設定（現在地を取得するまでのフォールバック）
    const initialCoords = [35.6895, 139.6917];
    const map = L.map('map').setView(initialCoords as [number, number], 13);
    mapRef.current = map;

    // タイルレイヤーを追加
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // クリックイベントを追加
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      handleMapClick(lat, lng);
    });

    // 現在地ボタンを作成
    const currentLocationControl = L.Control.extend({
      options: {
        position: 'topright',
      },
      onAdd: function () {
        const container = L.DomUtil.create(
          'div',
          'leaflet-bar leaflet-control'
        );
        const button = L.DomUtil.create('a', '', container);
        button.innerHTML = '📍'; // Location pin emoji
        button.title = '現在地に移動';
        button.href = '#';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.width = '34px';
        button.style.height = '34px';
        button.style.fontSize = '20px';
        button.style.backgroundColor = 'white';

        L.DomEvent.on(button, 'click', function (e) {
          L.DomEvent.preventDefault(e);
          getCurrentLocation();
        });

        return container;
      },
    });

    // 現在地ボタンをマップに追加
    map.addControl(new currentLocationControl());

    // 初期表示時に現在地を取得して表示
    getCurrentLocation();

    // コンポーネントのアンマウント時に地図を破棄
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 地図上のクリックを処理する関数
  const handleMapClick = (lat: number, lng: number) => {
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);

    // マーカーを更新または作成
    if (markerRef.current && mapRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else if (mapRef.current) {
      markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
    }

    // 座標を設定
    const coordinates = { lat, lon: lng };
    setMapCoordinates(coordinates);
    setCoordinates(coordinates); // グローバル状態にも保存
  };

  // 天気データを取得
  const {
    data: weather,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['weather', mapCoordinates],
    queryFn: async () => {
      if (!mapCoordinates) throw new Error('Coordinates not available');
      return fetchWeather({
        latitude: mapCoordinates.lat,
        longitude: mapCoordinates.lon,
      });
    },
    enabled: !!mapCoordinates,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        id="map"
        style={{
          height: '500px',
          width: '100%',
          marginBottom: '20px',
          position: 'relative',
        }}
      ></div>

      {isGettingCurrentLocation && (
        <div className="text-center mb-4">
          <p>現在地を取得中...</p>
        </div>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching weather data.</p>
      ) : weather ? (
        <WeatherCard
          temperature={weather.current_weather.temperature}
          weatherCode={weather.current_weather.weathercode}
          coordinates={mapCoordinates}
        />
      ) : (
        <p>地図上の地点をクリックして天気を表示</p>
      )}
    </div>
  );
};

export default MapComponent;
