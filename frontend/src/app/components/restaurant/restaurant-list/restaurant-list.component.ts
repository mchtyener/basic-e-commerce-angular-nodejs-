import { AsyncPipe, CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ROLES } from '../../../data/role';
import { Restaurant } from '../../../models/restaurant';
import { RestaurantService } from '../../../services/restaurant.service';
import { RestaurantsPlaceholderComponent } from "../restaurants-placeholder/restaurants-placeholder.component";

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RestaurantsPlaceholderComponent, RouterLink, TranslateModule, TitleCasePipe, CurrencyPipe],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.scss'
})
export class RestaurantListComponent {
  assets: string = environment.url + 'uploads/'
  @Input() type: string = ''
  role: {
    ROLE_USER: string;
    ROLE_ADMIN: string;
  } = ROLES
  restaurant$!: Observable<Restaurant[]>;

  constructor(private restaurantService: RestaurantService) {
    this.restaurant$ = this.restaurantService.getRestaurants().pipe(map((res) => res.restaurants ?? []));
  }


  remove(id: string | undefined) {
    if (!id) return
    this.restaurantService.removeRestaurant(id).subscribe({
      next: (data) => {
        this.restaurantService.getRestaurants();
      },
      error: () => {

      }
    })
  }

}
