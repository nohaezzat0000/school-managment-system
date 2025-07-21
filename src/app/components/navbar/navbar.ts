import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  items: MenuItem[] = [];
  currentLang = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // Set the default language
    this.translate.use(this.currentLang);
    this.setDocumentDirection();

    // Load the translated labels for menu items
    this.updateMenuItems();

    // Update menu items when language changes
    this.translate.onLangChange.subscribe(() => {
      this.updateMenuItems();
      this.setDocumentDirection();
    });
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

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(this.currentLang);
    this.setDocumentDirection();
  }

  setDocumentDirection() {
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
}
