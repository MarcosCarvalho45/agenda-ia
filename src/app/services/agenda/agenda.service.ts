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

  createAgenda(prompt: string): Observable<{ agendas: Agenda[] }> {
    return this.http.post<{ agendas: Agenda[] }>(
      `${this.apiUrl}agenda/generate`,
      { prompt }
    );
  }

  getAgendas(): Observable<Agenda[]> {
    return this.http
      .get<Agenda[]>(`${this.apiUrl}agenda/`)
      .pipe(
        retry(2),
        catchError(this.handleError<Agenda[]>())
      );
  }

  private handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error('Ocorreu um erro:', error);
      return throwError(() => error);
    };
  }
}
