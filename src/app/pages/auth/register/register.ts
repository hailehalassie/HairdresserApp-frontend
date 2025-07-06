import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { last } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar for notifications
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Customer', Validators.required], // Default role selected
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          }); // Use Angular Material styles)
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Register failed:', err);
          this.snackBar.open(
            'Registration failed. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
            }
          ); // Use Angular Material styles
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
