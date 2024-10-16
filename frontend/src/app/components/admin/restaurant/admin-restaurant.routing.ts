import { Routes } from '@angular/router';

export const admin_restaurant: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-restaurant-list/admin-restaurant-list.component').then(m => m.AdminRestaurantListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./admin-restaurant-create/admin-restaurant-create.component').then(m => m.AdminRestaurantCreateComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./admin-restaurant-edit/admin-restaurant-edit.component').then(m => m.AdminRestaurantEditComponent)
  },
];

