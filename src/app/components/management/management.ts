import {Component, OnInit} from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule} from '@angular/common';
import { ManagerService  } from '../../services/manager';

@Component({
  selector: 'app-management',
  imports: [TableModule, CommonModule],
  standalone: true,
  templateUrl: './management.html',
  styleUrl: './management.css'
})
export class Management implements OnInit{

  Managers: any[] = [];
  cols: any[] = [];

  constructor(private managerService: ManagerService ) {}

  ngOnInit(): void {
    // Define table columns (dynamic)
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' }
    ];
    this.managerService.getManagers().subscribe({
      next: (response) => {
        this.Managers = response.managers;
      },
      error: (err) => {
        console.error('Error fetching managers:', err);
      }
    });


}}
