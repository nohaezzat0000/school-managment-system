import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import {RouterLink} from '@angular/router';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule, TranslateModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  items: MenuItem[] = [];
  currentLang: string = 'en';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en';
    this.translate.use(this.currentLang);
    this.setDirection(this.currentLang);
  }

  ngOnInit() {

  }


  toggleLang() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(this.currentLang);
    this.setDirection(this.currentLang);
  }

  private setDirection(lang: string) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }

  updateMenuItems() {
    this.translate.get([
      'navbar.home',
      'navbar.products',
      'navbar.contact',
      'navbar.cart'
    ]).subscribe(translations => {
      this.items = [
        { label: translations['navbar.home'], icon: 'pi pi-home', routerLink: '/' },
        { label: translations['navbar.products'], icon: 'pi pi-box', routerLink: '/products' },
        { label: translations['navbar.contact'], icon: 'pi pi-envelope', routerLink: '/contact' },
        { label: translations['navbar.cart'], icon: 'pi pi-shopping-cart', routerLink: '/cart' }
      ];
    });
  }


}
