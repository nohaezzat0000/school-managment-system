import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ManagementService, User } from '../../../../services/management';
@Component({
  selector: 'app-management',
  imports: [CommonModule, TableModule],
  templateUrl: './management.html',
  styleUrl: './management.css'
})
export class Management implements OnInit{
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private mangementService: ManagementService){

  }

  ngOnInit(): void {
    this.mangementService.getUsers().subscribe(data => {
      this.users = data;
    })
  }
}
