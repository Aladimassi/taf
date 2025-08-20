import { useState } from 'react';
import { Plus } from 'lucide-react';
import { StockEntry, Product, Department } from '../types';
import { EntryModal } from './EntryModal';

interface EntriesTabProps {
  entries: StockEntry[];
  products: Product[];
  onAddEntry: (entry: Omit<StockEntry, 'id'>) => void;
  currentDepartment: Department;
}

export function EntriesTab({ entries, products, onAddEntry, currentDepartment }: EntriesTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEntries = currentDepartment.canViewAll 
    ? entries 
    : entries.filter(entry => entry.department === currentDepartment.id);

  const handleAddEntry = (entryData: Omit<StockEntry, 'id'>) => {
    onAddEntry(entryData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-green-600">↓</div>
          <h2 className="text-2xl font-bold text-gray-900">Entrées de Stock</h2>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle Entrée</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fournisseur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Limites Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                {currentDepartment.canViewAll && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Département
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.productName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-2xl font-bold text-green-600">+{entry.quantity}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Min: {entry.minCommand} | Max: {entry.maxCommand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(entry.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      entry.status === 'Reçu' 
                        ? 'bg-green-100 text-green-800'
                        : entry.status === 'En attente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  {currentDepartment.canViewAll && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {entry.department}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <EntryModal
          products={products}
          currentDepartment={currentDepartment}
          onSave={handleAddEntry}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}