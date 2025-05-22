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
  agendaGerada: any = null;

  constructor(private agendaService: AgendaService) { }

  gerarAgenda() {
    this.loading = true;
    this.error = '';
    this.agendaGerada = null;

    this.agendaService.createAgenda(this.prompt).subscribe({
      next: (res) => {
        console.log('Resposta da IA:', res);
        if (res && res.agenda) {
          this.agendaGerada = res.agenda;
          this.loading = false;
        } else {
          this.error = 'Nenhuma agenda foi gerada.';
        }
      },
      error: (err) => {
        this.error = 'Erro ao gerar agenda. Tente novamente.';
        console.error(err);
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
