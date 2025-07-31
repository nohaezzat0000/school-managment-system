import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, ButtonModule, CardModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile {

}
