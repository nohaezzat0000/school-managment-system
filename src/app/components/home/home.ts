import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [CardModule, ButtonModule, DividerModule, RouterModule, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
