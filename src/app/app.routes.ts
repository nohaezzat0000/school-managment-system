import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import {Auth} from './components/auth/auth';
import { Management } from './components/management/management';
import {AdminDashboard} from './components/admin-mangment/admin-dashboard/admin-dashboard';


export const routes: Routes = [
    { path: '', component: Home},
    {path: 'auth' , component: Auth},
    {path: 'management', component: Management},
  {path: 'management', component: AdminDashboard}

];
