import { GeoRequest } from '../../application/dtos/request/GeoRequest';
import { GeoResponse } from '../../application/dtos/response/GeoResponse';

// 都市名から緯度・経度を取得する非同期関数
export async function fetchCoordinates(
  request: GeoRequest
): Promise<GeoResponse> {
  try {
    // Nominatim APIリクエストを送信
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(request.location)}&format=json`
    );
    if (!response.ok) {
      // レスポンスが正常でない場合はエラーをスロー
      throw new Error(`API responded with status ${response.status}`);
    }
    // レスポンスをJSON形式でパース
    const data = await response.json();
    if (!data[0] || !data[0].lat || !data[0].lon) {
      // 必要なデータが存在しない場合はエラーをスロー
      throw new Error("Invalid response format: Missing 'lat' or 'lon'");
    }
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }; // 緯度・経度を返す
  } catch (error) {
    // エラーが発生した場合はログを出力し、再スロー
    console.error('Failed to fetch coordinates:', error);
    throw error;
  }
}
