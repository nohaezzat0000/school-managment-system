import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiUrls } from '../appCommon/ApisUrl/api-urls';
import { TokenService } from './token-service';
import { LoginRequest, SignupRequest, AuthResponse, ApiError } from '../components/auth/auth-dtos';
export interface UserResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(ApiUrls.LOGIN, loginRequest)
      .pipe(
        tap(response => {
          // Store the token when login is successful
          this.tokenService.setToken(response.accessToken);
        }),
        catchError(this.handleError)
      );
  }

  signup(signupRequest: SignupRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(ApiUrls.SIGNUP, signupRequest)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  isLoggedIn(): boolean {
    return this.tokenService.getToken() !== null;
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid username or password';
          break;
        case 409:
          errorMessage = 'Username already exists';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later';
          break;
        default:
          errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
      }
    }
    
    const apiError: ApiError = {
      message: errorMessage,
      status: error.status || 0
    };
    
    return throwError(() => apiError);
  };
}