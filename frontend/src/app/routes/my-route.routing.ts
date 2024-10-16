import { Routes } from '@angular/router';
import { ngxPermissionsGuard } from 'ngx-permissions';
import { admin_router } from '../components/admin/admin.routing';
import { restaurant } from '../components/restaurant/restaurant.routing';
import { ROLES } from '../data/role';

const defaultRoute = '';
export const my_routes: Routes = [

  {
    path: '',
    loadComponent: () => import('../components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'restaurant', children: restaurant
  },
  {
    path: 'admin', children: admin_router, canActivate: [ngxPermissionsGuard],
    data: {
      permissions: {
        only: [ROLES.ROLE_ADMIN],
      },
      redirectTo: { default: defaultRoute }
    }

  }

];


