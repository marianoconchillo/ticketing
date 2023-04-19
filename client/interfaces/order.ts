export interface IOrder {
  userId: string;
  status: string;
  expiresAt: string;
  ticket: Ticket;
  version: number;
  id: string;
}

interface Ticket {
  title: string;
  price: number;
  version: number;
  id: string;
}
