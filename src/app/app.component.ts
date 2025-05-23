import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Mk Pro Planner';

  constructor(public router: Router) { }

  get showSidebar(): boolean {
    // Ajuste os caminhos conforme suas rotas
    const hiddenRoutes = ['/', '/login', '/register'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
