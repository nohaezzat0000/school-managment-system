import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth-service';
import { SignupRequest } from '../auth-dtos';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DatePickerModule,
    TranslateModule,
  ],
  providers: [MessageService],
})
export class SignUp implements OnInit {
  signUpForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.signUpForm = this.fb.group(
      {
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: [null, [Validators.required, this.noFutureDateValidator]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  ngOnInit(): void {}

  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  private noFutureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && new Date(value) > new Date()) {
      return { futureDate: true };
    }
    return null;
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.signUpForm.disable();

      const signupRequest: SignupRequest = {
        username: this.signUpForm.get('username')?.value,
        firstName: this.signUpForm.get('firstName')?.value,
        lastName: this.signUpForm.get('lastName')?.value,
        dateOfBirth: this.formatDate(this.signUpForm.get('dateOfBirth')?.value),
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
        phoneNumber: this.signUpForm.get('phoneNumber')?.value,
      };

      this.authService.signup(signupRequest).subscribe({
        next: () => {
          this.isLoading = false;
          this.signUpForm.enable();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account created successfully!',
          });
          setTimeout(() => {
            this.router.navigate(['/auth/signin']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.signUpForm.enable();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Signup failed',
          });
        },
      });
    } else {
      this.signUpForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please complete all required fields correctly.',
      });
    }
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }

  get passwordMismatch(): boolean {
    return this.signUpForm.hasError('passwordsMismatch') &&
      this.signUpForm.get('confirmPassword')?.touched!;
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.signUpForm.get(fieldName);
    if (!field || !field.touched || !field.errors) return '';

    const errors = field.errors;

    if (errors['required']) return 'REQUIRED_FIELD';
    if (errors['email']) return 'INVALID_EMAIL';
    if (errors['minlength']) return 'PASSWORD_TOO_SHORT';
    if (errors['pattern'] && fieldName === 'phoneNumber') return 'PHONE_NUMBERS_ONLY';
    if (errors['futureDate']) return 'INVALID_DATE';

    return 'REQUIRED_FIELD';
  }
}
