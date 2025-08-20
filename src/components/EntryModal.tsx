import React, { useState } from 'react';
import { X } from 'lucide-react';
import { StockEntry, Product, Department } from '../types';

interface EntryModalProps {
  products: Product[];
  currentDepartment: Department;
  onSave: (entry: Omit<StockEntry, 'id'>) => void;
  onClose: () => void;
}

export function EntryModal({ products, currentDepartment, onSave, onClose }: EntryModalProps) {
  const [formData, setFormData] = useState({
    productId: '',
    supplier: '',
    quantity: 0,
    minCommand: 0,
    maxCommand: 0,
    date: new Date().toISOString().split('T')[0],
    status: 'En attente' as const
  });

  // Met à jour min/max commande selon le produit sélectionné
  React.useEffect(() => {
    const selectedProduct = products.find(p => p.id === formData.productId);
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        minCommand: selectedProduct.minStock,
        maxCommand: selectedProduct.maxStock
        // Suppression de la limitation automatique de la quantité
      }));
    }
  }, [formData.productId, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProduct = products.find(p => p.id === formData.productId);
    if (!selectedProduct) return;

    onSave({
      ...formData,
      productName: selectedProduct.name,
      department: currentDepartment.id
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'minCommand' || name === 'maxCommand'
        ? parseInt(value) || 0
        : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Nouvelle entrée</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Produit
            </label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner un produit</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.description}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fournisseur
            </label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantité à ajouter
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {formData.productId && (() => {
            const selectedProduct = products.find(p => p.id === formData.productId);
            const quantiteDispo = selectedProduct ? selectedProduct.stock : 0;
            const quantiteApresAjout = quantiteDispo + formData.quantity;
            
            return (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Informations Stock</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600 font-medium">Quantité actuelle:</span>
                    <div className="text-lg font-bold text-blue-800">{quantiteDispo} unités</div>
                  </div>
                  <div>
                    <span className="text-green-600 font-medium">Après ajout:</span>
                    <div className="text-lg font-bold text-green-700">{quantiteApresAjout} unités</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Quantité max déclarée: {selectedProduct?.maxStock} unités
                </div>
              </div>
            );
          })()}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="En attente">En attente</option>
              <option value="Reçu">Reçu</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}