export interface IEvento {
  summary: string;
  location?: string;
  description?: string;
  start: {
    dateTime: string; // ISO 8601 com fuso, ex: 2025-05-23T10:00:00-03:00
    timeZone: string;  // ex: America/Sao_Paulo
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: { email: string }[];
  reminders?: {
    useDefault: boolean;
    overrides?: { method: string; minutes: number }[];
  };
}

export interface IAgenda {
  id?: string;          // id vindo do Mongo (_id), opcional no front
  userId: string;       // string, porque no front o ObjectId vira string
  tenantId: string;
  nomeAgenda: string;
  eventos: IEvento[];
  createdAt?: string;   // datas normalmente são strings ISO no JSON
  updatedAt?: string;
}
