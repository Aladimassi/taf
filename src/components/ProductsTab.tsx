import { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, AlertTriangle, Download, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Product, Department } from '../types';
import { ProductModal } from './ProductModal';

interface ProductsTabProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onEditProduct: (id: string, product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
  currentDepartment: Department;
}

export function ProductsTab({ 
  products, 
  onAddProduct, 
  onEditProduct, 
  onDeleteProduct, 
  currentDepartment 
}: ProductsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    onAddProduct(productData);
    setIsModalOpen(false);
  };

  const handleEditProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      onEditProduct(editingProduct.id, productData);
      setEditingProduct(null);
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportToExcel = () => {
    const exportData = products.map(product => ({
      'Nom du produit': product.name,
      'Description': product.description,
      'Quantité disponible': product.stock,
      'Prix unitaire (TND)': product.price.toFixed(2),
      'Stock minimum': product.minStock,
      'Stock maximum': product.maxStock,
      'Statut': product.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Produits en Stock');
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    saveAs(data, `produits_stock_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Prendre la première feuille
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        
        // Convertir en JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];
        
        // Traiter chaque ligne et créer des produits
        jsonData.forEach((row, index) => {
          try {
            const productData = {
              name: row['Nom du produit'] || row['Nom'] || row['Product Name'] || `Produit ${index + 1}`,
              description: row['Description'] || row['Desc'] || '',
              stock: parseInt(row['Quantité disponible'] || row['Stock'] || row['Quantité'] || '0') || 0,
              price: parseFloat(row['Prix unitaire (TND)'] || row['Prix'] || row['Price'] || '0') || 0,
              minStock: parseInt(row['Stock minimum'] || row['Min'] || row['Min Stock'] || '5') || 5,
              maxStock: parseInt(row['Stock maximum'] || row['Max'] || row['Max Stock'] || '100') || 100,
              status: (row['Statut'] || 'Stock optimal') as 'Stock optimal' | 'Stock critique' | 'En commande'
            };

            // Valider que le nom du produit n'est pas vide
            if (productData.name && productData.name.trim() !== '') {
              onAddProduct(productData);
            }
          } catch (error) {
            console.warn(`Erreur lors du traitement de la ligne ${index + 1}:`, error);
          }
        });

        alert(`Import terminé! ${jsonData.length} produits traités.`);
      } catch (error) {
        console.error('Erreur lors de l\'import:', error);
        alert('Erreur lors de l\'import du fichier Excel. Veuillez vérifier le format.');
      }
    };
    
    reader.readAsArrayBuffer(file);
    
    // Reset input
    if (event.target) {
      event.target.value = '';
    }
  };

  if (currentDepartment.id !== 'technique') {
    return null;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Produits</h2>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleImportClick}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Importer Excel</span>
          </button>
          <button
            onClick={exportToExcel}
            className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Exporter Excel</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau Produit</span>
          </button>
          
          {/* Input file caché pour l'import */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileImport}
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
          />
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
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Limites
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900">{product.stock}</span>
                      {product.stock <= product.minStock && (
                        <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Min: {product.minStock} | Max: {product.maxStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.price.toFixed(2)} TND
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.status === 'Stock optimal' 
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'Stock critique'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onSave={editingProduct ? handleEditProduct : handleAddProduct}
          onClose={closeModal}
        />
      )}
    </div>
  );
}