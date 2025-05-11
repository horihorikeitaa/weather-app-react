export class Weather {
  constructor(
    public temperature: number,
    public weatherCode: string
  ) {}

  // 天気コードに基づいて説明を返すメソッド
  getWeatherDescription(): string {
    switch (this.weatherCode) {
      case '0':
        return 'Clear sky';
      case '1':
        return 'Partly cloudy';
      case '2':
        return 'Cloudy';
      default:
        return 'Unknown weather';
    }
  }
}
