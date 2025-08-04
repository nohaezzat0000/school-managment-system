import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'auth_token';
  private USER_KEY = 'auth_user';

  constructor() {}

  // Store token securely in localStorage
  public setToken(token: string): void {
    console.log('Storing token:', token); // Debug log
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
      console.log('Token stored successfully'); // Debug log
    } else {
      console.error('Attempted to store undefined/null token');
    }
  }

  // Retrieve token
  public getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log('Retrieved token from storage:', token); // Debug log
    return token;
  }

  // Remove token
  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    console.log('Tokens removed from storage'); // Debug log
  }

  // Check if token exists
  public hasToken(): boolean {
    const hasToken = this.getToken() !== null;
    console.log('Has token:', hasToken); // Debug log
    return hasToken;
  }

  // Store user data (optional - for user info)
  public setUser(user: any): void {
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  // Get user data
  public getUser(): any {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
}