import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { getDecodedToken } from '../../services/token.util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
// export class Dashboard {
//   appointments: Appointment[] = [];
//   role: string = '';

//   constructor(
//     private appointmentService: AppointmentService,
//     private snackBar: MatSnackBar,
//     private dialog: MatDialog
//   ) {}

//   ngOnInit(): void {
//     const decodedToken = getDecodedToken();
//     if (!decodedToken) return;

//     this.role = decodedToken.role;

//     if (this.role === 'Barber') {
//       this.appointmentService
//         .getAppointmentsForBarber(decodedToken.nameid)
//         .subscribe({
//           next: (data) => (this.appointments = data),
//         });
//     } else if (this.role === 'Customer') {
//       this.appointmentService
//         .getAppointmentsForCustomer(decodedToken.nameid)
//         .subscribe({
//           next: (data) => (this.appointments = data),
//         });
//     }
//   }

//   cancelAppointment(id: string) {
//     const dialogRef = this.dialog.open(ConfirmDialog, {
//       data: { message: 'Are you sure you want to cancel this appointment?' },
//     });
//     dialogRef.afterClosed().subscribe((confirmed: boolean) => {
//       if (confirmed) {
//         this.appointmentService.cancelAppointment(id).subscribe({
//           next: () => {
//             this.snackBar.open('Appointment cancelled successfully', 'Close', {
//               duration: 3000,
//               panelClass: ['snackbar-success'],
//             });
//             const decodedToken = getDecodedToken();
//             if (!decodedToken) return;
//             this.appointmentService
//               .getAppointmentsForCustomer(decodedToken.nameid)
//               .subscribe({
//                 next: (data) => (this.appointments = data),
//               });
//           },
//           error: () => {
//             this.snackBar.open('Failed to cancel appointment', 'Close', {
//               duration: 3000,
//               panelClass: ['snackbar-error'],
//             });
//           },
//         });
//       }
//     });
//   }
// }
export class Dashboard {
  appointments: Appointment[] = [];
  role: string = '';
  displayedColumns: string[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const decodedToken = getDecodedToken();
    if (!decodedToken) return;

    this.role = decodedToken.role;

    this.displayedColumns = ['start', 'end', 'service'];

    if (this.role === 'Barber') {
      this.displayedColumns.push('customer');
      this.appointmentService
        .getAppointmentsForBarber(decodedToken.nameid)
        .subscribe({
          next: (data) => (this.appointments = data),
        });
    } else if (this.role === 'Customer') {
      this.displayedColumns.push('barber');
      this.appointmentService
        .getAppointmentsForCustomer(decodedToken.nameid)
        .subscribe({
          next: (data) => (this.appointments = data),
        });
    }

    this.displayedColumns.push('actions');
  }

  cancelAppointment(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { message: 'Are you sure you want to cancel this appointment?' },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.appointmentService.cancelAppointment(id).subscribe({
          next: () => {
            this.snackBar.open('Appointment cancelled successfully', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
            this.refreshAppointments();
          },
          error: () => {
            this.snackBar.open('Failed to cancel appointment', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  private refreshAppointments() {
    const decodedToken = getDecodedToken();
    if (!decodedToken) return;

    const serviceCall =
      this.role === 'Barber'
        ? this.appointmentService.getAppointmentsForBarber(decodedToken.nameid)
        : this.appointmentService.getAppointmentsForCustomer(
            decodedToken.nameid
          );

    serviceCall.subscribe({
      next: (data) => (this.appointments = data),
    });
  }
}
