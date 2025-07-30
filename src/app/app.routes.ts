import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import {PublicLayout} from './layouts/public-layout/public-layout';
import {AdminLayout} from './layouts/admin-layout/admin-layout';
import {AdminDashboard} from './components/admin-mangment/admin-dashboard/admin-dashboard';
import { RoleGuard } from './appCommon/guards/role-guard';
import { SignIn } from './components/auth/sign-in/sign-in';
// export const routes: Routes = [
//     { path: '', component: Home},
//     {path: 'auth' , component: Auth},
//   {
//     path: 'users',
//     loadChildren: () =>
//       import('./components/admin-mangment/admin-dashboard/users/users.routes').then((m) => m.routes),
//   },
//
// ];
export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
      { path: 'auth/signin', component: SignIn },
      // more public routes
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [RoleGuard],
    data: {roles: ['Admin']},
    children: [
      { path: 'dashboard', component: AdminDashboard },
      {
          path: 'users',
    loadChildren: () =>
      import('./components/admin-mangment/admin-dashboard/users/users.routes').then((m) => m.routes),
  },
      // more admin routes
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];


