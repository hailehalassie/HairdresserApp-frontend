export interface GetBarbersTimetableResponse {
  barberId: string;
  date: string; // or Date, but keep as string for raw API
  slots: string[]; // ISO strings from backend
}
