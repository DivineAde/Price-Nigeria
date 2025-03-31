"use client"

// app/forum/page.js
import { useState } from 'react';
import ForumHeader from '@/components/forum/ForumHeader';
import CommunityStats from '@/components/forum/CommunityStats';
import ThreadList from '@/components/forum/ThreadList';
import ForumSidebar from '@/components/forum/ForumSidebar';
import CategoryTabs from '@/components/forum/CategoryTabs';
import ActionBar from '@/components/forum/ActionBar';
import Pagination from '@/components/forum/Pagination';
import { forumThreads, categories } from '@/data/forumData';

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState("All Threads");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  
  // Filter threads based on active category and search query
  const filteredThreads = forumThreads.filter(thread => {
    const matchesCategory = activeCategory === "All Threads" || thread.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  // Sort threads based on selected option
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (sortOption === "latest") {
      return 0; // Assuming the data is already sorted by latest
    } else if (sortOption === "popular") {
      return b.views - a.views;
    } else if (sortOption === "most_replies") {
      return b.replies - a.replies;
    }
    return 0;
  });
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  const handleSortChange = (option) => {
    setSortOption(option);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ForumHeader />
      <CommunityStats onMarkAllRead={() => console.log("Mark all read clicked")} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="lg:w-2/3 xl:w-3/4 space-y-4">
            <ActionBar 
              onSearch={handleSearch}
              onSortChange={handleSortChange}
              sortOption={sortOption}
            />
            
            <CategoryTabs 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            {/*
            <ThreadList threads={sortedThreads} />
            */}
            
            <Pagination 
              currentPage={currentPage}
              totalPages={5} // Would be calculated based on actual data
              onPageChange={handlePageChange}
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 xl:w-1/4">
            
          </div>
        </div>
      </div>
    </div>
  );
}