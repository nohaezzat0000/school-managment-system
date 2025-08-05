import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../appCommon/service/auth-service';
import { LoginRequest } from '../auth-dtos';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  providers:[MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './sign-in.html',
})
export class SignIn {
  signInForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignIn() {
    console.log('onSignIn called'); // Debug log
    console.log('Form valid:', this.signInForm.valid); // Debug log

    if (this.signInForm.valid) {
      this.isLoading = true;
      this.signInForm.disable();

      const loginRequest: LoginRequest = {
        username: this.signInForm.get('username')?.value,
        password: this.signInForm.get('password')?.value
      };

      console.log('Sending login request:', loginRequest); // Debug log

      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          console.log('Login success:', response); // Debug log
          this.isLoading = false;
          this.signInForm.enable();

          //sava user name
          // ✅ Save the token
          localStorage.setItem('token', response.accessToken);

          // ✅ Decode and save user name from token
          const payload = JSON.parse(atob(response.accessToken.split('.')[1]));
          localStorage.setItem('firstName', payload.firstName);
          localStorage.setItem('lastName', payload.lastName);

          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('SUCCESS'),
            detail: this.translateService.instant('LOGIN_SUCCESS')
          });

          // Redirect to dashboard after successful login
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 1500);
        },
        error: (error) => {
          console.error('Login error:', error); // Debug log
          this.isLoading = false;
          this.signInForm.enable();

          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('ERROR'),
            detail: error.message || this.translateService.instant('LOGIN_FAILED')
          });

          // Clear the password field on error
          this.signInForm.get('password')?.setValue('');
        }
      });
    } else {
      this.signInForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('WARNING'),
        detail: this.translateService.instant('PLEASE_COMPLETE_FORM')
      });
    }
  }
}
