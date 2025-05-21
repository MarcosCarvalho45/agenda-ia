export type SubscriptionType = 'free' | 'start' | 'platinum';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete';

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  tenantId: string;
  subscription: SubscriptionType;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionCurrentPeriodEnd?: string; // datas geralmente no Angular vêm como string ISO
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

// Classe opcional para instanciar usuários
export class User implements IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  tenantId: string;
  subscription: SubscriptionType;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionCurrentPeriodEnd?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;

  constructor(data: IUser) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
    this.tenantId = data.tenantId;
    this.subscription = data.subscription;
    this.subscriptionStatus = data.subscriptionStatus;
    this.subscriptionCurrentPeriodEnd = data.subscriptionCurrentPeriodEnd;
    this.stripeCustomerId = data.stripeCustomerId;
    this.stripeSubscriptionId = data.stripeSubscriptionId;
  }
}
