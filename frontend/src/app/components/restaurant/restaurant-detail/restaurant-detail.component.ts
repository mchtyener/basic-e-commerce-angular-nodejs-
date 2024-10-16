import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantResponse } from '../../../models/restaurant';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.scss'
})
export class RestaurantDetailComponent {
  $restaurant!: Observable<RestaurantResponse>
  @Input()
  set id(value: string) {
    this.$restaurant = this.restaurantService.getRestaurantDetail(value)
  }

  constructor(private restaurantService: RestaurantService) {

  }

}
