import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService, // ✅ Inject AuthService
    private snackBar: MatSnackBar, // ✅ Inject MatSnackBar for notifications
    private router: Router // ✅ Inject Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          localStorage.setItem('token', res.token);
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'], // Use Angular Material styles
          });
          this.router.navigate(['/dashboard']); // Redirect after login
          console.log('Form submitted', this.loginForm.value);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.snackBar.open(
            'Login failed. Please check your credentials.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'], // Use Angular Material styles
            }
          );
        },
      });
    }
  }
}
