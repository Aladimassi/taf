import { Department } from '../types';

export const departments: Department[] = [
  {
    id: 'technique',
    name: 'Département Technique',
    canAddProducts: true,
    canViewAll: true
  },
  {
    id: 'qualite',
    name: 'Qualité',
    canAddProducts: false,
    canViewAll: false
  },
  {
    id: 'production',
    name: 'Production',
    canAddProducts: false,
    canViewAll: false
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    canAddProducts: false,
    canViewAll: false
  },
  {
    id: 'administration',
    name: 'Administration',
    canAddProducts: false,
    canViewAll: false
  }
];