import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Agenda } from '../../models/agenda.model';

@Injectable({
  providedIn: 'root'
})

export class AgendaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createAgenda(prompt: string): Observable<{ agenda: Agenda }> {
    return this.http.post<{ agenda: Agenda }>(
      `${this.apiUrl}agenda/generate`,
      { prompt }
    ).pipe(
      catchError(this.handleError<{ agenda: Agenda }>())
    );
  }


  getAgendas(): Observable<{ agenda: Agenda }> {
    return this.http
      .get<{ agenda: Agenda }>(`${this.apiUrl}agenda/`)
      .pipe(
        retry(2),
        catchError(this.handleError<{ agenda: Agenda }>())
      );
  }

  private handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error('Ocorreu um erro:', error);
      return throwError(() => error);
    };
  }
}
