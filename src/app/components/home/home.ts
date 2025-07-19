import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CardModule, ButtonModule, DividerModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
