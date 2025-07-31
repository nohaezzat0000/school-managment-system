import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHorizontalMenu } from '../../shared/admin-horizontal-menu/admin-horizontal-menu';
import { AppNavBar } from '../../shared/app-nav-bar/app-nav-bar';
import { Appbreadcrumb } from '../../shared/appbreadcrumb/appbreadcrumb';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    AdminHorizontalMenu,
    AppNavBar,
    Appbreadcrumb
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

}
