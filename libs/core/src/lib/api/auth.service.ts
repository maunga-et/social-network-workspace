import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

interface LoginResponse {
  access_token: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://test.esolutions.co.zw/postify-api/auth';

  private readonly http = inject(HttpClient);

  login(username: string, password: string): Observable<LoginResponse> {
    const body = new HttpParams().set('username', username).set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      body.toString(),
      { headers }
    );
  }

  register(
    user: User
  ): Observable<{ username: string; created_at: string; updated_at: string }> {
    return this.http.post<{
      username: string;
      created_at: string;
      updated_at: string;
    }>(`${this.apiUrl}/register`, user);
  }

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}
