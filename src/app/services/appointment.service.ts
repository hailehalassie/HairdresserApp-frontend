import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private baseUrl = 'http://localhost:5144/api/appointments';

  constructor(private http: HttpClient) {}

  getAppointmentsForBarber(barberId: string): Observable<Appointment[]> {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Appointment[]>(`${this.baseUrl}/barber/${barberId}`);
  }

  getAppointmentsForCustomer(customerId: string): Observable<Appointment[]> {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Appointment[]>(
      `${this.baseUrl}/customer/${customerId}`
    );
  }

  getCreateAppointmentFormData(): Observable<any> {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/create-form-data`);
  }

  createAppointment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  cancelAppointment(appointmentId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/cancel/${appointmentId}`, {});
  }

  // getTimetable(
  //   barberId: string,
  //   date: string
  // ): Observable<GetBarbersTimetableResponse>;
}
