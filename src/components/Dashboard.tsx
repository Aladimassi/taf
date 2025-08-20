import { Box, TrendingDown, TrendingUp, Coins, AlertTriangle } from 'lucide-react';
import { StockEntry, StockExit, Product, Department } from '../types';

interface DashboardProps {
  products: Product[];
  entries: StockEntry[];
  exits: StockExit[];
  currentDepartment: Department;
}

export function Dashboard({ products, entries, exits, currentDepartment }: DashboardProps) {
  const filteredEntries = currentDepartment.canViewAll 
    ? entries 
    : entries.filter(entry => entry.department === currentDepartment.id);
    
  const filteredExits = currentDepartment.canViewAll 
    ? exits 
    : exits.filter(exit => exit.department === currentDepartment.id);

  const totalProducts = products.length;
  const totalEntries = filteredEntries.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalExits = filteredExits.reduce((sum, exit) => sum + exit.quantity, 0);
  const totalValue = products.reduce((sum, product) => sum + (product.stock * product.price), 0);
  
  const criticalProducts = products.filter(product => product.stock <= product.minStock);

  const stats = [
    {
      title: 'Total Produits',
      value: totalProducts.toString(),
      icon: Box,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Entrées Reçues',
      value: totalEntries.toString(),
      icon: TrendingDown,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Sorties',
      value: totalExits.toString(),
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Valeur Stock',
      value: `${totalValue.toFixed(0)}TND`,
      icon: Coins,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord</h2>
          <p className="text-gray-600">{currentDepartment.name}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts Section */}
      {criticalProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Alertes Stock</h3>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Stock Critique</h4>
            {criticalProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">Stock: {product.stock} / Min: {product.minStock}</p>
                </div>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Critique
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Départements les plus actifs</h3>
          <div className="space-y-3">
            {Object.entries(
              exits.reduce((acc: Record<string, number>, exit) => {
                acc[exit.department] = (acc[exit.department] || 0) + exit.quantity;
                return acc;
              }, {})
            )
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([department, quantity]) => (
                <div key={department} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 capitalize">{department}</span>
                  <span className="text-sm text-gray-600">{quantity} sorties</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mouvements récents</h3>
          <div className="space-y-3">
            {[...filteredEntries, ...filteredExits]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 5)
              .map((movement) => (
                <div key={movement.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{movement.productName}</p>
                    <p className="text-xs text-gray-500">
                      {'supplier' in movement ? 'Entrée' : 'Sortie'} • {new Date(movement.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${'supplier' in movement ? 'text-green-600' : 'text-red-600'}`}>
                    {'supplier' in movement ? '+' : '-'}{movement.quantity}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}