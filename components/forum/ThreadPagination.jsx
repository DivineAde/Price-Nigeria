"use client";

import { useState } from 'react';

export default function ThreadPagination({ totalPages = 12, initialPage = 1 }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    
    // In a real application, you would fetch data for the new page here
    console.log(`Fetching page ${pageNumber}`);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const renderPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(
      <button 
        key={1} 
        onClick={() => handlePageChange(1)}
        className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${
          currentPage === 1 
            ? 'bg-green-600 text-white' 
            : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
        }`}
      >
        1
      </button>
    );
    
    // Show ellipsis if currentPage > 3
    if (currentPage > 3) {
      pages.push(
        <span key="ellipsis1" className="w-8 h-8 flex items-center justify-center text-sm">...</span>
      );
    }
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're added separately
      
      pages.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${
            currentPage === i 
              ? 'bg-green-600 text-white' 
              : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Show ellipsis if currentPage < totalPages - 2
    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="ellipsis2" className="w-8 h-8 flex items-center justify-center text-sm">...</span>
      );
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(
        <button 
          key={totalPages} 
          onClick={() => handlePageChange(totalPages)}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${
            currentPage === totalPages 
              ? 'bg-green-600 text-white' 
              : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };
  
  return (
    <div className="flex justify-between items-center mt-6">
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>
      
      <div className="hidden sm:flex space-x-1">
        {renderPageNumbers()}
      </div>
      
      <div className="sm:hidden text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        Next
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}