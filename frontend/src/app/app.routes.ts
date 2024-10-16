import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { my_routes } from './routes/my-route.routing';

export const routes: Routes = [
  { path: '', children: my_routes },
  { path: '**', component: PageNotFoundComponent }
];
