import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { StateData, indicatorConfig } from '../data/stateData';

interface ChartPanelProps {
  data: StateData[];
  selectedIndicator: keyof Pick<StateData, 'unemployment' | 'literacy' | 'healthIndex' | 'gdpPerCapita'>;
}

const ChartPanel: React.FC<ChartPanelProps> = ({ data, selectedIndicator }) => {
  const topStates = [...data]
    .sort((a, b) => {
      if (selectedIndicator === 'unemployment') {
        return a[selectedIndicator] - b[selectedIndicator]; // Lower is better
      }
      return b[selectedIndicator] - a[selectedIndicator]; // Higher is better
    })
    .slice(0, 10);

  const config = indicatorConfig[selectedIndicator];

  const scatterData = data.map(state => ({
    x: state.gdpPerCapita / 1000,
    y: state[selectedIndicator],
    name: state.name,
    region: state.region
  }));

  return (
    <div className="space-y-6">
      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Performing States - {config.label}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topStates}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="id" 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <Tooltip 
              formatter={(value: number) => [config.format(value), config.label]}
              labelFormatter={(label) => {
                const state = topStates.find(s => s.id === label);
                return state ? state.name : label;
              }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey={selectedIndicator} 
              fill={config.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Correlation Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {config.label} vs GDP Per Capita
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={scatterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="x" 
              name="GDP Per Capita (₹ thousands)"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              label={{ value: 'GDP Per Capita (₹ thousands)', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              dataKey="y"
              name={config.label}
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              label={{ value: config.label, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'y') return [config.format(value), config.label];
                return [`₹${value}K`, 'GDP Per Capita'];
              }}
              labelFormatter={(_, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.name;
                }
                return '';
              }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Scatter 
              dataKey="y" 
              fill={config.color}
              strokeWidth={2}
              stroke="white"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPanel;