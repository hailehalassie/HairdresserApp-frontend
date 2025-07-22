import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
// import { h } from '../../../../../node_modules/@angular/material/module.d-bebo7gS5';
// import { M } from '../../../../../node_modules/@angular/material/option.d-BcvS44bt';

export interface Barber {
  id: string;
  fullName: string;
}

@Component({
  selector: 'app-barber-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './barber-select.html',
  styleUrls: ['./barber-select.scss'],
})
export class BarberSelectComponent implements OnInit {
  barbers: Barber[] = [];
  selectedBarberId: string = '';

  @Output() barberSelected = new EventEmitter<string>();

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    // this.barberService.getAllBarbers().subscribe((data) => {
    //   this.barbers = data;
    // });
    this.appointmentService.getCreateAppointmentFormData().subscribe({
      next: (data) => {
        // this.services = data.services;
        this.barbers = data.barbers;
      },
      // error: (err) => {
      //   console.error('Error fetching form data', err);
      //   this.snackBar.open('Failed to load form data.', 'Close', {
      //     duration: 3000,
      //     panelClass: ['snackbar-error'],
      //   });
      // },
    });
  }

  // onBarberChange(): void {
  //   this.barberSelected.emit(this.selectedBarberId);
  // }

  onBarberChange(barberId: string): void {
    this.selectedBarberId = barberId;
    console.log('Emitting barber ID:', barberId); // ✅ Add log
    this.barberSelected.emit(barberId);
  }
}
