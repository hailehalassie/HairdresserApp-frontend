import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  role: string;
  email: string;
  nameid: string; // user id
  exp: number;
  [key: string]: any;
}

export function getDecodedToken(): DecodedToken | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (e) {
    console.error('Invalid token:', e);
    return null;
  }
}
