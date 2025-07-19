import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Products', icon: 'pi pi-box', routerLink: '/products' },
      { label: 'Contact Us', icon: 'pi pi-envelope', routerLink: '/contact' },
      { label: 'Cart', icon: 'pi pi-shopping-cart', routerLink: '/cart' }
    ];
  }
}
