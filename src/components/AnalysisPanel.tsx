import React from 'react';
import { StateData, indicatorConfig } from '../data/stateData';
import { TrendingUp, TrendingDown, AlertTriangle, Award } from 'lucide-react';

interface AnalysisPanelProps {
  data: StateData[];
  selectedIndicator: keyof Pick<StateData, 'unemployment' | 'literacy' | 'healthIndex' | 'gdpPerCapita'>;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ data, selectedIndicator }) => {
  const config = indicatorConfig[selectedIndicator];
  
  const calculateStats = () => {
    const values = data.map(state => state[selectedIndicator] as number);
    const sorted = [...values].sort((a, b) => a - b);
    
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      median: sorted[Math.floor(sorted.length / 2)],
      range: Math.max(...values) - Math.min(...values)
    };
  };

  const getTopBottomStates = () => {
    const sortedStates = [...data].sort((a, b) => {
      if (selectedIndicator === 'unemployment') {
        return a[selectedIndicator] - b[selectedIndicator]; // Lower is better for unemployment
      }
      return b[selectedIndicator] - a[selectedIndicator]; // Higher is better for others
    });

    return {
      top: sortedStates.slice(0, 3),
      bottom: sortedStates.slice(-3).reverse()
    };
  };

  const getRegionalAnalysis = () => {
    const regionStats: Record<string, { total: number; count: number; states: StateData[] }> = {};
    
    data.forEach(state => {
      if (!regionStats[state.region]) {
        regionStats[state.region] = { total: 0, count: 0, states: [] };
      }
      regionStats[state.region].total += state[selectedIndicator] as number;
      regionStats[state.region].count += 1;
      regionStats[state.region].states.push(state);
    });

    return Object.entries(regionStats).map(([region, stats]) => ({
      region,
      average: stats.total / stats.count,
      stateCount: stats.count,
      states: stats.states
    })).sort((a, b) => {
      if (selectedIndicator === 'unemployment') {
        return a.average - b.average; // Lower is better
      }
      return b.average - a.average; // Higher is better
    });
  };

  const stats = calculateStats();
  const { top, bottom } = getTopBottomStates();
  const regionalAnalysis = getRegionalAnalysis();

  const getInsights = () => {
    const insights = [];
    
    // Range analysis
    if (stats.range > stats.avg * 0.5) {
      insights.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'High Regional Disparity',
        description: `There's significant variation in ${config.label.toLowerCase()} across states, with a range of ${config.format(stats.range)}.`
      });
    }

    // Performance insights
    if (selectedIndicator === 'literacy') {
      const highLiteracy = data.filter(s => s.literacy > 85).length;
      if (highLiteracy < 5) {
        insights.push({
          type: 'alert',
          icon: TrendingUp,
          title: 'Literacy Development Opportunity',
          description: `Only ${highLiteracy} states have literacy rates above 85%. This presents a significant development opportunity.`
        });
      }
    }

    if (selectedIndicator === 'unemployment') {
      const highUnemployment = data.filter(s => s.unemployment > 10).length;
      if (highUnemployment > 0) {
        insights.push({
          type: 'alert',
          icon: TrendingDown,
          title: 'Employment Challenges',
          description: `${highUnemployment} states have unemployment rates above 10%, requiring focused intervention.`
        });
      }
    }

    // Regional insights
    const bestRegion = regionalAnalysis[0];
    insights.push({
      type: 'success',
      icon: Award,
      title: 'Regional Leader',
      description: `${bestRegion.region} region leads with an average ${config.label.toLowerCase()} of ${config.format(bestRegion.average)}.`
    });

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="space-y-6">
      {/* Statistical Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Statistical Summary - {config.label}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: config.color }}>
              {config.format(stats.min)}
            </p>
            <p className="text-sm text-gray-600">Minimum</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: config.color }}>
              {config.format(stats.max)}
            </p>
            <p className="text-sm text-gray-600">Maximum</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: config.color }}>
              {config.format(stats.avg)}
            </p>
            <p className="text-sm text-gray-600">Average</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: config.color }}>
              {config.format(stats.median)}
            </p>
            <p className="text-sm text-gray-600">Median</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: config.color }}>
              {config.format(stats.range)}
            </p>
            <p className="text-sm text-gray-600">Range</p>
          </div>
        </div>
      </div>

      {/* Top and Bottom Performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            Top Performers
          </h4>
          <div className="space-y-3">
            {top.map((state, index) => (
              <div key={state.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">{state.name}</span>
                </div>
                <span className="text-green-600 font-medium">
                  {config.format(state[selectedIndicator] as number)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
            Need Attention
          </h4>
          <div className="space-y-3">
            {bottom.map((state, index) => (
              <div key={state.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">{state.name}</span>
                </div>
                <span className="text-red-600 font-medium">
                  {config.format(state[selectedIndicator] as number)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Regional Performance</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regionalAnalysis.map(region => (
            <div key={region.region} className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">{region.region}</h5>
              <p className="text-2xl font-bold mb-1" style={{ color: config.color }}>
                {config.format(region.average)}
              </p>
              <p className="text-sm text-gray-600">{region.stateCount} states</p>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Key Insights</h4>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const colorClasses = {
              success: 'bg-green-50 border-green-200 text-green-800',
              warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
              alert: 'bg-red-50 border-red-200 text-red-800'
            };
            
            return (
              <div key={index} className={`p-4 rounded-lg border ${colorClasses[insight.type as keyof typeof colorClasses]}`}>
                <div className="flex items-start space-x-3">
                  <Icon className="w-5 h-5 mt-0.5" />
                  <div>
                    <h5 className="font-medium mb-1">{insight.title}</h5>
                    <p className="text-sm opacity-90">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;