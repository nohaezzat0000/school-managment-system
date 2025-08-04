import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { UserService } from '../../service/userService/user';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, ButtonModule, CardModule, CommonModule,
    InputTextModule, AvatarModule, PanelModule, DividerModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit{

  user: any = null;
constructor( private userService: UserService) {
}
ngOnInit() {
  this.userService.getUserProfile().subscribe({
    next: (data) => {
      data.birthdate = new Date(data.birthdate);
      this.user = data;
    },
    error: (err) => {
      console.error('Failed to load user profile:', err);
    }
  });
}
onEdit() {
    // Navigate to edit profile, or toggle edit mode
    console.log('Edit profile clicked');
  }
}

