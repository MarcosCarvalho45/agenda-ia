import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agenda } from '../../models/agenda.model';
import { AgendaService } from '../../services/agenda/agenda.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  agendas: Agenda[] = [];
  agendaGerada!: Agenda;

  constructor(private router: Router, private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.carregarAgendas();
  }

  criarNovaAgenda() {
    this.router.navigate(['/agenda/nova']);
  }

  carregarAgendas() {
    this.agendaService.getAgendas().subscribe({
      next: (data) => {
        console.log('Agendas recebidas:', data.agendas);
        this.agendas = data.agendas; // Corrigido aqui
      },
      error: (err) => {
        console.error('Erro ao carregar agendas:', err);
      }
    });
  }


}
