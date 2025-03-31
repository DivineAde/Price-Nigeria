// components/forum/CategoryTabs.jsx
"use client"

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex overflow-x-auto scrollbar-hide space-x-2 mb-4 pb-1">
      {categories.map((category) => (
        <button 
          key={category}
          className={`px-4 py-2 rounded-md whitespace-nowrap text-sm transition-colors ${
            activeCategory === category 
              ? 'bg-green-600 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}