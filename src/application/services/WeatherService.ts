import { WeatherResponse } from '../dtos/response/WeatherResponse';
import { WeatherRequest } from '../dtos/request/WeatherRequest';
import { Weather } from '../../domain/entities/Weather';
import { GeoLocation } from '../../domain/entities/GeoLocation';

export class WeatherService {
  static toDomain(dto: WeatherResponse): Weather {
    return new Weather(
      dto.current_weather.temperature,
      dto.current_weather.weathercode
    );
  }

  static toRequest(location: GeoLocation): WeatherRequest {
    return {
      latitude: location.lat,
      longitude: location.lon,
    };
  }
}
