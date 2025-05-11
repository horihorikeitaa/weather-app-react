import { WeatherResponse } from '../../application/dtos/response/WeatherResponse';
import { WeatherRequest } from '../../application/dtos/request/WeatherRequest';

// 天気データを取得する非同期関数
export const fetchWeather = async (
  request: WeatherRequest
): Promise<WeatherResponse> => {
  const { latitude, longitude } = request; // リクエストから緯度・経度を取得
  // 天気APIのURLを構築
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    // APIリクエストを送信
    const response = await fetch(url);
    if (!response.ok) {
      // レスポンスが正常でない場合はエラーをスロー
      throw new Error('Failed to fetch weather data');
    }
    // レスポンスをJSON形式でパース
    const data = await response.json();
    console.log('Weather Data:', data); // デバッグ用
    return data; // 天気データを返す
  } catch (error) {
    // エラーが発生した場合はログを出力し、再スロー
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
