import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IAgenda } from '../../models/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createAgenda(prompt: string): Observable<{ agenda: IAgenda }> {
    return this.http.post<{ agenda: IAgenda }>(
      `${this.apiUrl}agenda/generate`,
      { prompt }
    ).pipe(
      catchError(this.handleError<{ agenda: IAgenda }>)
    );
  }

  getAgendas(): Observable<{ agendas: IAgenda[]; message: string }> {
    return this.http.get<{ agendas: IAgenda[]; message: string }>(
      `${this.apiUrl}agenda/`
    ).pipe(
      retry(2),
      catchError(this.handleError<{ agendas: IAgenda[]; message: string }>)
    );
  }

  getAgendaById(_id: string): Observable<{ agenda: IAgenda }> {
    return this.http.get<{ agenda: IAgenda }>(
      `${this.apiUrl}agenda/${_id}`
    ).pipe(
      catchError(this.handleError<{ agenda: IAgenda }>)
    );
  }

  deleteAgenda(_id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}agenda/${_id}`
    ).pipe(
      catchError(this.handleError<void>)
    );
  }

  private handleError<T>(error: HttpErrorResponse): Observable<T> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => error);
  }
}
