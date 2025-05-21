import { Component } from '@angular/core';
import { AgendaService } from '../../../services/agenda/agenda.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private agendaService: AgendaService) {}

  
  gerarAgenda() {
    this.error = null;
    this.loading = true;

    this.agendaService.gerarAgenda(this.prompt).subscribe({
      next: (res: { agendas: any[]; }) => {
        this.agendas = res.agendas;
        this.loading = false;
      },
      error: (err: { error: { message: string; }; }) => {
        this.error = err.error?.message || 'Erro ao gerar agenda';
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
