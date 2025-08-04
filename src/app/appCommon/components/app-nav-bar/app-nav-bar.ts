import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-app-nav-bar',
  standalone: true,
  imports: [MenubarModule, BadgeModule, CommonModule, AvatarModule, TranslateModule],
  templateUrl: './app-nav-bar.html',
  styleUrl: './app-nav-bar.css'
})
export class AppNavBar {
  currentLang: string = 'en';

  items: MenuItem[] = [
    {
      label: `
      <div style="display: flex; align-items: center; justify-content: space-between; width: 200px;">
        <div style="display: flex; flex-direction: column; text-align: left;">
          <span style="font-weight: bold;">Ahmed</span>
          <span style="font-size: 12px; color: gray;">Administrator</span>
        </div>
        <p-avatar image="assets/avatar.png" shape="circle" size="large"></p-avatar>
      </div>
    `, escape: false,
      items: [
        {label: 'Home', icon: 'pi pi-home', routerLink: ''},
        {label: 'Profile', icon: 'pi pi-user', routerLink: '/admin/profile'},
        {label: 'sign-out', icon: 'pi pi-sign-out'}
      ]
    },
    {
      icon: 'pi pi-bell'
    }
  ];
  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en';
    this.translate.use(this.currentLang);
    this.setDirection(this.currentLang);
  }

  home = { icon: 'pi pi-home' };
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
}
