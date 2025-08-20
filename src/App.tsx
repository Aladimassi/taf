import { useState, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ProductsTab } from './components/ProductsTab';
import { EntriesTab } from './components/EntriesTab';
import { ExitsTab } from './components/ExitsTab';
import { DepartmentLogin } from './components/DepartmentLogin';
import { Product, StockEntry, StockExit, Department, TabType } from './types';
import { departments } from './data/departments';
import { mockProducts, mockEntries, mockExits } from './data/mockData';

function App() {
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [entries, setEntries] = useState<StockEntry[]>(mockEntries);
  const [exits, setExits] = useState<StockExit[]>(mockExits);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAddProduct = useCallback((productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: generateId(),
    };
    setProducts(prev => [...prev, newProduct]);
  }, []);

  const handleEditProduct = useCallback((id: string, productData: Omit<Product, 'id'>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...productData, id } : p));
  }, []);

  const handleDeleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleAddEntry = useCallback((entryData: Omit<StockEntry, 'id'>) => {
    const newEntry: StockEntry = {
      ...entryData,
      id: generateId(),
    };
    setEntries(prev => [...prev, newEntry]);

    // Update product stock if status is 'Reçu'
    if (entryData.status === 'Reçu') {
      setProducts(prev => prev.map(p => 
        p.id === entryData.productId 
          ? { ...p, stock: p.stock + entryData.quantity }
          : p
      ));
    }
  }, []);

  const handleAddExit = useCallback((exitData: Omit<StockExit, 'id'>) => {
    const newExit: StockExit = {
      ...exitData,
      id: generateId(),
    };
    setExits(prev => [...prev, newExit]);

    // Update product stock
    setProducts(prev => prev.map(p => 
      p.id === exitData.productId 
        ? { ...p, stock: Math.max(0, p.stock - exitData.quantity) }
        : p
    ));
  }, []);

  const handleSelectDepartment = (department: Department) => {
    setCurrentDepartment(department);
    // Rediriger vers 'entries' pour tous les départements sauf technique
    if (department.id === 'technique') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('entries');
    }
  };

  const handleLogout = () => {
    setCurrentDepartment(null);
    setActiveTab('dashboard');
  };

  if (!currentDepartment) {
    return (
      <DepartmentLogin
        departments={departments}
        onSelectDepartment={handleSelectDepartment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentDepartment={currentDepartment}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' && currentDepartment.id === 'technique' && (
          <Dashboard
            products={products}
            entries={entries}
            exits={exits}
            currentDepartment={currentDepartment}
          />
        )}
        
        {activeTab === 'products' && currentDepartment.id === 'technique' && (
          <ProductsTab
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            currentDepartment={currentDepartment}
          />
        )}
        
        {activeTab === 'entries' && (
          <EntriesTab
            entries={entries}
            products={products}
            onAddEntry={handleAddEntry}
            currentDepartment={currentDepartment}
          />
        )}
        
        {activeTab === 'exits' && (
          <ExitsTab
            exits={exits}
            products={products}
            onAddExit={handleAddExit}
            currentDepartment={currentDepartment}
          />
        )}
      </main>
    </div>
  );
}

export default App;