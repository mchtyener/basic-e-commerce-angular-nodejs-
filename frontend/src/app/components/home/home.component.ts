import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RestaurantListComponent } from "../restaurant/restaurant-list/restaurant-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RestaurantListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
