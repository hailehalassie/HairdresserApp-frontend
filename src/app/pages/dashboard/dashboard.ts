import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { getDecodedToken } from '../../services/token.util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  appointments: Appointment[] = [];
  role: string = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    const decodedToken = getDecodedToken();
    if (!decodedToken) return;

    this.role = decodedToken.role;

    if (this.role === 'Barber') {
      this.appointmentService
        .getAppointmentsForBarber(decodedToken.nameid)
        .subscribe({
          next: (data) => (this.appointments = data),
        });
    } else if (this.role === 'Customer') {
      this.appointmentService
        .getAppointmentsForCustomer(decodedToken.nameid)
        .subscribe({
          next: (data) => (this.appointments = data),
        });
    }
  }
}
