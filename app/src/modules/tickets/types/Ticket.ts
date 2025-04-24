export interface Ticket {
  _id: string;
  products: Product[];
  ticket_date: string;
  total: string;
  totalCalc: number;
  invoiceId: string;
}

export interface Product {
  cantidad: string;
  producto: string;
  precioPorKg: string;
  peso: string;
  precio: string;
  unitPrice: number;
}

export interface SearchProduct {
  last_date: string;
  last_price: number;
  product: string;
}
