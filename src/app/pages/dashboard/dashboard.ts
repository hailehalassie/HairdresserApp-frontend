import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDecodedToken } from '../../services/token.util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  role: string = '';
  email: string = '';
  userId: string = '';

  constructor() {
    const token = getDecodedToken();
    if (token) {
      this.role = token.role;
      this.email = token.email;
      this.userId = token.nameid;
    }
  }
}
