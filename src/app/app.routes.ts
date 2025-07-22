import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Cart } from './components/cart/cart';
import { Contact } from './components/contact/contact';
import {Auth} from './components/auth/auth';
import {AdminDashboard} from './components/admin-dashboard/admin-dashboard';
import {Management} from './components/management/management';
import {StudentList} from './components/users/student-list/student-list';


export const routes: Routes = [
    { path: '', component: Home},
    { path: 'products', component: Products},
    { path: 'cart', component: Cart},
    { path: 'contact', component: Contact},
    {path: 'auth' , component: Auth},
  { path: 'adminDashboard', component: AdminDashboard,
    children: [
      { path: 'management', component: Management } ,
      {path: 'students', component: StudentList}]}

];
