import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment'; // ajuste o caminho conforme sua estrutura
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<User> {
    // Garante que a URL tem uma barra entre apiUrl e user/me
    const url = this.apiUrl.endsWith('/')
      ? `${this.apiUrl}user/me`
      : `${this.apiUrl}/user/me`;

    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>())
    );
  }

  updateUserProfile(data: { name: string; email: string; phone: string }): Observable<User> {
    const url = this.apiUrl.endsWith('/')
      ? `${this.apiUrl}user/profile`
      : `${this.apiUrl}/user/profile`;

    return this.http.put<User>(url, data).pipe(
      catchError(this.handleError<User>())
    );
  }

  private handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error('Ocorreu um erro:', error);
      return throwError(() => error);
    };
  }
}
