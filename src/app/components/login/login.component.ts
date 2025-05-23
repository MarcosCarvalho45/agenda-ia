import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createFormLoginUser();
  }

  createFormLoginUser() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Por favor, preencha os campos corretamente';
      return;
    }

    const loginData: IUser = this.loginForm.value;

    this.authService.login(loginData.email, loginData.password).subscribe({
      next: (response: any) => {
        console.log('Usuário logado com sucesso:', response);

        // Salva dados no localStorage corretamente, pegando do objeto user:
        localStorage.setItem('token', response.token);
        localStorage.setItem('subscription', response.user.subscription || 'free');
        localStorage.setItem('subscriptionStatus', response.user.subscriptionStatus || 'inactive');
        localStorage.setItem('tenantId', response.user.tenantId || '');
        localStorage.setItem('subscriptionStart', response.user.subscriptionStart || new Date().toISOString());

        // Agora redireciona para o dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Erro ao logar:', error);
        this.errorMsg = 'Erro ao realizar o login. Tente novamente.';
      }
    });
  }
  onSubmit() {
    this.loginUser();
  }

  criarConta() {
    this.router.navigate(['/register']);
  }
}
