import { BarChart3, Box, TrendingDown, TrendingUp, LogOut } from 'lucide-react';
import { TabType, Department } from '../types';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  currentDepartment: Department;
  onLogout: () => void;
}

export function Navigation({ activeTab, onTabChange, currentDepartment, onLogout }: NavigationProps) {
  const tabs = [
    ...(currentDepartment.id === 'technique' ? [{ id: 'dashboard' as TabType, label: 'Tableau de Bord', icon: BarChart3 }] : []),
    ...(currentDepartment.id === 'technique' ? [{ id: 'products' as TabType, label: 'Produits', icon: Box }] : []),
    { id: 'entries' as TabType, label: 'Entrées', icon: TrendingDown },
    { id: 'exits' as TabType, label: 'Sorties', icon: TrendingUp },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Box className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Gestion de Stock - {currentDepartment.name}
            </h1>
          </div>
          
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Changer de département</span>
        </button>
      </div>
    </nav>
  );
}