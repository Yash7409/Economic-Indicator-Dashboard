import React from 'react';
import { StateData } from '../data/stateData';

interface IndiaMapProps {
  data: StateData[];
  selectedIndicator: keyof Pick<StateData, 'unemployment' | 'literacy' | 'healthIndex' | 'gdpPerCapita'>;
  onStateSelect: (state: StateData) => void;
  selectedState?: StateData;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ 
  data, 
  selectedIndicator, 
  onStateSelect, 
  selectedState 
}) => {
  const getColorIntensity = (value: number, indicator: string) => {
    const values = data.map(state => state[selectedIndicator] as number);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const normalized = (value - min) / (max - min);
    
    if (indicator === 'unemployment') {
      return `rgba(239, 68, 68, ${0.3 + normalized * 0.7})`;
    } else if (indicator === 'literacy') {
      return `rgba(59, 130, 246, ${0.3 + normalized * 0.7})`;
    } else if (indicator === 'healthIndex') {
      return `rgba(16, 185, 129, ${0.3 + normalized * 0.7})`;
    } else {
      return `rgba(139, 92, 246, ${0.3 + normalized * 0.7})`;
    }
  };

  // Simplified state positions for demonstration
  const statePositions: Record<string, { x: number; y: number; width: number; height: number }> = {
    'JK': { x: 10, y: 10, width: 80, height: 60 },
    'HP': { x: 70, y: 70, width: 60, height: 40 },
    'PB': { x: 60, y: 100, width: 50, height: 40 },
    'HR': { x: 110, y: 110, width: 50, height: 40 },
    'DL': { x: 120, y: 100, width: 20, height: 20 },
    'UT': { x: 130, y: 70, width: 40, height: 50 },
    'RJ': { x: 40, y: 140, width: 120, height: 100 },
    'UP': { x: 160, y: 120, width: 140, height: 80 },
    'BR': { x: 280, y: 160, width: 80, height: 60 },
    'SK': { x: 320, y: 140, width: 25, height: 25 },
    'AR': { x: 380, y: 80, width: 70, height: 60 },
    'NL': { x: 380, y: 140, width: 40, height: 40 },
    'MN': { x: 370, y: 180, width: 30, height: 30 },
    'MZ': { x: 370, y: 210, width: 30, height: 40 },
    'TR': { x: 340, y: 200, width: 30, height: 30 },
    'ML': { x: 340, y: 170, width: 30, height: 30 },
    'AS': { x: 300, y: 180, width: 70, height: 50 },
    'WB': { x: 300, y: 220, width: 60, height: 80 },
    'JH': { x: 240, y: 220, width: 60, height: 60 },
    'OR': { x: 240, y: 280, width: 80, height: 80 },
    'CT': { x: 180, y: 240, width: 60, height: 60 },
    'MP': { x: 120, y: 200, width: 120, height: 80 },
    'GJ': { x: 40, y: 240, width: 80, height: 100 },
    'MH': { x: 100, y: 300, width: 100, height: 100 },
    'TG': { x: 200, y: 340, width: 60, height: 50 },
    'AP': { x: 200, y: 390, width: 80, height: 80 },
    'TN': { x: 180, y: 470, width: 100, height: 60 },
    'KL': { x: 140, y: 480, width: 40, height: 80 },
    'KA': { x: 140, y: 400, width: 80, height: 80 },
    'GA': { x: 120, y: 370, width: 25, height: 30 }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Interactive State Map - {selectedIndicator.charAt(0).toUpperCase() + selectedIndicator.slice(1)}
      </h3>
      <div className="relative">
        <svg 
          viewBox="0 0 500 600" 
          className="w-full h-96 border border-gray-200 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50"
        >
          {data.map(state => {
            const position = statePositions[state.id];
            if (!position) return null;
            
            const isSelected = selectedState?.id === state.id;
            const fillColor = getColorIntensity(state[selectedIndicator] as number, selectedIndicator);
            
            return (
              <g key={state.id}>
                <rect
                  x={position.x}
                  y={position.y}
                  width={position.width}
                  height={position.height}
                  fill={fillColor}
                  stroke={isSelected ? "#3b82f6" : "#e5e7eb"}
                  strokeWidth={isSelected ? "3" : "1"}
                  rx="4"
                  className="cursor-pointer hover:stroke-blue-500 hover:stroke-2 transition-all duration-200"
                  onClick={() => onStateSelect(state)}
                />
                <text
                  x={position.x + position.width / 2}
                  y={position.y + position.height / 2}
                  textAnchor="middle"
                  dy="0.35em"
                  fontSize="10"
                  fill="#374151"
                  className="pointer-events-none font-medium"
                >
                  {state.id}
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Low</span>
            <div className="w-32 h-4 bg-gradient-to-r from-gray-200 to-blue-600 rounded"></div>
            <span className="text-sm text-gray-600">High</span>
          </div>
          <div className="text-sm text-gray-500">
            Click on states for detailed information
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;