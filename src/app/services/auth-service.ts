import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUser = {
    id: 1,
    name: 'Ahmed',
    role: 'Admin'
  };

  getCurrentUser() {
    return this.mockUser;
  }
}
