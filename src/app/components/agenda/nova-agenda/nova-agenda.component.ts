import { Component } from '@angular/core';
import { AgendaService } from '../../../services/agenda/agenda.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Agenda } from '../../../models/agenda.model';

@Component({
  selector: 'app-nova-agenda',
  imports: [FormsModule, CommonModule],
  templateUrl: './nova-agenda.component.html',
  styleUrl: './nova-agenda.component.scss'
})
export class NovaAgendaComponent {

  prompt: string = '';
  agendas: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private agendaService: AgendaService) { }

  gerarAgenda() {
    this.error = null;
    this.loading = true;

    this.agendaService.createAgenda(this.prompt).subscribe({
      next: (res: { agendas: Agenda[] } | Agenda[]) => {
        // Se vier como objeto com 'agendas'
        if ('agendas' in res) {
          this.agendas = res.agendas;
        } else {
          // Se vier diretamente como array
          this.agendas = res;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao criar agenda:', err);
        this.loading = false;
      }
    });
  }


  formatDateTime(data: string, hora: string): string {
    // Junta data + hora num Date válido
    const dt = new Date(`${data}T${hora}:00`);
    return dt.toLocaleString(); // ou customize conforme sua necessidade
  }

}
