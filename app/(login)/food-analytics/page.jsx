// app/food-analytics/page.js
'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Menu, ChevronDown, Search, Filter, ArrowUpRight, TrendingUp, TrendingDown, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FoodAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1W');
  const [searchQuery, setSearchQuery] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  
  // Mock data - in a real app, this would come from an API
  const mockFoodItems = [
    { 
      id: 1, 
      name: 'Rice', 
      type: 'Grain',
      currentPrice: 25000,
      previousPrice: 18000,
      priceChange: 38.9,
      availability: 85,
      demand: 92,
      regionData: [
        { region: 'Lagos', price: 28000 },
        { region: 'Abuja', price: 25000 },
        { region: 'Port Harcourt', price: 24000 },
        { region: 'Kano', price: 23000 },
        { region: 'Enugu', price: 26000 }
      ],
      priceHistory: [
        { date: 'Jan', price: 18000 },
        { date: 'Feb', price: 19500 },
        { date: 'Mar', price: 21000 },
        { date: 'Apr', price: 22500 },
        { date: 'May', price: 23000 },
        { date: 'Jun', price: 24500 },
        { date: 'Jul', price: 25000 }
      ]
    },
    { 
      id: 2, 
      name: 'Beans', 
      type: 'Legume',
      currentPrice: 22000,
      previousPrice: 15000,
      priceChange: 46.7,
      availability: 70,
      demand: 85,
      regionData: [
        { region: 'Lagos', price: 24000 },
        { region: 'Abuja', price: 22000 },
        { region: 'Port Harcourt', price: 21500 },
        { region: 'Kano', price: 20000 },
        { region: 'Enugu', price: 23000 }
      ],
      priceHistory: [
        { date: 'Jan', price: 15000 },
        { date: 'Feb', price: 16500 },
        { date: 'Mar', price: 18000 },
        { date: 'Apr', price: 19500 },
        { date: 'May', price: 20000 },
        { date: 'Jun', price: 21000 },
        { date: 'Jul', price: 22000 }
      ]
    },
    { 
      id: 3, 
      name: 'Garri', 
      type: 'Tuber derivative',
      currentPrice: 12000,
      previousPrice: 8000,
      priceChange: 50.0,
      availability: 90,
      demand: 95,
      regionData: [
        { region: 'Lagos', price: 13000 },
        { region: 'Abuja', price: 12000 },
        { region: 'Port Harcourt', price: 11000 },
        { region: 'Kano', price: 12500 },
        { region: 'Enugu', price: 11500 }
      ],
      priceHistory: [
        { date: 'Jan', price: 8000 },
        { date: 'Feb', price: 8500 },
        { date: 'Mar', price: 9000 },
        { date: 'Apr', price: 10000 },
        { date: 'May', price: 10500 },
        { date: 'Jun', price: 11000 },
        { date: 'Jul', price: 12000 }
      ]
    },
    { 
      id: 4, 
      name: 'Yam', 
      type: 'Tuber',
      currentPrice: 28000,
      previousPrice: 20000,
      priceChange: 40.0,
      availability: 65,
      demand: 80,
      regionData: [
        { region: 'Lagos', price: 30000 },
        { region: 'Abuja', price: 28000 },
        { region: 'Port Harcourt', price: 27000 },
        { region: 'Kano', price: 29000 },
        { region: 'Enugu', price: 26000 }
      ],
      priceHistory: [
        { date: 'Jan', price: 20000 },
        { date: 'Feb', price: 22000 },
        { date: 'Mar', price: 23500 },
        { date: 'Apr', price: 25000 },
        { date: 'May', price: 26000 },
        { date: 'Jun', price: 27000 },
        { date: 'Jul', price: 28000 }
      ]
    },
    { 
      id: 5, 
      name: 'Palm Oil', 
      type: 'Oil',
      currentPrice: 32000,
      previousPrice: 24000,
      priceChange: 33.3,
      availability: 75,
      demand: 88,
      regionData: [
        { region: 'Lagos', price: 34000 },
        { region: 'Abuja', price: 32000 },
        { region: 'Port Harcourt', price: 30000 },
        { region: 'Kano', price: 33000 },
        { region: 'Enugu', price: 31000 }
      ],
      priceHistory: [
        { date: 'Jan', price: 24000 },
        { date: 'Feb', price: 25500 },
        { date: 'Mar', price: 27000 },
        { date: 'Apr', price: 28500 },
        { date: 'May', price: 30000 },
        { date: 'Jun', price: 31000 },
        { date: 'Jul', price: 32000 }
      ]
    },
  ];

  useEffect(() => {
    // Filter food items based on search query
    const filteredItems = mockFoodItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFoodItems(filteredItems);
    
    // Set default selected food if none is selected or if the selected one is filtered out
    if (!selectedFood && filteredItems.length > 0) {
      setSelectedFood(filteredItems[0]);
    } else if (selectedFood && !filteredItems.find(item => item.id === selectedFood.id)) {
      setSelectedFood(filteredItems.length > 0 ? filteredItems[0] : null);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Initialize with mock data
    setFoodItems(mockFoodItems);
    setSelectedFood(mockFoodItems[0]);
  }, []);

  // Mock market index data
  const marketIndexData = [
    { name: 'Overall Food Index', value: 312.5, change: 8.2, direction: 'up' },
    { name: 'Grains Index', value: 289.3, change: 12.5, direction: 'up' },
    { name: 'Vegetables Index', value: 245.8, change: 5.3, direction: 'up' },
    { name: 'Protein Index', value: 356.2, change: 15.1, direction: 'up' }
  ];

  // Color configurations
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  if (!selectedFood) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile */}
      <div className="fixed inset-y-0 left-0 hidden md:flex md:w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-green-700">FoodInsight</h1>
        </div>
        <div className="flex flex-col flex-grow p-4 overflow-y-auto">
          <nav className="flex-1 space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'overview' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <span>Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab('trends')}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'trends' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <span>Price Trends</span>
            </button>
            <button 
              onClick={() => setActiveTab('regional')}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'regional' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <span>Regional Data</span>
            </button>
            <button 
              onClick={() => setActiveTab('forecast')}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'forecast' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <span>Forecast</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-bold text-green-700">FoodInsight</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 rounded-md hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="absolute z-10 w-full bg-white border-b border-gray-200">
            <nav className="px-2 py-3">
              <button 
                onClick={() => {
                  setActiveTab('overview');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'overview' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <span>Overview</span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab('trends');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'trends' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <span>Price Trends</span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab('regional');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'regional' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <span>Regional Data</span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab('forecast');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${activeTab === 'forecast' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <span>Forecast</span>
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-4 md:p-6">
        {/* Top Header with Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">Nigerian Food Price Analytics</h2>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a food item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <div className="flex items-center gap-1">
              <button className="px-3 py-2 bg-white rounded-lg border border-gray-300 flex items-center gap-1 hover:bg-gray-50">
                <Filter size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Filter</span>
              </button>

              <div className="flex rounded-lg border border-gray-300 bg-white">
                {['1D', '1W', '1M', '3M', 'YTD'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-2 text-xs font-medium ${
                      selectedTimeframe === timeframe
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Food Selection Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6 overflow-x-auto">
          {foodItems.map((food) => (
            <button
              key={food.id}
              onClick={() => setSelectedFood(food)}
              className={`p-4 rounded-lg flex flex-col items-start transition-all ${
                selectedFood && selectedFood.id === food.id
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span className="text-sm font-medium">{food.name}</span>
              <div className="flex items-center mt-1">
                <span className="font-semibold">₦{(food.currentPrice/1000).toFixed(1)}k</span>
                <span className={`ml-2 text-xs flex items-center ${
                  selectedFood && selectedFood.id === food.id
                    ? food.priceChange >= 0 ? 'text-green-100' : 'text-red-100'
                    : food.priceChange >= 0 ? 'text-green-600' : 'text-red-500'
                }`}>
                  {food.priceChange >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {food.priceChange}%
                </span>
              </div>
              <span className={`text-xs mt-1 ${
                selectedFood && selectedFood.id === food.id
                  ? 'text-green-100'
                  : 'text-gray-500'
              }`}>{food.type}</span>
            </button>
          ))}
        </div>

        {/* Market Index Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {marketIndexData.map((index, i) => (
            <div key={i} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-600">{index.name}</h3>
                <ArrowUpRight size={16} className="text-gray-400" />
              </div>
              <div className="flex items-baseline mt-2">
                <span className="text-2xl font-bold text-gray-800">{index.value}</span>
                <span className={`ml-2 text-sm flex items-center ${
                  index.direction === 'up' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {index.direction === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {index.change}%
                </span>
              </div>
              <span className="text-xs text-gray-500 flex items-center mt-1">
                <Clock size={12} className="mr-1" /> Last updated 2 hours ago
              </span>
            </div>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && selectedFood && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Price Overview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-1 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Price Trend - {selectedFood.name}</h3>
                <div className="text-sm text-gray-500">Last 7 months</div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedFood.priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{fontSize: 12}} stroke="#9CA3AF" />
                    <YAxis 
                      tickFormatter={(value) => `₦${value/1000}k`}
                      tick={{fontSize: 12}}
                      stroke="#9CA3AF"
                    />
                    <Tooltip 
                      formatter={(value) => [`₦${value.toLocaleString()}`, 'Price']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#16A34A" 
                      strokeWidth={2} 
                      dot={{r: 4, strokeWidth: 2}} 
                      activeDot={{r: 6, strokeWidth: 2}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Current Price</span>
                    <span className="text-sm font-semibold text-gray-800">₦{selectedFood.currentPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Previous Price</span>
                    <span className="text-sm text-gray-800">₦{selectedFood.previousPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Change</span>
                    <span className={`text-sm font-medium ${selectedFood.priceChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {selectedFood.priceChange >= 0 ? '+' : ''}{selectedFood.priceChange}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-2">Availability</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${selectedFood.availability}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Low</span>
                    <span className="text-xs font-medium text-gray-700">{selectedFood.availability}%</span>
                    <span className="text-xs text-gray-500">High</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-2">Demand</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${selectedFood.demand}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Low</span>
                    <span className="text-xs font-medium text-gray-700">{selectedFood.demand}%</span>
                    <span className="text-xs text-gray-500">High</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Distribution by Type</h4>
                  <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Local', value: 65 },
                            { name: 'Imported', value: 35 }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {[
                            { name: 'Local', value: 65 },
                            { name: 'Imported', value: 35 }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && selectedFood && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Price Trend Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-1 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Extended Price History - {selectedFood.name}</h3>
                <div className="text-sm text-gray-500">Yearly Comparison</div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      ...selectedFood.priceHistory,
                      { date: 'Aug', price: selectedFood.currentPrice * 1.05 },
                      { date: 'Sep', price: selectedFood.currentPrice * 1.07 },
                      { date: 'Oct', price: selectedFood.currentPrice * 1.1 },
                      { date: 'Nov', price: selectedFood.currentPrice * 1.12 },
                      { date: 'Dec', price: selectedFood.currentPrice * 1.15 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{fontSize: 12}} stroke="#9CA3AF" />
                    <YAxis 
                      tickFormatter={(value) => `₦${value/1000}k`}
                      tick={{fontSize: 12}}
                      stroke="#9CA3AF"
                    />
                    <Tooltip 
                      formatter={(value) => [`₦${value.toLocaleString()}`, 'Price']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      name="Current Year Price" 
                      stroke="#16A34A" 
                      strokeWidth={2} 
                      dot={{r: 4, strokeWidth: 2}} 
                      activeDot={{r: 6, strokeWidth: 2}}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lastYearPrice" 
                      name="Previous Year Price" 
                      stroke="#9CA3AF" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Price Factors */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Influencing Factors</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Fuel Price Impact</span>
                    <span className="text-sm font-medium text-red-500">High</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Seasonal Effects</span>
                    <span className="text-sm font-medium text-yellow-500">Medium</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Import Dependence</span>
                    <span className="text-sm font-medium text-orange-500">Medium-High</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Currency Exchange</span>
                    <span className="text-sm font-medium text-red-500">High</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Supply Chain</span>
                    <span className="text-sm font-medium text-yellow-500">Medium</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Price Correlation with Other Items</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Beans</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">80%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Garri</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Palm Oil</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">45%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'regional' && selectedFood && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Regional Price Comparison */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-1 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Regional Price Comparison - {selectedFood.name}</h3>
                <div className="text-sm text-gray-500">Major Cities</div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedFood.regionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="region" tick={{fontSize: 12}} stroke="#9CA3AF" />
                    <YAxis 
                      tickFormatter={(value) => `₦${value/1000}k`}
                      tick={{fontSize: 12}}
                      stroke="#9CA3AF"
                    />
                    <Tooltip 
                      formatter={(value) => [`₦${value.toLocaleString()}`, 'Price']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Bar dataKey="price" fill="#16A34A" barSize={40} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Regional Insights */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Regional Insights</h3>
              
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Highest Price Region</h4>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-medium">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Lagos</p>
                      <p className="text-xs text-gray-500">₦28,000 per bag</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Lowest Price Region</h4>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-medium">5</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Kano</p>
                      <p className="text-xs text-gray-500">₦23,000 per bag</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Price Distribution</h4>
                  <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={selectedFood.regionData.map(item => ({
                            name: item.region,
                            value: item.price
                          }))}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {selectedFood.regionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Price']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Price Difference</h4>
                  <p className="text-sm text-gray-600">
                    The price difference between the highest and lowest regions is 
                    <span className="font-medium text-red-500"> ₦5,000</span>, 
                    representing a <span className="font-medium text-red-500">21.7%</span> variation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forecast' && selectedFood && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Forecast Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-1 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Price Forecast - {selectedFood.name}</h3>
                <div className="text-sm text-gray-500">Next 6 Months</div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { date: 'Jul', price: selectedFood.currentPrice, forecast: selectedFood.currentPrice },
                      { date: 'Aug', price: null, forecast: Math.round(selectedFood.currentPrice * 1.05) },
                      { date: 'Sep', price: null, forecast: Math.round(selectedFood.currentPrice * 1.08) },
                      { date: 'Oct', price: null, forecast: Math.round(selectedFood.currentPrice * 1.12) },
                      { date: 'Nov', price: null, forecast: Math.round(selectedFood.currentPrice * 1.15) },
                      { date: 'Dec', price: null, forecast: Math.round(selectedFood.currentPrice * 1.17) },
                      { date: 'Jan', price: null, forecast: Math.round(selectedFood.currentPrice * 1.2) }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{fontSize: 12}} stroke="#9CA3AF" />
                    <YAxis 
                      tickFormatter={(value) => `₦${value/1000}k`}
                      tick={{fontSize: 12}}
                      stroke="#9CA3AF"
                    />
                    <Tooltip 
                      formatter={(value) => [`₦${value ? value.toLocaleString() : '-'}`, 'Price']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      name="Actual Price" 
                      stroke="#16A34A" 
                      strokeWidth={2} 
                      dot={{r: 4, strokeWidth: 2}} 
                      activeDot={{r: 6, strokeWidth: 2}}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      name="Forecast Price" 
                      stroke="#9333EA" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      dot={{r: 4, strokeWidth: 2}} 
                      activeDot={{r: 6, strokeWidth: 2}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Forecast Insights */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Forecast Insights</h3>
              
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Price Projection</h4>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Current</span>
                    <span className="text-sm font-medium text-gray-800">₦{selectedFood.currentPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">End of Year</span>
                    <span className="text-sm font-medium text-gray-800">₦{Math.round(selectedFood.currentPrice * 1.17).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Projected Change</span>
                    <span className="text-sm font-medium text-red-500">+17%</span>
                  </div>
                </div>
                
                <div className="pt-1 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Influencing Factors</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                        <span className="text-yellow-600 text-xs font-medium">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Festive Season Demand</p>
                        <p className="text-xs text-gray-500">Expected increase in demand during December holidays</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                        <span className="text-yellow-600 text-xs font-medium">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Import Restrictions</p>
                        <p className="text-xs text-gray-500">Government policies affecting imports</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                        <span className="text-yellow-600 text-xs font-medium">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Currency Fluctuations</p>
                        <p className="text-xs text-gray-500">Projected Naira value changes</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-1 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Confidence Level</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">75%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Based on historical patterns and market indicators</p>
                </div>
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-1 lg:col-span-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="text-sm font-medium text-green-800 mb-2">Consumers</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-1.5">•</span>
                      Consider bulk purchasing before projected price increases
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-1.5">•</span>
                      Look for alternative markets with lower prices
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-1.5">•</span>
                      Monitor seasonal price variations for optimal purchasing
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Retailers</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-1.5">•</span>
                      Stock up inventory early for festive season
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-1.5">•</span>
                      Consider direct sourcing from farming regions
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-1.5">•</span>
                      Implement price hedging strategies
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="text-sm font-medium text-purple-800 mb-2">Distributors</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-1.5">•</span>
                      Develop regional storage solutions
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-1.5">•</span>
                      Optimize transport routes to reduce costs
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-1.5">•</span>
                      Strengthen relationships with regional suppliers
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="text-sm text-gray-500">
            <p>© 2025 FoodInsight Analytics • Data updated daily</p>
            <p className="mt-1">All prices are indicative and may vary by specific location and quality</p>
          </div>
          <div className="flex items-center justify-center mt-3 space-x-1">
            <button className="p-1 rounded-md hover:bg-gray-100">
              <ChevronLeft size={16} className="text-gray-500" />
            </button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium text-gray-600">1</button>
            <button className="px-3 py-1 rounded-md bg-green-600 text-white text-sm font-medium">2</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium text-gray-600">3</button>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <ChevronRight size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}