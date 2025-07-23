import { Component } from '@angular/core';
import {PanelMenu} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-admin-horizontal-menu',
  imports: [
    PanelMenu
  ],
  templateUrl: './admin-horizontal-menu.html',
  styleUrl: './admin-horizontal-menu.css'
})
export class AdminHorizontalMenu {


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
          { label: 'ManagementList', icon: 'pi pi-cog', routerLink:'management' }
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
