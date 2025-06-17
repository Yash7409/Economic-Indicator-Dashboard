import React from 'react';
import { StateData, indicatorConfig } from '../data/stateData';
import { MapPin, Users, TrendingUp, Activity } from 'lucide-react';

interface StateDetailProps {
  state: StateData;
}

const StateDetail: React.FC<StateDetailProps> = ({ state }) => {
  const formatPopulation = (pop: number) => {
    if (pop >= 10000000) return `${(pop / 10000000).toFixed(1)}Cr`;
    if (pop >= 100000) return `${(pop / 100000).toFixed(1)}L`;
    return `${(pop / 1000).toFixed(0)}K`;
  };

  const getPerformanceLevel = (indicator: keyof typeof indicatorConfig, value: number) => {
    // Define thresholds for each indicator
    const thresholds = {
      unemployment: { good: 4, average: 7 },
      literacy: { good: 80, average: 70 },
      healthIndex: { good: 60, average: 45 },
      gdpPerCapita: { good: 200000, average: 100000 }
    };

    const threshold = thresholds[indicator];
    if (!threshold) return 'average';

    if (indicator === 'unemployment') {
      return value <= threshold.good ? 'good' : value <= threshold.average ? 'average' : 'poor';
    } else {
      return value >= threshold.good ? 'good' : value >= threshold.average ? 'average' : 'poor';
    }
  };

  const getPerformanceColor = (level: string) => {
    switch (level) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{state.name}</h3>
            <p className="text-gray-600">{state.region} Region</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{formatPopulation(state.population)} people</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(indicatorConfig).map(([key, config]) => {
          const value = state[key as keyof StateData] as number;
          const performance = getPerformanceLevel(key as keyof typeof indicatorConfig, value);
          
          return (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{config.label}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPerformanceColor(performance)}`}>
                  {performance.charAt(0).toUpperCase() + performance.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold" style={{ color: config.color }}>
                  {config.format(value)}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: config.color,
                      width: `${Math.min(100, (value / (key === 'gdpPerCapita' ? 500000 : 100)) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{config.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">Economic Overview</h4>
        </div>
        <p className="text-sm text-blue-800">
          {state.name} shows {getPerformanceLevel('gdpPerCapita', state.gdpPerCapita)} economic performance 
          with a GDP per capita of {indicatorConfig.gdpPerCapita.format(state.gdpPerCapita)}. 
          The state has {getPerformanceLevel('literacy', state.literacy)} literacy levels at {state.literacy.toFixed(1)}% 
          and {getPerformanceLevel('unemployment', state.unemployment)} unemployment rate of {state.unemployment.toFixed(1)}%.
        </p>
      </div>
    </div>
  );
};

export default StateDetail;