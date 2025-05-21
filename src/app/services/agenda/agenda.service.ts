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

  createAgenda(agenda: Agenda): Observable<Agenda> {
    return this.http.post<Agenda>(
      `${this.apiUrl}/agenda/generate`,
      agenda
    );
  }

  getAgendasByUser(userId: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(
      `${this.apiUrl}/user/${userId}`
    );
  }
}
