import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface BreadcrumbItem {
  label: string;
  routerLink?: string;
  icon?: string;
}

@Component({
  selector: 'app-appbreadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './appbreadcrumb.html',
  styleUrl: './appbreadcrumb.css'
})
export class Appbreadcrumb {
  home: BreadcrumbItem = {
    label: '',
    icon: 'pi pi-home',
    routerLink: '/'
  };

  items: BreadcrumbItem[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.items = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
        const label = child.snapshot.data['breadcrumb'];
        if (label) {
          breadcrumbs.push({
            label,
            routerLink: url
          });
        }
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

}
