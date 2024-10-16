import { Routes } from '@angular/router';
import { admin_product } from './product/admin-product.routing';
import { admin_restaurant } from './restaurant/admin-restaurant.routing';
import { admin_user } from './user/admin-user.routing';

export const admin_router: Routes = [
  {
    path: 'product',
    children: admin_product
  },
  {
    path: 'restaurant',
    children: admin_restaurant
  },
  {
    path: 'user',
    children: admin_user
  },
];