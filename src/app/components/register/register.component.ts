import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Importe FormsModule para usar [(ngModel)]
import { CommonModule } from '@angular/common'; // Importe CommonModule para componentes standalone
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMsg = '';
  successMsg = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createFormRegisterUser();
  }

  createFormRegisterUser() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
      // tenantId será calculado automaticamente
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMsg = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    const { name, email, phone, password } = this.registerForm.value;

    // Geração automática do tenantId
    const cleanName = name.toLowerCase().replace(/\s+/g, '');
    const last4Digits = phone.slice(-4);
    const tenantId = `${cleanName}-${last4Digits}`;

    const payload = { name, email, phone, password, tenantId };

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.successMsg = 'Usuário registrado com sucesso!';
        this.errorMsg = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Erro ao registrar usuário.';
        this.successMsg = '';
      }
    });
  }

  criarNovaAgenda() {
    this.router.navigate(['/login']);
  }

}
