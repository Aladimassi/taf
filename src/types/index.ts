export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  minStock: number;
  maxStock: number;
  price: number;
  status: 'Stock optimal' | 'Stock critique' | 'En commande';
}

export interface StockEntry {
  id: string;
  productId: string;
  productName: string;
  supplier: string;
  quantity: number;
  minCommand: number;
  maxCommand: number;
  date: string;
  status: 'En attente' | 'Reçu' | 'Annulé';
  department: string;
}

export interface StockExit {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  department: string;
  reason: string;
  user: string;
  date: string;
}

export interface Department {
  id: string;
  name: string;
  canAddProducts: boolean;
  canViewAll: boolean;
}

export type TabType = 'dashboard' | 'products' | 'entries' | 'exits';