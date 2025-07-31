import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private router: Router ) {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSignIn() {
    if (this.signInForm.valid) {
      console.log('Sign in data:', this.signInForm.value);
      this.router.navigate(['/admin/dashboard'])
    }
  }
}
