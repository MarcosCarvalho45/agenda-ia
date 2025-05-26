import { Component } from '@angular/core';
import { AgendaService } from '../../../services/agenda/agenda.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAgenda } from '../../../models/agenda.model';

@Component({
  selector: 'app-nova-agenda',
  imports: [FormsModule, CommonModule],
  templateUrl: './nova-agenda.component.html',
  styleUrls: ['./nova-agenda.component.scss']
})
export class NovaAgendaComponent {

  prompt: string = '';
  agendas: IAgenda[] = [];
  loading: boolean = false;
  error: string | null = null;
  agendaGerada: IAgenda | null = null;

  mostrarAvancadas: boolean = false;

  // Campos avançados
  periodo: string = '';
  preferenciaHorario: string = '';
  objetivoPrincipal: string = '';

  constructor(private agendaService: AgendaService) { }

  gerarAgenda(): void {
    this.loading = true;
    this.error = null;
    this.agendaGerada = null;

    // Monta o prompt completo juntando o básico + campos avançados
    let promptCompleto = this.prompt;

    if (this.periodo.trim()) {
      promptCompleto += `\nPeríodo: ${this.periodo.trim()}`;
    }
    if (this.preferenciaHorario.trim()) {
      promptCompleto += `\nPreferência de horário: ${this.preferenciaHorario.trim()}`;
    }
    if (this.objetivoPrincipal.trim()) {
      promptCompleto += `\nObjetivo principal: ${this.objetivoPrincipal.trim()}`;
    }

    this.agendaService.createAgenda(promptCompleto).subscribe({
      next: (res) => {
        if (res && res.agenda) {
          this.agendaGerada = res.agenda as IAgenda;
        } else {
          this.error = 'Nenhuma agenda foi gerada.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao gerar agenda. Tente novamente.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  formatDateTime(data: string, hora: string): string {
    const dt = new Date(`${data}T${hora}:00`);
    return dt.toLocaleString();
  }

  toggleAvancadas(): void {
    this.mostrarAvancadas = !this.mostrarAvancadas;
  }

  organizarEventosPorDia(eventos: Array<{ start: { dateTime: string }; summary?: string; description?: string }>): Array<{ data: Date; eventos: any[] }> {
    if (!eventos) return [];

    // Agrupa eventos por dia (string YYYY-MM-DD)
    const agrupados = eventos.reduce((acc, evento) => {
      const dataEvento = new Date(evento.start.dateTime);
      const diaChave = dataEvento.toISOString().split('T')[0];

      if (!acc[diaChave]) {
        acc[diaChave] = { data: dataEvento, eventos: [] };
      }
      acc[diaChave].eventos.push(evento);
      return acc;
    }, {} as Record<string, { data: Date; eventos: any[] }>);

    // Retorna array ordenado por data
    return Object.values(agrupados).sort((a, b) => a.data.getTime() - b.data.getTime());
  }

}
