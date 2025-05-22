import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NovaAgendaComponent } from './components/agenda/nova-agenda/nova-agenda.component';
import { VisualizacaoAgendaComponent } from './components/agenda/visualizacao-agenda/visualizacao-agenda.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],},
     { path: 'agenda/nova', component: NovaAgendaComponent, canActivate: [AuthGuard] },
     { path: 'agenda/:id', component: VisualizacaoAgendaComponent, canActivate: [AuthGuard] },
     { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuard] },
     { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
     { path: '', redirectTo: 'login', pathMatch: 'full' },
     { path: '**', redirectTo: 'login' },
];
