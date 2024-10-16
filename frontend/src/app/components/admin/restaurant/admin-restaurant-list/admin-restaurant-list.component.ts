import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROLES } from '../../../../data/role';
import { RestaurantListComponent } from "../../../restaurant/restaurant-list/restaurant-list.component";

@Component({
  selector: 'app-admin-restaurant-list',
  standalone: true,
  imports: [RestaurantListComponent, RouterLink],
  templateUrl: './admin-restaurant-list.component.html',
  styleUrl: './admin-restaurant-list.component.scss'
})
export class AdminRestaurantListComponent {
  type: string = ROLES.ROLE_ADMIN

}
