import { useState } from 'react';
import { Plus, User } from 'lucide-react';
import { StockExit, Product, Department } from '../types';
import { ExitModal } from './ExitModal';

interface ExitsTabProps {
  exits: StockExit[];
  products: Product[];
  onAddExit: (exit: Omit<StockExit, 'id'>) => void;
  currentDepartment: Department;
}

export function ExitsTab({ exits, products, onAddExit, currentDepartment }: ExitsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredExits = currentDepartment.canViewAll 
    ? exits 
    : exits.filter(exit => exit.department === currentDepartment.id);

  const handleAddExit = (exitData: Omit<StockExit, 'id'>) => {
    onAddExit(exitData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-red-600">↑</div>
          <h2 className="text-2xl font-bold text-gray-900">Sorties de Stock</h2>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle Sortie</span>
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
                  Quantité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motif
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExits.map((exit) => {
                return (
                  <tr key={exit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{exit.productName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-2xl font-bold text-red-600">-{exit.quantity}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-6 w-6">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                            exit.department === 'administration' ? 'bg-blue-500' :
                            exit.department === 'production' ? 'bg-green-500' :
                            exit.department === 'qualite' ? 'bg-purple-500' :
                            exit.department === 'maintenance' ? 'bg-orange-500' :
                            'bg-gray-500'
                          }`}>
                            {exit.department.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900 capitalize">{exit.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {exit.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {exit.user || 'Non renseigné'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(exit.date).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ExitModal
          products={products}
          currentDepartment={currentDepartment}
          onSave={handleAddExit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
