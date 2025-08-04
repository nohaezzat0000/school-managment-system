import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import {PublicLayout} from './layouts/public-layout/public-layout';
import {AdminLayout} from './layouts/admin-layout/admin-layout';
import {AdminDashboard} from './components/admin-mangment/admin-dashboard/admin-dashboard';
import { SignIn } from './components/auth/sign-in/sign-in';
import { SignUp } from './components/auth/sign-up/sign-up';
import {
  StudentEnrollmentDetail
} from './components/admin-mangment/admin-dashboard/student-enrollment-detail/student-enrollment-detail';

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
      { path: '', component: Home, data: { breadcrumb: 'Home' } },
      { path: 'auth/signin', component: SignIn },
      { path: 'auth/signup', component: SignUp },
      /**/ // more public routes
      //{ path: 'students', component: StudentEnrollmentRequests },

    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    // canActivate: [RoleGuard],
    // data: {roles: ['Admin']},
    children: [
      { path: 'dashboard', component: AdminDashboard, data: { breadcrumb: 'Admin Dashbored' }},
      {
          path: 'users',
    loadChildren: () =>
      import('./components/admin-mangment/admin-dashboard/users/users.routes').then((m) => m.routes),
  },
      {
        path: 'profile',
        loadComponent: () => import('./shared/user-profile/user-profile').then(m => m.UserProfile),
        data: {breadcrumb: 'Profile'},
      },
      {
        path: 'student-enrollment-requests',
        loadComponent: () => import('./components/admin-mangment/admin-dashboard/student-enrollment-requests/student-enrollment-requests').then(m => m.StudentEnrollmentRequests),
        data: { breadcrump: 'Student encrollment request'}
      },
      {
        path: 'student-enrollment-detail',
        loadComponent: () => import('./components/admin-mangment/admin-dashboard/student-enrollment-detail/student-enrollment-detail').then(m => m.StudentEnrollmentDetail),
        data: { breadcrump: 'Student encrollment details'}
      }


// more admin
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];


