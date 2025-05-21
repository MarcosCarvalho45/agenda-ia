import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/auth.model'
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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

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

    this.authService.login(loginData.email, loginData.password).subscribe(
      (response: any) => {
        console.log('Usuário logado com sucesso:', response);
        // Redireciona para o dashboard após o login
        this.router.navigate(['/dashboard']);

        // Salva dados no localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('subscription', response.subscription);
        localStorage.setItem('subscriptionStatus', response.subscriptionStatus);
        localStorage.setItem('tenantId', response.tenantId);
        localStorage.setItem('subscriptionStart', new Date().toISOString());
      },
      (error) => {
        console.error('Erro ao logar:', error);
        this.errorMsg = 'Erro ao realizar o login. Tente novamente.';
      }
    );
  }


  onSubmit() {
    this.loginUser();
  }
}