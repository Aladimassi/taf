import React, { useState } from 'react';
import { X } from 'lucide-react';
import { StockExit, Product, Department } from '../types';

interface ExitModalProps {
  products: Product[];
  currentDepartment: Department;
  onSave: (exit: Omit<StockExit, 'id'>) => void;
  onClose: () => void;
}

export function ExitModal({ products, currentDepartment, onSave, onClose }: ExitModalProps) {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 0,
    reason: '',
    user: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProduct = products.find(p => p.id === formData.productId);
    if (!selectedProduct) return;

    // Vérifier que la quantité ne dépasse pas le stock disponible
    if (formData.quantity > selectedProduct.stock) {
      alert(`Quantité insuffisante! Stock disponible: ${selectedProduct.stock} unités`);
      return;
    }

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
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const reasons = [
    'Installation nouvelle',
    'Réparation équipement',
    'Maintenance préventive',
    'Remplacement',
    'Test qualité',
    'Formation',
    'Autre'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Nouvelle sortie</h3>
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
                  {product.name} - Stock: {product.stock}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantité à sortir
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              max={formData.productId ? (products.find(p => p.id === formData.productId)?.stock || 0) : undefined}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {formData.productId && (() => {
            const selectedProduct = products.find(p => p.id === formData.productId);
            const quantiteDispo = selectedProduct ? selectedProduct.stock : 0;
            const isStockCritique = selectedProduct ? quantiteDispo <= selectedProduct.minStock : false;
            
            return (
              <div className={`p-4 rounded-lg border ${isStockCritique ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <h4 className={`text-sm font-medium mb-2 ${isStockCritique ? 'text-red-800' : 'text-green-800'}`}>
                  Informations Stock
                </h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <span className={`font-medium ${isStockCritique ? 'text-red-600' : 'text-green-600'}`}>
                      Quantité disponible:
                    </span>
                    <div className={`text-lg font-bold ${isStockCritique ? 'text-red-800' : 'text-green-700'}`}>
                      {quantiteDispo} unités
                    </div>
                  </div>
                  {isStockCritique && (
                    <div className="text-red-600 text-xs font-medium">
                      ⚠️ Attention: Stock critique (min: {selectedProduct?.minStock})
                    </div>
                  )}
                  <div className="text-xs text-gray-600">
                    Seuils: {selectedProduct?.minStock} min / {selectedProduct?.maxStock} max
                  </div>
                </div>
              </div>
            );
          })()}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motif
            </label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner un motif</option>
              {reasons.map(reason => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Utilisateur (optionnel)
            </label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nom de l'utilisateur"
            />
          </div>
          
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