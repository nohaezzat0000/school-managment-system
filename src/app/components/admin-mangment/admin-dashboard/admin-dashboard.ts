import {Component, OnInit} from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import {ManagementList} from './users/managments/management-list/managementList';
import {RouterOutlet} from '@angular/router';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {UIChart} from 'primeng/chart';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [PanelMenuModule, ButtonModule, Card, TableModule, UIChart, TranslateModule],
  standalone:true,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit{


  barChartData: any;
  pieChartData: any;
  orders!: any[];

  ngOnInit() {
    this.barChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          label: 'Users',
          data: [65, 59, 80, 81],
          backgroundColor: '#42A5F5'
        }
      ]
    };

    this.pieChartData = {
      labels: ['classes', 'students', 'teachers'],
      datasets: [
        {
          data: [300, 500, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }
      ]
    };

    this.orders = [
      { id: 'ORD-1001', title: 'student', class: '1', status: 'active' },
      { id: 'ORD-1002', title: 'teacher', class: '2', status: 'active' },
      { id: 'ORD-1003', title: 'tracher', class: '3', status: 'active' },
      { id: 'ORD-1004', title: 'manager', class: '4', status: 'active' },
    ];
  }


}
