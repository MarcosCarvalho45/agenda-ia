import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';  // ajuste o caminho conforme seu projeto

@Component({
  selector: 'app-user',
  standalone: true,               // se for standalone component
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']  // corrigido de styleUrl para styleUrls
})
export class UserComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    phone: '',
    tenantId: '',
    subscription: 'free',
    subscriptionStart: new Date()
  };

  mensagemSucesso = '';
  mensagemErro = '';

  isLoading = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.user = {
          ...user,
          subscriptionStart: user.subscriptionStart ? new Date(user.subscriptionStart) : new Date()
        };
      },
      error: (err) => {
        console.error('Erro ao carregar usuário:', err);
        this.mensagemErro = 'Erro ao carregar dados do usuário.';
      }
    });
  }

  salvarAlteracoes(): void {
    this.isLoading = true;
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.userService.updateUserProfile(this.user).subscribe({
      next: () => {
        this.isLoading = false;
        this.mensagemSucesso = 'Dados atualizados com sucesso!';
      },
      error: (err) => {
        console.error('Erro ao salvar alterações:', err);
        this.isLoading = false;
        this.mensagemErro = 'Erro ao salvar alterações.';
      }
    });
  }

}
