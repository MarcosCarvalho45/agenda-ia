import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; // ajuste o caminho conforme sua estrutura
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  // adicione outros campos que sua API retorne
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse & { subscription: string, subscriptionStatus: string, subscriptionStart: string }> {
    const payload = { email, password };
    return this.http.post<LoginResponse & { subscription: string, subscriptionStatus: string, subscriptionStart: string }>(
      `${this.apiUrl}auth/login`,
      payload
    );
  }

  register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    tenantId: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    // ou outras ações de logout que queira
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
