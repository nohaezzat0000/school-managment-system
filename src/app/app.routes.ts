import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Cart } from './components/cart/cart';
import { Contact } from './components/contact/contact';


export const routes: Routes = [
    { path: '', component: Home},
    { path: 'products', component: Products},
    { path: 'cart', component: Cart},
    { path: 'contact', component: Contact}

];
