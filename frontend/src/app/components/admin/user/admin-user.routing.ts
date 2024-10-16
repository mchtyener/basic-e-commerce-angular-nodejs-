import { Routes } from '@angular/router';

export const admin_user: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-list/user-list.component').then(m => m.UserListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./user-create/user-create.component').then(m => m.UserCreateComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./user-edit/user-edit.component').then(m => m.UserEditComponent)
  },
];

