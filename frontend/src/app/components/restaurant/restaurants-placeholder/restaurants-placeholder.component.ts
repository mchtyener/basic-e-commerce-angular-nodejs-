import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurants-placeholder',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './restaurants-placeholder.component.html',
  styleUrl: './restaurants-placeholder.component.scss'
})
export class RestaurantsPlaceholderComponent {

}
