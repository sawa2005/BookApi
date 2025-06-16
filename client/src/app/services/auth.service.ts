import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/Auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }) {
    return this.http
      .post<{ token: string; expiration: string }>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('expiration', response.expiration);
          localStorage.setItem('username', credentials.username);
        })
      );
  }

  register(user: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const expiration = localStorage.getItem('expiration');

    if (!token || !expiration) {
      return false;
    }

    const expiresAt = new Date(expiration).getTime();
    const now = Date.now();

    if (now > expiresAt) {
      this.logout(); // Token expired, log out
      return false;
    }

    return true; // Token is valid
  }
}
