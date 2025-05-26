import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAgenda } from '../../models/agenda.model';
import { AgendaService } from '../../services/agenda/agenda.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  agendas: IAgenda[] = [];
  totalAtividades: number = 0;

  constructor(
    private router: Router,
    private agendaService: AgendaService
  ) {}

  ngOnInit(): void {
    this.carregarAgendas();
  }

  criarNovaAgenda(): void {
    this.router.navigate(['/agenda/nova']);
  }

  carregarAgendas(): void {
    this.agendaService.getAgendas().subscribe({
      next: (data) => {
        this.agendas = data.agendas;
        console.log(this.agendas)
        this.totalAtividades = this.agendas.reduce(
          (acc, agenda) => acc + (agenda.eventos?.length || 0),
          0
        );
      },
      error: (err) => {
        console.error('Erro ao carregar agendas:', err);
      }
    });
  }

  verAgenda(id: string): void {
    this.router.navigate(['/agenda/viwer', id]);
  }

  excluirAgenda(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta agenda?')) {
      this.agendaService.deleteAgenda(id).subscribe({
        next: () => {
          this.agendas = this.agendas.filter(agenda => agenda._id !== id);
          this.totalAtividades = this.agendas.reduce(
            (acc, agenda) => acc + (agenda.eventos?.length || 0),
            0
          );
        },
        error: (err) => {
          console.error('Erro ao excluir agenda:', err);
        }
      });
    }
  }
}
