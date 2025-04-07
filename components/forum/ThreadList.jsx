"use client";

import { useState, useEffect } from 'react';
import ThreadItem from './ThreadItem';
import ThreadListSkeleton from './ThreadListSkeleton';

export default function ThreadList({ initialThreads = [], category = "All Threads" }) {
  const [threads, setThreads] = useState(initialThreads);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState('latest');
  
  // Filter threads based on active category
  const filteredThreads = category === "All Threads" 
    ? threads 
    : threads.filter(thread => thread.category === category);
  
  // Sort threads based on sort option
  useEffect(() => {
    setIsLoading(true);
    
    const sortedThreads = [...threads];
    
    switch(sortOption) {
      case 'latest':
        sortedThreads.sort((a, b) => {
          const timeA = getTimeInMinutes(a.lastUpdated);
          const timeB = getTimeInMinutes(b.lastUpdated);
          return timeA - timeB;
        });
        break;
      case 'popular':
        sortedThreads.sort((a, b) => b.views - a.views);
        break;
      case 'mostReplies':
        sortedThreads.sort((a, b) => b.replies - a.replies);
        break;
      default:
        break;
    }
    
    setTimeout(() => {
      setThreads(sortedThreads);
      setIsLoading(false);
    }, 300);
  }, [sortOption]);
  
  // Helper function to convert time strings to minutes for sorting
  const getTimeInMinutes = (timeString) => {
    if (timeString.includes('h')) {
      return parseInt(timeString) * 60;
    } else if (timeString.includes('d')) {
      return parseInt(timeString) * 24 * 60;
    } else if (timeString.includes('w')) {
      return parseInt(timeString) * 7 * 24 * 60;
    } else if (timeString === 'Yesterday') {
      return 24 * 60;
    } else {
      return 0; // For any other format, default to most recent
    }
  };
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  return (
    <div>
      {/* Sort Dropdown - Functional */}
      <div className="flex justify-end mb-3">
        <div className="flex items-center text-sm">
          <span className="text-gray-500 mr-2">Sort by:</span>
          <select 
            className="bg-white border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Views</option>
            <option value="mostReplies">Most Replies</option>
          </select>
        </div>
      </div>
      
      {/* Thread Listing with improved design */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden divide-y divide-gray-200">
        {isLoading ? (
          <ThreadListSkeleton count={5} />
        ) : (
          filteredThreads.map(thread => (
            <ThreadItem key={thread.id} thread={thread} />
          ))
        )}
        
        {filteredThreads.length === 0 && !isLoading && (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">No threads found</h3>
            <p className="text-gray-500 mt-1">Be the first to start a conversation in this category</p>
            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
              Create New Thread
            </button>
          </div>
        )}
      </div>
    </div>
  );
}