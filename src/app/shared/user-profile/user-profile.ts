import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, ButtonModule, CardModule, CommonModule,
    InputTextModule, AvatarModule, PanelModule, DividerModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile {
  user = {
    firstName: ' John',
    lastName: ' Doe',
    email: ' john.doe@example.com',
    phone: ' 0551234567',
    birthdate: new Date('1995-04-12'),
    job: ' Software Developer'
  };
  onEdit() {
    // Navigate to edit profile, or toggle edit mode
    console.log('Edit profile clicked');
  }}

