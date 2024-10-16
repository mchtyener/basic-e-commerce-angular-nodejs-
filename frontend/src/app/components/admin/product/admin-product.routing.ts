import { Routes } from '@angular/router';

export const admin_product: Routes = [
  {
    path: '',
    loadComponent: () => import('./product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./product-create/product-create.component').then(m => m.ProductCreateComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./product-edit/product-edit.component').then(m => m.ProductEditComponent)
  },
];

