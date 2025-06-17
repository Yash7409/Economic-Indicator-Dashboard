import React, { useState } from 'react';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import IndiaMap from './components/IndiaMap';
import StateDetail from './components/StateDetail';
import ChartPanel from './components/ChartPanel';
import AnalysisPanel from './components/AnalysisPanel';
import { stateData, StateData, indicatorConfig } from './data/stateData';
import { Users, Briefcase, BookOpen, Activity, Filter } from 'lucide-react';

function App() {
  const [selectedIndicator, setSelectedIndicator] = useState<keyof Pick<StateData, 'unemployment' | 'literacy' | 'healthIndex' | 'gdpPerCapita'>>('gdpPerCapita');
  const [selectedState, setSelectedState] = useState<StateData | undefined>(stateData[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'analysis'>('overview');

  const calculateOverallStats = () => {
    const totalPopulation = stateData.reduce((sum, state) => sum + state.population, 0);
    const avgUnemployment = stateData.reduce((sum, state) => sum + state.unemployment, 0) / stateData.length;
    const avgLiteracy = stateData.reduce((sum, state) => sum + state.literacy, 0) / stateData.length;
    const avgGDP = stateData.reduce((sum, state) => sum + state.gdpPerCapita, 0) / stateData.length;

    return {
      totalPopulation,
      avgUnemployment,
      avgLiteracy,
      avgGDP
    };
  };

  const stats = calculateOverallStats();

  const indicators = [
    { key: 'gdpPerCapita', label: 'GDP Per Capita', icon: Briefcase },
    { key: 'unemployment', label: 'Unemployment', icon: Users },
    { key: 'literacy', label: 'Literacy', icon: BookOpen },
    { key: 'healthIndex', label: 'Health Index', icon: Activity }
  ] as const;

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'charts', label: 'Charts' },
    { key: 'analysis', label: 'Analysis' }
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Population"
            value={`${(stats.totalPopulation / 10000000).toFixed(1)}Cr`}
            change="+2.1% YoY"
            icon={Users}
            color="bg-blue-500"
            trend="up"
          />
          <MetricCard
            title="Avg. Unemployment"
            value={`${stats.avgUnemployment.toFixed(1)}%`}
            change="-0.3% YoY"
            icon={Briefcase}
            color="bg-red-500"
            trend="down"
          />
          <MetricCard
            title="Avg. Literacy"
            value={`${stats.avgLiteracy.toFixed(1)}%`}
            change="+1.5% YoY"
            icon={BookOpen}
            color="bg-green-500"
            trend="up"
          />
          <MetricCard
            title="Avg. GDP Per Capita"
            value={`₹${(stats.avgGDP / 1000).toFixed(0)}K`}
            change="+8.2% YoY"
            icon={Activity}
            color="bg-purple-500"
            trend="up"
          />
        </div>

        {/* Indicator Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Economic Indicators</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Select indicator to analyze</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {indicators.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedIndicator(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedIndicator === key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <IndiaMap
                data={stateData}
                selectedIndicator={selectedIndicator}
                onStateSelect={setSelectedState}
                selectedState={selectedState}
              />
            </div>
            <div>
              {selectedState && <StateDetail state={selectedState} />}
            </div>
          </div>
        )}

        {activeTab === 'charts' && (
          <ChartPanel data={stateData} selectedIndicator={selectedIndicator} />
        )}

        {activeTab === 'analysis' && (
          <AnalysisPanel data={stateData} selectedIndicator={selectedIndicator} />
        )}
      </main>
    </div>
  );
}

export default App;