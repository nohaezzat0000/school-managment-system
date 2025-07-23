import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ManagementService, User } from '../../../../../../services/management';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-management',
  imports: [CommonModule, TableModule, InputTextModule, IconFieldModule, InputIconModule],
  templateUrl: './managementList.html',
  styleUrl: './managementList.css'
})
export class ManagementList implements OnInit{
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private mangementService: ManagementService){

  }

  ngOnInit(): void {
    this.mangementService.getUsers().subscribe(data => {
      this.users = data;
    })
  }
  clear(table: Table){
    table.clear();
  }
}
