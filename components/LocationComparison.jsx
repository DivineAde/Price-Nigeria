"use client"

// LocationPriceComparison.jsx
import React, { useState } from 'react';
import { MapPin, ArrowRight, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LocationPriceComparison = () => {
  const [selectedLocation, setSelectedLocation] = useState('Lagos');
  const [selectedCategory, setSelectedCategory] = useState('Produce');
  
  // Sample data for Nigerian locations
  const locations = [
    'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan'
  ];
  
  // Sample data for categories
  const categories = [
    'Produce', 'Dairy', 'Meat', 'Bakery', 'Beverages'
  ];
  
  // Sample price comparison data
  const priceData = {
    'Produce': {
      'Lagos': [
        { name: 'Tomatoes', yourLocation: 500, cityAverage: 600, difference: -100 },
        { name: 'Pepper', yourLocation: 300, cityAverage: 350, difference: -50 },
        { name: 'Onions', yourLocation: 400, cityAverage: 450, difference: -50 },
        { name: 'Yam', yourLocation: 1200, cityAverage: 1100, difference: 100 },
        { name: 'Plantain', yourLocation: 200, cityAverage: 250, difference: -50 },
      ],
      'Abuja': [
        { name: 'Tomatoes', yourLocation: 550, cityAverage: 600, difference: -50 },
        { name: 'Pepper', yourLocation: 320, cityAverage: 350, difference: -30 },
        { name: 'Onions', yourLocation: 420, cityAverage: 450, difference: -30 },
        { name: 'Yam', yourLocation: 1250, cityAverage: 1100, difference: 150 },
        { name: 'Plantain', yourLocation: 220, cityAverage: 250, difference: -30 },
      ],
      // Additional location data would be here
    },
    'Dairy': {
      'Lagos': [
        { name: 'Milk', yourLocation: 1200, cityAverage: 1300, difference: -100 },
        { name: 'Cheese', yourLocation: 2500, cityAverage: 2700, difference: -200 },
        { name: 'Yogurt', yourLocation: 800, cityAverage: 850, difference: -50 },
        { name: 'Butter', yourLocation: 1500, cityAverage: 1400, difference: 100 },
      ],
      // Additional location data would be here
    },
    // Additional category data would be here
  };
  
  // Get current data based on selections
  const getCurrentData = () => {
    if (priceData[selectedCategory] && priceData[selectedCategory][selectedLocation]) {
      return priceData[selectedCategory][selectedLocation];
    }
    return [];
  };
  
  // Calculate savings
  const calculateSavings = () => {
    const data = getCurrentData();
    let totalSavings = 0;
    let betterPrices = 0;
    
    data.forEach(item => {
      if (item.difference < 0) {
        betterPrices++;
        totalSavings += Math.abs(item.difference);
      }
    });
    
    return {
      totalSavings: totalSavings.toFixed(2),
      betterPrices,
      totalItems: data.length,
      savingsPercentage: data.length > 0 ? ((betterPrices / data.length) * 100).toFixed(0) : 0
    };
  };
  
  const savingsInfo = calculateSavings();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Location-Based <span className="text-emerald-500">Price Comparison</span>
          </h2>
          <p className="text-lg text-gray-600">
            See how food prices in different cities compare to the city average and find the best deals near you.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 bg-emerald-50 border-b border-emerald-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-emerald-500 mr-2" />
                <span className="text-lg font-medium text-gray-800">Select Your Location:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <button
                    key={location}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedLocation === location 
                        ? 'bg-emerald-500 text-white shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side - Summary */}
              <div className="w-full md:w-1/3">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === category 
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-emerald-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Summary</h3>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-emerald-600">₦{savingsInfo.totalSavings}</div>
                    <div className="text-sm text-gray-600">Potential savings in {selectedLocation}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Better prices:</span>
                      <span className="font-medium text-emerald-600">
                        {savingsInfo.betterPrices} of {savingsInfo.totalItems} items ({savingsInfo.savingsPercentage}%)
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-emerald-500 h-2.5 rounded-full" 
                        style={{ width: `${savingsInfo.savingsPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="w-full flex items-center justify-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 py-2 rounded-lg transition-colors">
                      <span>View Full Report</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 border border-amber-200 bg-amber-50 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    Prices updated as of March 15. Prices may vary by store and are subject to change.
                  </div>
                </div>
              </div>
              
              {/* Right side - Chart */}
              <div className="w-full md:w-2/3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Comparison for {selectedCategory}</h3>
                
                <div className="bg-white border border-gray-100 rounded-xl p-4 h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getCurrentData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      barSize={30}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false}
                        tickFormatter={(value) => `₦${value}`}
                      />
                      <Tooltip 
                        formatter={(value) => [`₦${value}`, '']}
                        labelFormatter={(value) => `${value}`}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="yourLocation" 
                        name={`${selectedLocation} Price`} 
                        fill="#10b981" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="cityAverage" 
                        name="City Average" 
                        fill="#94a3b8" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Detailed Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 text-gray-700 text-sm">
                        <tr>
                          <th className="px-4 py-3 font-medium rounded-l-lg">Item</th>
                          <th className="px-4 py-3 font-medium">{selectedLocation} Price</th>
                          <th className="px-4 py-3 font-medium">City Average</th>
                          <th className="px-4 py-3 font-medium rounded-r-lg">Difference</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {getCurrentData().map((item, index) => (
                          <tr key={index} className="text-gray-800">
                            <td className="px-4 py-3">{item.name}</td>
                            <td className="px-4 py-3 font-medium">₦{item.yourLocation.toFixed(2)}</td>
                            <td className="px-4 py-3">₦{item.cityAverage.toFixed(2)}</td>
                            <td className="px-4 py-3">
                              <div className={`flex items-center ${
                                item.difference < 0 ? 'text-green-600' : item.difference > 0 ? 'text-red-500' : 'text-gray-500'
                              }`}>
                                {item.difference < 0 ? (
                                  <TrendingDown className="h-4 w-4 mr-1" />
                                ) : item.difference > 0 ? (
                                  <TrendingUp className="h-4 w-4 mr-1" />
                                ) : (
                                  <span className="h-4 w-4 mr-1">—</span>
                                )}
                                <span>{item.difference === 0 ? '—' : `₦${Math.abs(item.difference).toFixed(2)}`}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationPriceComparison;