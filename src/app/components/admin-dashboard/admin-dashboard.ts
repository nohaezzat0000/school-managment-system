import {Component, OnInit} from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import {Management} from '../management/management';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [PanelMenuModule, ButtonModule, Management, RouterOutlet],
  standalone:true,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit{

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-users',
        expanded: false,
        items: [
          { label: 'Students', icon: 'pi pi-user-plus', routerLink: 'students' },
          { label: 'Teachers', icon: 'pi pi-cog' },
          { label: 'Management', icon: 'pi pi-cog', routerLink:'management' }
        ]
      },
      {
        label: 'Classes',
        icon: 'pi pi-book',
        expanded: false,
        items: [
          { label: 'Add Class', icon: 'pi pi-plus' },
          { label: 'Class Schedule', icon: 'pi pi-calendar' }
        ]
      },
      {
        label: 'Reports',
        icon: 'pi pi-chart-line',
        expanded: false,
        items: [
          { label: 'Generate Report', icon: 'pi pi-file' },
          { label: 'Report History', icon: 'pi pi-clock' }
        ]
      }
    ];
  }


}
