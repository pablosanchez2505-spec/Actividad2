export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export type ClientInput = Omit<Client, 'id'>;
