import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; // ajuste o caminho conforme sua estrutura
import { Observable } from 'rxjs';
import { User } from '../../models/auth.model';

export interface LoginResponse {
  token: string;
  subscription: string;
  subscriptionStatus: string;
  tenantId: string;
  // Não inclui subscriptionStart porque você gera localmente
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const payload = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/login`, payload);
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
    // remova outros dados se quiser
    localStorage.removeItem('subscription');
    localStorage.removeItem('subscriptionStatus');
    localStorage.removeItem('tenantId');
    localStorage.removeItem('subscriptionStart');
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
