import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  imports: [CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DatePickerModule,
    TranslateModule,
   ],
  providers: [MessageService],
})
export class SignUp {
  signUpForm: FormGroup;
 
  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, [Validators.required, this.noFutureDateValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]] // Only numbers allowed
     }, {
      validators: this.passwordsMatchValidator
    });
  }
 
  // Custom validator for password matching
  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
 
  // Custom validator for future dates
  private noFutureDateValidator(control: AbstractControl): ValidationErrors | null{
    const value = control.value;
    if (value && new Date(value) > new Date()){
      return { futureDate: true};
    }
    return null;
  }
    
  onSignUp() {
    if (this.signUpForm.valid) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signed up!' });
      console.log(this.signUpForm.value);
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
 
  // Helper to detect password mismatch
  get passwordMismatch(): boolean {
    return this.signUpForm.hasError('passwordsMismatch') &&
           this.signUpForm.get('confirmPassword')?.touched!;
  }

  // Helper method to get error message for a field
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