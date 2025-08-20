import { Product, StockEntry, StockExit } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'pince',
    description: 'pince 215',
    stock: 3,
    minStock: 10,
    maxStock: 50,
    price: 7.50,
    status: 'Stock critique'
  },
  {
    id: '2',
    name: 'lampe',
    description: 'lampe bureau',
    stock: 6,
    minStock: 2,
    maxStock: 10,
    price: 10.00,
    status: 'Stock optimal'
  },
  {
    id: '3',
    name: 'Cable.68',
    description: 'Cable - Cable NYY 3*2.5 mm2',
    stock: 380,
    minStock: 0,
    maxStock: 1000,
    price: 0.00,
    status: 'Stock optimal'
  }
];

export const mockEntries: StockEntry[] = [
  {
    id: '1',
    productId: '1',
    productName: 'pince',
    supplier: 'Monastir',
    quantity: 40,
    minCommand: 5,
    maxCommand: 45,
    date: '2025-08-19',
    status: 'En attente',
    department: 'technique'
  }
];

export const mockExits: StockExit[] = [
  {
    id: '1',
    productId: '2',
    productName: 'lampe',
    quantity: 3,
    department: 'administration',
    reason: 'Installation nouvelle',
    user: 'ooo',
    date: '2025-08-19'
  },
  {
    id: '2',
    productId: '1',
    productName: 'pince',
    quantity: 1,
    department: 'production',
    reason: 'Réparation équipement',
    user: '',
    date: '2025-08-19'
  },
  {
    id: '3',
    productId: '1',
    productName: 'pince',
    quantity: 1,
    department: 'qualite',
    reason: 'Autre',
    user: '',
    date: '2025-08-19'
  },
  {
    id: '4',
    productId: '3',
    productName: 'Cable.68',
    quantity: 20,
    department: 'qualite',
    reason: 'Installation nouvelle',
    user: '',
    date: '2025-08-20'
  }
];