export interface User {
  name: string;
  email: string;
  phone: string;
  password?: string;
  tenantId: string;
  subscription: 'free' | 'start' | 'platinum';
  subscriptionStart: string | Date; // geralmente vem como string do backend, pode converter para Date no componente
  subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete';
  subscriptionCurrentPeriodEnd?: string | Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}
