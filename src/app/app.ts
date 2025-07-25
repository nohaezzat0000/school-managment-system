import { Component, signal } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showNavbar = true;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.startsWith('/admin');
      }
    });
  }
}
