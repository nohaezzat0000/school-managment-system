import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean{

     const user = this.authService.getCurrentUser();
    if(!user){
      this.router.navigate(['/'])
      return false;
    }

    //Allow access
    return true;
  }
  
}
