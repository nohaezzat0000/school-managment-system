import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  items: MenuItem[] = [];

  ngOnInit() {
   /* this.items = [
      { label: 'Sign In', routerLink: '/' },
      { label: 'Get Started', routerLink: '/' }
    ];*/
  }
}
