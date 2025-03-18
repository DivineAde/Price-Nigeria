"use client"

// LocationMapComponent.jsx
import React, { useState } from 'react';
import { MapPin, Compass, List, Grid, Search, X, ChevronDown } from 'lucide-react';

const LocationMapComponent = () => {
  const [activeView, setActiveView] = useState('map');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample data for Nigerian markets
  const markets = [
    { 
      id: 1, 
      name: "Oshodi Market", 
      address: "Oshodi, Lagos", 
      rating: 4.7, 
      distance: 0.8,
      specialty: "General goods",
      coordinates: { x: 35, y: 40 }
    },
    { 
      id: 2, 
      name: "Mile 12 Market", 
      address: "Ketu, Lagos", 
      rating: 4.5, 
      distance: 1.2,
      specialty: "Fresh produce",
      coordinates: { x: 65, y: 30 }
    },
    { 
      id: 3, 
      name: "Ariaria International Market", 
      address: "Aba, Abia State", 
      rating: 4.6, 
      distance: 1.5,
      specialty: "Clothing and fabrics",
      coordinates: { x: 20, y: 70 }
    },
    { 
      id: 4, 
      name: "Kurmi Market", 
      address: "Kano, Kano State", 
      rating: 4.8, 
      distance: 2.1,
      specialty: "Spices and herbs",
      coordinates: { x: 50, y: 80 }
    },
    { 
      id: 5, 
      name: "Onitsha Main Market", 
      address: "Onitsha, Anambra State", 
      rating: 4.4, 
      distance: 2.4,
      specialty: "Electronics and hardware",
      coordinates: { x: 80, y: 60 }
    }
  ];

  // Filter markets based on search query
  const filteredMarkets = markets.filter(market => 
    market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkerClick = (market) => {
    setSelectedMarket(market);
  };

  const handleCloseMarketInfo = () => {
    setSelectedMarket(null);
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Column - Controls */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Local Markets</h2>
              
              {/* Search Box */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="text"
                  placeholder="Search markets..."
                  className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
                    activeView === 'map' 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveView('map')}
                >
                  <Compass className="w-4 h-4 mr-2" />
                  <span>Map</span>
                </button>
                <button
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
                    activeView === 'list' 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveView('list')}
                >
                  <List className="w-4 h-4 mr-2" />
                  <span>List</span>
                </button>
              </div>
              
              {/* Filters */}
              <div className="mb-6">
                <button 
                  className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <span className="font-medium">Filter Options</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${filterOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {filterOpen && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0 km</span>
                        <span>10 km</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                      <div className="space-y-2">
                        {['General goods', 'Fresh produce', 'Clothing and fabrics', 'Spices and herbs', 'Electronics and hardware'].map((specialty) => (
                          <div key={specialty} className="flex items-center">
                            <input
                              id={specialty.replace(/\s+/g, '-').toLowerCase()}
                              type="checkbox"
                              className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <label
                              htmlFor={specialty.replace(/\s+/g, '-').toLowerCase()}
                              className="ml-2 text-sm text-gray-700"
                            >
                              {specialty}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                      Apply Filters
                    </button>
                  </div>
                )}
              </div>
              
              {/* Market List (Mobile & Tablet) */}
              <div className="md:hidden">
                <h3 className="font-medium text-gray-700 mb-3">Nearby Markets</h3>
                <div className="space-y-3">
                  {filteredMarkets.slice(0, 3).map((market) => (
                    <div 
                      key={market.id}
                      className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={() => handleMarkerClick(market)}
                    >
                      <h4 className="font-medium text-gray-800">{market.name}</h4>
                      <p className="text-sm text-gray-600">{market.address}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{market.distance} km away</span>
                        <span className="text-xs font-medium text-emerald-600">{market.rating} ★</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Map or List View */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            {activeView === 'map' ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Interactive Map Visualization */}
                <div className="relative w-full h-[600px] bg-emerald-50">
                  {/* This would be replaced with an actual map component in a real implementation */}
                  <div className="absolute inset-0 p-4 bg-[url('/api/placeholder/1200/600')] bg-cover">
                    {/* Market Markers */}
                    {filteredMarkets.map((market) => (
                      <button
                        key={market.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 group`}
                        style={{ 
                          left: `${market.coordinates.x}%`, 
                          top: `${market.coordinates.y}%` 
                        }}
                        onClick={() => handleMarkerClick(market)}
                      >
                        <div className={`flex flex-col items-center ${selectedMarket?.id === market.id ? 'scale-110' : ''}`}>
                          <div className="p-2 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-all">
                            <div className={`p-2 rounded-full ${selectedMarket?.id === market.id ? 'bg-emerald-500' : 'bg-emerald-400 group-hover:bg-emerald-500'}`}>
                              <MapPin className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="mt-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-xs font-medium text-gray-800 whitespace-nowrap">{market.name}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Selected Market Info Overlay */}
                  {selectedMarket && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-white rounded-lg shadow-xl p-4">
                      <button 
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        onClick={handleCloseMarketInfo}
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <div className="flex items-start">
                        <div className="bg-emerald-100 p-3 rounded-lg">
                          <MapPin className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-bold text-gray-800">{selectedMarket.name}</h3>
                          <p className="text-gray-600">{selectedMarket.address}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-amber-500 font-medium">{selectedMarket.rating} ★</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-gray-600">{selectedMarket.distance} km away</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-500">Specialty: {selectedMarket.specialty}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition-colors">
                          View Details
                        </button>
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition-colors">
                          Get Directions
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Local Markets</h2>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200">
                        <Grid className="h-5 w-5" />
                      </button>
                      <button className="p-2 bg-emerald-50 rounded-md text-emerald-600">
                        <List className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Market List */}
                  <div className="space-y-4">
                    {filteredMarkets.map((market) => (
                      <div 
                        key={market.id}
                        className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleMarkerClick(market)}
                      >
                        <div className="bg-emerald-100 p-3 rounded-lg">
                          <MapPin className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-bold text-gray-800">{market.name}</h3>
                            <span className="text-amber-500 font-medium">{market.rating} ★</span>
                          </div>
                          <p className="text-gray-600">{market.address}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-gray-600">{market.distance} km away</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">Specialty: {market.specialty}</span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white py-1.5 px-3 rounded transition-colors">
                              View Prices
                            </button>
                            <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 px-3 rounded transition-colors">
                              Get Directions
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMapComponent;