import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AdminHorizontalMenu} from '../../shared/admin-horizontal-menu/admin-horizontal-menu';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    AdminHorizontalMenu
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

}
