// components/forum/ActionBar.jsx
"use client"

import { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';

export default function ActionBar({ onSearch, onSortChange, sortOption }) {
  const [searchInput, setSearchInput] = useState("");
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
          <PlusCircle size={18} className="mr-2" />
          New Thread
        </button>
        
        <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-64">
          <input 
            type="text" 
            placeholder="Search forums..." 
            className="border border-gray-300 rounded-md px-4 py-2 pl-9 w-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <button 
            type="submit"
            className="absolute right-2 top-1.5 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600"
          >
            Go
          </button>
        </form>
      </div>
      
      <div className="flex items-center text-sm w-full sm:w-auto justify-between sm:justify-start">
        <span className="text-gray-600 mr-2">Sort by:</span>
        <select 
          className="bg-white border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="popular">Popular</option>
          <option value="most_replies">Most Replies</option>
        </select>
      </div>
    </div>
  );
}