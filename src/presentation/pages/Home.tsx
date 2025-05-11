import React, { useState } from 'react';
import CurrentLocationWeather from '../components/CurrentLocationWeather';
import SearchLocationWeather from '../components/SearchLocationWeather';
import MapComponent from '../components/MapComponent';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'search' | 'map'>(
    'current'
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Weather Forecast
      </h1>
      <div className="tabs flex space-x-4 mb-6">
        <button
          className={`tab ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          現在地
        </button>
        <button
          className={`tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          検索地点
        </button>
        <button
          className={`tab ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          地図から選択
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'current' && <CurrentLocationWeather />}
        {activeTab === 'search' && <SearchLocationWeather />}
        {activeTab === 'map' && <MapComponent />}
      </div>
    </div>
  );
};

export default Home;
