import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  logoMk = '/assets/logoMk.png'

  constructor(private router: Router) { }


  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToNovaAgenda() {
    this.router.navigate(['/agenda/nova']);
  }

  goToSubscription() {
    this.router.navigate(['/subscription']);
  }

  goToProfile() {
    this.router.navigate(['/user']);
  }

  logout() {
    localStorage.clear(); // ou apenas remova os itens relevantes
    this.router.navigate(['/login']); // ou a rota que você quiser
  }

}
