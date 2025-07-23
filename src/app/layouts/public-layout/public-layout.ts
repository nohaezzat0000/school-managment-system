import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../../components/navbar/navbar';

@Component({
  selector: 'app-public-layout',
  imports: [
    RouterOutlet,
    Navbar
  ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css'
})
export class PublicLayout {

}
