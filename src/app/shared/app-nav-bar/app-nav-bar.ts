import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
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
      label: `
      <div style="display: flex; align-items: center; justify-content: space-between; width: 200px;">
        <div style="display: flex; flex-direction: column; text-align: left;">
          <span style="font-weight: bold;">Ahmed</span>
          <span style="font-size: 12px; color: gray;">Administrator</span>
        </div>
        <p-avatar image="assets/avatar.png" shape="circle" size="large"></p-avatar>
      </div>
    `, escape: false,
      items: [
        {label: 'Home', icon: 'pi pi-home'},
        {label: 'Profile', icon: 'pi pi-user', routerLink: '/admin/profile'},
        {label: 'sign-out', icon: 'pi pi-sign-out'}
      ]
    },
    {
      icon: 'pi pi-bell'
    }
  ];


  home = { icon: 'pi pi-home' };

  items2: BreadcrumbItem[] = [
    { label: '', routerLink: '/' },
    { label: '', routerLink: '/' },
    { label: '', routerLink: '/' }
  ];
}
