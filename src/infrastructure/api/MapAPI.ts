// src/infrastructure/api/MapAPI.ts
import { MapLocationRequest } from '../../application/dtos/request/MapLocationRequest';
import { MapLocationResponse } from '../../application/dtos/response/MapLocationResponse';

// 地図上の地点から位置情報と住所を取得する非同期関数
export const fetchMapLocation = async (
  request: MapLocationRequest
): Promise<MapLocationResponse & { address: string }> => {
  const { latitude, longitude } = request;

  // Nominatim APIを使用して逆ジオコーディングを実行
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }

    const data = await response.json();

    // APIレスポンスから住所情報を抽出
    const address = data.display_name || '住所不明';

    return {
      lat: latitude,
      lon: longitude,
      address: address,
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    // エラー時でも座標情報は返す
    return {
      lat: latitude,
      lon: longitude,
      address: '住所情報の取得に失敗しました',
    };
  }
};
