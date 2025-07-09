import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../services/appointment.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class CreateAppointment implements OnInit {
  appointmentForm: FormGroup;
  services: any[] = [];
  barbers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      serviceId: ['', Validators.required],
      barberId: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }
  isFieldInvalid(field: string): boolean {
    const control = this.appointmentForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  ngOnInit() {
    this.appointmentService.getCreateAppointmentFormData().subscribe({
      next: (data) => {
        this.services = data.services;
        this.barbers = data.barbers;
      },
      error: (err) => {
        console.error('Error fetching form data', err);
        this.snackBar.open('Failed to load form data.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
      const token = localStorage.getItem('token');
      const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
      const customerId = payload?.nameid || ''; // Adjust based on your JWT

      const data = {
        ...formData,
        customerId,
      };
      this.appointmentService.createAppointment(data).subscribe({
        next: () => {
          this.snackBar.open('Appointment created!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.snackBar.open('Failed to create appointment.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }
}
