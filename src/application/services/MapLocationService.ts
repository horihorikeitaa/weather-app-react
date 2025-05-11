import { MapLocationResponse } from '../dtos/response/MapLocationResponse';
import { MapLocationRequest } from '../dtos/request/MapLocationRequest';
import { GeoLocation } from '../../domain/entities/GeoLocation';

export class MapLocationService {
  static toDomain(dto: MapLocationResponse): GeoLocation {
    return new GeoLocation(dto.lat, dto.lon);
  }

  static toRequest(location: GeoLocation): MapLocationRequest {
    return {
      latitude: location.lat,
      longitude: location.lon,
    };
  }
}
