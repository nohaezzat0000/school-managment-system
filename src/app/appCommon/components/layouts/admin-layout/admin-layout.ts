import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHorizontalMenu } from '../../admin-horizontal-menu/admin-horizontal-menu';
import { AppNavBar } from '../../app-nav-bar/app-nav-bar';
import { Appbreadcrumb } from '../../appbreadcrumb/appbreadcrumb';

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
