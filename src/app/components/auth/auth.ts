import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import {Toast} from 'primeng/toast';
import { Router } from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
@Component({
  selector: 'app-auth',
  providers: [MessageService],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    Toast,
    TranslatePipe
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  activeTab: 'signin' | 'signup' = 'signin';
  signInForm: FormGroup;
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signUpForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignIn() {
    if (this.signInForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid login credentials'
      });
    } else {
      this.router.navigate(['/dashboard']); // only for now we will validate it later
    }
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Please check your email to verify your account.',
      });
    }
  }

  switchTab(tab: 'signin' | 'signup') {
    this.activeTab = tab;
  }
}
