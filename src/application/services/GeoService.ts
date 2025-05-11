import { GeoRequest } from '../dtos/request/GeoRequest';
import { GeoResponse } from '../dtos/response/GeoResponse';
import { GeoLocation } from '../../domain/entities/GeoLocation';

export class GeoService {
  static toDomain(dto: GeoResponse): GeoLocation {
    return new GeoLocation(dto.lat, dto.lon);
  }

  static toRequest(location: GeoLocation): GeoRequest {
    return { location: location.toString() };
  }
}
