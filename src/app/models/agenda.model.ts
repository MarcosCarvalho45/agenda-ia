export interface Agenda {
  _id?: string;
  userId: string;
  title: string;
  description?: string;
  date: string; // string ISO para compatibilidade com o input[type="date"]
  createdAt?: string;
  updatedAt?: string;
}