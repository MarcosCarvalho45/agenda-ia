import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export type SubscriptionType = 'free' | 'start' | 'platinum';
export type SubscriptionStatus = 'active' | 'inativo' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      // Executando no SSR — não pode usar localStorage
      return this.router.parseUrl('/login');
    }

    const token = this.authService.getToken();
    const subscription = localStorage.getItem('subscription') as SubscriptionType | null;
    const subscriptionStatus = localStorage.getItem('subscriptionStatus') as SubscriptionStatus | null;
    const subscriptionStartStr = localStorage.getItem('subscriptionStart');

    // Se não tem token ou status inativo, manda pro login
    if (!token || subscriptionStatus !== 'active') {
      return this.router.parseUrl('/login');
    }

    if (!subscription) {
      // Sem assinatura definida, manda pro login ou página de erro
      return this.router.parseUrl('/login');
    }

    // Lógica para assinatura free com trial 7 dias
    if (subscription === 'free') {
      if (!subscriptionStartStr) {
        // Se não tiver data de início, considerar inválido
        return this.router.parseUrl('/upgrade');
      }

      const subscriptionStart = new Date(subscriptionStartStr);
      const now = new Date();
      const diffMs = now.getTime() - subscriptionStart.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      if (diffDays > 7) {
        // Trial expirou, manda para upgrade
        return this.router.parseUrl('/upgrade');
      }

      // Trial válido, permite acesso
      return true;
    }

    // Start e platinum têm acesso liberado
    if (subscription === 'start' || subscription === 'platinum') {
      return true;
    }

    // Se chegar aqui, bloqueia acesso
    return this.router.parseUrl('/login');
  }
}