"use client"

// NigerianAnalyticsSection.jsx
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, TrendingUp, AlertTriangle } from 'lucide-react';

const NigerianAnalyticsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('staples');
  const [timeRange, setTimeRange] = useState('month');
  
  // Sample data with Nigerian food items and pricing in Naira
  const priceData = {
    staples: [
      { name: 'Week 1', rice: 2500, beans: 1800, garri: 800, yam: 1500 },
      { name: 'Week 2', rice: 2600, beans: 1850, garri: 850, yam: 1550 },
      { name: 'Week 3', rice: 2650, beans: 1900, garri: 900, yam: 1600 },
      { name: 'Week 4', rice: 2700, beans: 1950, garri: 950, yam: 1500 },
    ],
    vegetables: [
      { name: 'Week 1', tomatoes: 700, pepper: 500, onions: 600, spinach: 300 },
      { name: 'Week 2', tomatoes: 800, pepper: 550, onions: 650, spinach: 320 },
      { name: 'Week 3', tomatoes: 850, pepper: 520, onions: 630, spinach: 330 },
      { name: 'Week 4', tomatoes: 780, pepper: 530, onions: 610, spinach: 310 },
    ],
    protein: [
      { name: 'Week 1', beef: 3500, chicken: 4200, fish: 2800, eggs: 1800 },
      { name: 'Week 2', beef: 3600, chicken: 4300, fish: 2850, eggs: 1850 },
      { name: 'Week 3', beef: 3650, chicken: 4250, fish: 2900, eggs: 1900 },
      { name: 'Week 4', beef: 3700, chicken: 4350, fish: 2950, eggs: 1950 },
    ]
  };

  const availabilityData = [
    { name: 'In Stock', value: 65 },
    { name: 'Limited', value: 25 },
    { name: 'Out of Stock', value: 10 },
  ];

  const COLORS = ['#4ade80', '#fbbf24', '#f87171'];

  const topPriceChanges = [
    { item: 'Tomatoes', change: +15.3, price: '₦780/kg' },
    { item: 'Rice (local)', change: +8.0, price: '₦2,700/kg' },
    { item: 'Yam', change: -3.2, price: '₦1,500/tuber' },
    { item: 'Palm Oil', change: +9.5, price: '₦1,450/litre' },
  ];

  const alerts = [
    { item: 'Tomatoes', message: 'Shortage expected due to rainfall in Northern regions' },
    { item: 'Rice', message: 'Price increase expected due to import restrictions' },
  ];

  const categories = [
    { id: 'staples', name: 'Staples' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'protein', name: 'Protein' },
  ];

  const timeRanges = [
    { id: 'week', name: 'Week' },
    { id: 'month', name: 'Month' },
    { id: 'year', name: 'Year' },
  ];

  // Function to get chart data based on selected category
  const getChartData = () => {
    return priceData[selectedCategory] || [];
  };

  // Function to get keys for selected category (excluding 'name')
  const getCategoryKeys = () => {
    const data = priceData[selectedCategory];
    return data && data.length > 0 
      ? Object.keys(data[0]).filter(key => key !== 'name') 
      : [];
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Market <span className="text-emerald-500">Analytics</span>
          </h2>
          <p className="text-xl text-gray-600">
            Track Nigerian market trends, price fluctuations, and food availability to optimize your household budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Price Trends (₦)</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <div className="flex rounded-md overflow-hidden border border-gray-200">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-3 py-1 text-sm ${
                          selectedCategory === category.id
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex rounded-md overflow-hidden border border-gray-200">
                    {timeRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setTimeRange(range.id)}
                        className={`px-3 py-1 text-sm ${
                          timeRange === range.id
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {range.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getChartData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₦${value}`} />
                    <Legend />
                    {getCategoryKeys().map((key, index) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={['#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][index % 4]}
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Availability</CardTitle>
              <CardDescription>Current stock levels at local markets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={availabilityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {availabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4">
                {availabilityData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Significant Price Changes</CardTitle>
              <CardDescription>Last 7 days at major markets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topPriceChanges.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.item}</h4>
                      <p className="text-sm text-gray-500">{item.price}</p>
                    </div>
                    <div className={`flex items-center ${
                      item.change > 0 ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {item.change > 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="font-medium">{Math.abs(item.change)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Alerts</CardTitle>
              <CardDescription>Upcoming shortages and price changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex p-4 bg-amber-50 border border-amber-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">{alert.item}</h4>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center pt-2">
                  <button className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    View market reports
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NigerianAnalyticsSection;