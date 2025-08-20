import { Building, LogIn } from 'lucide-react';
import { Department } from '../types';

interface DepartmentLoginProps {
  departments: Department[];
  onSelectDepartment: (department: Department) => void;
}

export function DepartmentLogin({ departments, onSelectDepartment }: DepartmentLoginProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 relative">
      {/* Logo TAV en haut à gauche */}
      <div className="absolute top-8 left-8">
        <img 
          src="/tav-logo.svg" 
          alt="TAV Airports Logo" 
          className="h-32 w-auto"
        />
      </div>
      
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestion de Stock
          </h1>
          <p className="text-gray-600">
            Sélectionnez votre département pour accéder au système
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Building className="h-5 w-5 mr-2 text-blue-600" />
            Choisir le département
          </h2>
          
          <div className="space-y-3">
            {departments.map((department) => (
              <button
                key={department.id}
                onClick={() => onSelectDepartment(department)}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-gray-900 group-hover:text-blue-700 ${
                      department.id === 'technique' ? 'font-bold uppercase' : 'font-medium'
                    }`}>
                      {department.name}
                    </h3>
                  </div>
                  <LogIn className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2025 TAV - Système de Gestion de Stock</p>
        </div>
      </div>
    </div>
  );
}