import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
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

  getAgendasByUser(userId: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(
      `${this.apiUrl}/user/${userId}`
    );
  }
}
