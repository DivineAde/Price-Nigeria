// app/forum/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import ThreadList from "@/components/forum/ThreadList";
import ThreadPagination from "@/components/forum/ThreadPagination";

// Mock data for forum threads
const forumThreads = [
  {
    id: 1,
    title: "Rice prices spiking in Lagos markets",
    author: "FoodTracker23",
    replies: 24,
    views: 342,
    lastUpdated: "2h ago",
    category: "Price Alerts",
    isFeatured: true,
    isHot: true,
    tags: ["Lagos", "Rice"],
  },
  {
    id: 2,
    title: "Best markets for fresh vegetables in Abuja",
    author: "GreenHarvest",
    replies: 18,
    views: 203,
    lastUpdated: "Yesterday",
    category: "Market Tips",
    isFeatured: false,
    isHot: false,
    tags: ["Abuja", "Vegetables"],
  },
  {
    id: 3,
    title: "Yam prices continue to fall in Eastern regions",
    author: "MarketWatcher",
    replies: 32,
    views: 451,
    lastUpdated: "3d ago",
    category: "Price Trends",
    isFeatured: true,
    isHot: true,
    tags: ["Yam", "Eastern"],
  },
  {
    id: 4,
    title: "How inflation is affecting garri prices nationwide",
    author: "EconomyExpert",
    replies: 56,
    views: 729,
    lastUpdated: "1w ago",
    category: "Analysis",
    isFeatured: false,
    isHot: true,
    tags: ["Garri", "Inflation"],
  },
  {
    id: 5,
    title: "Palm oil price comparison: North vs South",
    author: "PriceHunter",
    replies: 41,
    views: 382,
    lastUpdated: "5d ago",
    category: "Price Comparison",
    isFeatured: false,
    isHot: false,
    tags: ["Palm Oil", "Comparison"],
  },
];

// Trending topics
const trendingTopics = ["Rice", "Tomatoes", "Beans", "Palm Oil", "Yam"];

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState("All Threads");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchSuggestions(e.target.value.length > 0);
  };

  const searchSuggestions = searchQuery
    ? trendingTopics.filter((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Forum Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 border-b border-green-600 shadow-lg">
        <div className="container mx-auto px-6 py-28">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center">
              <div className="mr-4">
                <svg
                  className="w-10 h-10 text-green-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6V4M12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10M12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10M6 18C7.10457 18 8 17.1046 8 16C8 14.8954 7.10457 14 6 14M6 18C4.89543 18 4 17.1046 4 16C4 14.8954 4.89543 14 6 14M6 18V20M6 14V4M12 10V20M18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14M18 18C16.8954 18 16 17.1046 16 16C16 14.8954 16.8954 14 18 14M18 18V20M18 14V4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Food Price Community
                </h1>
                <p className="text-green-200 text-sm mt-1 font-medium">
                  Track and discuss Nigerian food prices in real-time
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-6 mt-6 border-t border-green-600/50 pt-4">
            <a
              href="#"
              className="text-white font-medium hover:text-green-300 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-green-200 hover:text-green-300 transition-colors"
            >
              Food Prices
            </a>

            <a
              href="#"
              className="text-green-200 hover:text-green-300 transition-colors"
            >
              Community
            </a>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <span>
                <strong>24.5k</strong> Members
              </span>
              <span>
                <strong>384</strong> Online
              </span>
            </div>
            <button className="text-green-600 hover:text-green-800 text-sm font-medium">
              Mark All Read
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column (Main Content) */}
          <div className="md:w-3/4">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  New Thread
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search forums..."
                    className="w-full sm:w-64 border border-gray-300 rounded px-4 py-2 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={handleSearch}
                    onFocus={() =>
                      setShowSearchSuggestions(searchQuery.length > 0)
                    }
                    onBlur={() =>
                      setTimeout(() => setShowSearchSuggestions(false), 200)
                    }
                  />
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>

                  {/* Search Suggestions - Functional */}
                  {showSearchSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg py-1 text-sm">
                      {searchSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setShowSearchSuggestions(false);
                          }}
                        >
                          <svg
                            className="w-4 h-4 text-gray-400 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center text-sm">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto space-x-2 mb-6 pb-1">
              {[
                "All Threads",
                "Price Alerts",
                "Market Tips",
                "Price Trends",
                "Analysis",
              ].map((category) => (
                <button
                  key={category}
                  className={`px-3.5 py-2 rounded-md whitespace-nowrap text-sm transition-colors ${
                    activeCategory === category
                      ? "bg-green-600 text-white shadow-sm"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Thread List Component */}
            <ThreadList
              initialThreads={forumThreads}
              category={activeCategory}
            />

            {/* Pagination Component */}
            <ThreadPagination totalPages={5} initialPage={1} />
          </div>

          {/* Right Column (Sidebar) */}
          <div className="md:w-1/4 space-y-4">
            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 text-green-600 mr-1.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Community Stats
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-2 bg-gray-50 rounded-md">
                  <span className="block text-gray-500 text-xs mb-1">
                    Threads
                  </span>
                  <span className="font-bold text-gray-900">8,942</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-md">
                  <span className="block text-gray-500 text-xs mb-1">
                    Posts
                  </span>
                  <span className="font-bold text-gray-900">142,876</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-md">
                  <span className="block text-gray-500 text-xs mb-1">
                    Members
                  </span>
                  <span className="font-bold text-gray-900">24,531</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-md">
                  <span className="block text-gray-500 text-xs mb-1">
                    Online
                  </span>
                  <span className="font-bold text-green-600">384</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Join Community
              </button>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 text-green-600 mr-1.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, index) => (
                  <Link
                    key={index}
                    href={`/forum/topic/${topic.toLowerCase()}`}
                    className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200 transition-colors flex items-center"
                  >
                    {index < 3 && (
                      <svg
                        className="w-3 h-3 mr-1 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                      </svg>
                    )}
                    {topic}
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest Price Updates */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 text-green-600 mr-1.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm.75-6.75a.75.75 0 00-1.5 0v2.69l-1.72 1.72a.75.75 0 101.06 1.06l2-2a.75.75 0 00.22-.53v-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Latest Price Updates
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-red-50 rounded-md border border-red-100">
                  <div className="font-medium text-red-800 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Rice (50kg)
                  </div>
                  <div className="text-red-600 mt-1 font-medium">
                    ₦62,000 (+8.2%)
                  </div>
                  <div className="text-xs text-red-500 mt-1">
                    Updated 2 hours ago
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-md border border-green-100">
                  <div className="font-medium text-green-800 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Tomatoes (basket)
                  </div>
                  <div className="text-green-600 mt-1 font-medium">
                    ₦15,500 (-12.4%)
                  </div>
                  <div className="text-xs text-green-500 mt-1">
                    Updated 5 hours ago
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-md border border-amber-100">
                  <div className="font-medium text-amber-800 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Beans (100kg)
                  </div>
                  <div className="text-amber-600 mt-1 font-medium">
                    ₦98,000 (0%)
                  </div>
                  <div className="text-xs text-amber-500 mt-1">
                    Updated 1 day ago
                  </div>
                </div>
              </div>
              <Link
                href="/prices"
                className="mt-3 block text-center text-green-600 hover:text-green-700 text-sm font-medium py-2 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
              >
                View All Prices
              </Link>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 text-green-600 mr-1.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Active Members
              </h3>
              <div className="flex flex-wrap gap-2">
                {["A", "B", "C", "D", "E", "F", "G", "H"].map(
                  (letter, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm"
                      title={`User ${letter}`}
                    >
                      {letter}
                    </div>
                  )
                )}
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs">
                  +376
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
