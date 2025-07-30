import {Component} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {BadgeModule} from 'primeng/badge';
import {CommonModule} from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {MenuItem} from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

interface BreadcrumbItem {
  label: string;
  routerLink?: string;
}

@Component({
  selector: 'app-app-nav-bar',
  standalone: true,
  imports: [MenubarModule, BadgeModule, CommonModule, AvatarModule, BreadcrumbModule],
  templateUrl: './app-nav-bar.html',
  styleUrl: './app-nav-bar.css'
})
export class AppNavBar {

  items: MenuItem[] = [
    {
      label: 'UserName',
      icon: 'pi pi-user',
      items: [  // Sub-menu items
        { label: 'Home', icon: 'pi pi-home' },
        { label: 'Profile', icon: 'pi pi-user' },
        { label: 'Logout', icon: 'pi pi-sign-out' }
      ]
    },
    {
      icon: 'pi pi-bell',
    },
  ];
  home = { label: 'Home', icon: 'pi pi-home' };  // عنصر "الصفحة الرئيسية"

  items2: BreadcrumbItem[] = [
    { label: '', routerLink: '/' },
    { label: 'Product', routerLink: '/products' },
    { label: 'ProductDetaial', routerLink: '/product-detail' }
  ];
}
