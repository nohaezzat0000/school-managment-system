import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import {Auth} from './components/auth/auth';



export const routes: Routes = [
    { path: '', component: Home},
    {path: 'auth' , component: Auth},
  {
    path: 'users',
    loadChildren: () =>
      import('./components/admin-mangment/users/users.routes').then((m) => m.routes),
  },

];
