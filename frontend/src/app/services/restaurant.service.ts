import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant, RestaurantResponse } from '../models/restaurant';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient, private endpointService: EndpointService) { }

  getRestaurants(): Observable<RestaurantResponse> {
    const url = this.endpointService.buildUrl('restaurants');
    return this.http.get<RestaurantResponse>(url);
  }

  getRestaurantDetail(id: string): Observable<RestaurantResponse> {
    const url = this.endpointService.buildUrl('restaurant_detail', { id });
    return this.http.get<RestaurantResponse>(url)
  }

  createRestaurant(data: Restaurant) {
    const url = this.endpointService.buildUrl('create_restaurants');
    return this.http.post<RestaurantResponse>(url, data)
  }

  removeRestaurant(id: string) {
    const url = this.endpointService.buildUrl('restaurant_remove', { id });
    return this.http.delete<RestaurantResponse>(url)
  }

}
