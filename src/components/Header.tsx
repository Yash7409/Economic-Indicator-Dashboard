import React from 'react';
import { BarChart3, TrendingUp, Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Globe className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Economic Indicator Dashboard
              </h1>
              <p className="text-blue-100 text-sm sm:text-base mt-1">
                State-wise Analysis of India's Economic Performance
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <BarChart3 className="w-4 h-4" />
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Trend Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;