// components/ui/Pagination.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  
  // Generate page numbers with ellipsis for long ranges
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    
    if (currentPage > 3) {
      pages.push('...');
    }
    
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    
    pages.push(totalPages);
  }
  
  return (
    <div className="flex justify-between items-center mt-6">
      <button 
        className={`px-3 py-2 bg-white border border-gray-300 rounded-md text-sm flex items-center transition-colors ${
          currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} className="mr-1" />
        Previous
      </button>
      
      <div className="hidden sm:flex space-x-1">
        {pages.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-sm text-gray-500">
              ...
            </span>
          ) : (
            <button 
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors ${
                currentPage === page 
                  ? 'bg-green-600 text-white font-medium' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      <button 
        className={`px-3 py-2 bg-white border border-gray-300 rounded-md text-sm flex items-center transition-colors ${
          currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
        }`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
}