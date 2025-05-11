export class GeoLocation {
  constructor(
    public lat: number,
    public lon: number
  ) {}

  // 緯度・経度を文字列形式で返すメソッド
  toString(): string {
    return `Latitude: ${this.lat}, Longitude: ${this.lon}`;
  }
}
