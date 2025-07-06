export interface Appointment {
  id: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  customerId: string;
  customerName: string;
}
