"use client"

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

// Mock data for markets
const markets = [
  { id: 1, name: "Mile 12 Market", location: "Lagos" },
  { id: 2, name: "Bodija Market", location: "Ibadan" },
  { id: 3, name: "Utako Market", location: "Abuja" },
  { id: 4, name: "Main Market", location: "Onitsha" },
  { id: 5, name: "New Market", location: "Enugu" },
  { id: 6, name: "Kaduna Central Market", location: "Kaduna" },
];

// Mock data for food items
const foodItems = [
  { id: 1, name: "Rice (50kg)", category: "Grains" },
  { id: 2, name: "Beans (Honey, 50kg)", category: "Legumes" },
  { id: 3, name: "Spaghetti (carton)", category: "Pasta" },
  { id: 4, name: "Garri (50kg)", category: "Tubers" },
  { id: 5, name: "Palm Oil (25L)", category: "Oils" },
  { id: 6, name: "Tomatoes (basket)", category: "Vegetables" },
];

// Mock price updates
const priceUpdates = [
  {
    id: 1,
    foodItem: "Rice (50kg)",
    market: "Mile 12 Market",
    oldPrice: 46000,
    newPrice: 52000,
    date: "2025-04-01",
    username: "marketTracker",
    comments: 24,
    upvotes: 45,
  },
  {
    id: 2,
    foodItem: "Beans (Honey, 50kg)",
    market: "Bodija Market",
    oldPrice: 39000,
    newPrice: 42000,
    date: "2025-04-02",
    username: "priceHunter",
    comments: 18,
    upvotes: 32,
  },
  {
    id: 3,
    foodItem: "Spaghetti (carton)",
    market: "Utako Market",
    oldPrice: 8500,
    newPrice: 7800,
    date: "2025-04-03",
    username: "foodPriceAlert",
    comments: 37,
    upvotes: 62,
  },
  {
    id: 4,
    foodItem: "Garri (50kg)",
    market: "Main Market",
    oldPrice: 25000,
    newPrice: 28000,
    date: "2025-04-02",
    username: "marketInsider",
    comments: 15,
    upvotes: 28,
  },
  {
    id: 5,
    foodItem: "Palm Oil (25L)",
    market: "New Market",
    oldPrice: 32000,
    newPrice: 35000,
    date: "2025-04-04",
    username: "naijaShopper",
    comments: 29,
    upvotes: 41,
  },
];

// Mock discussions
const discussions = [
  {
    id: 1,
    title: "Rice prices skyrocketing in Lagos markets",
    author: "EconomyWatcher",
    date: "2025-04-02",
    content:
      "I visited Mile 12 today and was shocked to see the price of rice has increased by almost 15% in just two weeks. Anyone else noticing this trend?",
    comments: 42,
    views: 230,
  },
  {
    id: 2,
    title: "Best market for bulk bean purchase in Ibadan?",
    author: "FoodVendor",
    date: "2025-04-01",
    content:
      "Looking to buy beans in bulk for my food business. Which market in Ibadan currently offers the best prices?",
    comments: 18,
    views: 145,
  },
  {
    id: 3,
    title: "Price comparison: Local vs imported spaghetti",
    author: "PastaLover",
    date: "2025-04-03",
    content:
      "Has anyone done a recent price comparison between locally produced and imported spaghetti brands? The price gap seems to be closing.",
    comments: 26,
    views: 187,
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("updates");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-green-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-white text-xl font-bold">
                  NaijaFoodPrices
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="#"
                  className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Markets
                </a>
                <a
                  href="#"
                  className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Food Items
                </a>
                <a
                  href="#"
                  className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Discussions
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sign In
              </button>
              <button className="ml-4 bg-white text-green-700 hover:bg-green-100 px-4 py-2 rounded-md text-sm font-medium">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Track Food Prices Across Nigerian Markets
          </h1>
          <p className="text-xl text-green-100 mb-8">
            Join our community of price trackers helping Nigerians make informed
            food purchasing decisions
          </p>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for food items or markets..."
              className="w-full py-3 px-4 pr-12 rounded-lg border-0 focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <p className="text-2xl font-bold text-green-700">24</p>
              <p className="text-gray-500">Markets Tracked</p>
            </div>
            <div className="p-4">
              <p className="text-2xl font-bold text-green-700">87</p>
              <p className="text-gray-500">Food Items</p>
            </div>
            <div className="p-4">
              <p className="text-2xl font-bold text-green-700">15,423</p>
              <p className="text-gray-500">Price Updates</p>
            </div>
            <div className="p-4">
              <p className="text-2xl font-bold text-green-700">5,218</p>
              <p className="text-gray-500">Community Members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="md:w-3/4">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("updates")}
                  className={`${
                    activeTab === "updates"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Recent Price Updates
                </button>
                <button
                  onClick={() => setActiveTab("discussions")}
                  className={`${
                    activeTab === "discussions"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Hot Discussions
                </button>
                <button
                  onClick={() => setActiveTab("trends")}
                  className={`${
                    activeTab === "trends"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Price Trends
                </button>
              </nav>
            </div>

            {/* Price Updates Tab */}
            {activeTab === "updates" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Recent Price Updates
                  </h2>
                  <button className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-200">
                    Submit Price Update
                  </button>
                </div>

                <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
                  {priceUpdates.map((update) => (
                    <div key={update.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {update.foodItem}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {update.market}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="text-gray-500 line-through mr-2">
                              ₦{update.oldPrice.toLocaleString()}
                            </span>
                            <span
                              className={`text-lg font-bold ${
                                update.newPrice > update.oldPrice
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              ₦{update.newPrice.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Updated on {update.date}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <span>Posted by {update.username}</span>
                        </div>
                        <div className="flex space-x-4">
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <svg
                              className="h-5 w-5 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                              ></path>
                            </svg>
                            <span>{update.upvotes}</span>
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <svg
                              className="h-5 w-5 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                              ></path>
                            </svg>
                            <span>{update.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <button className="text-green-600 hover:text-green-800 font-medium">
                    Load More Updates
                  </button>
                </div>
              </div>
            )}

            {/* Discussions Tab */}
            {activeTab === "discussions" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Hot Discussions
                  </h2>
                  <button className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-200">
                    Start New Topic
                  </button>
                </div>

                <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {discussion.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Started by {discussion.author} on {discussion.date}
                          </p>
                          <p className="mt-2 text-sm text-gray-600">
                            {discussion.content}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-6 text-sm">
                        <div className="flex items-center text-gray-500">
                          <svg
                            className="h-5 w-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                          </svg>
                          <span>{discussion.views} views</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <svg
                            className="h-5 w-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            ></path>
                          </svg>
                          <span>{discussion.comments} comments</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <button className="text-green-600 hover:text-green-800 font-medium">
                    View All Discussions
                  </button>
                </div>
              </div>
            )}

            {/* Price Trends Tab */}
            {activeTab === "trends" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Price Trends
                  </h2>
                  <div>
                    <select className="bg-white border border-gray-300 rounded-md py-2 px-3 text-sm">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last year</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white shadow overflow-hidden rounded-lg p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Rice Price Trend
                    </h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-500">
                        [Price trend chart would appear here]
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Beans Price Trend
                    </h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-500">
                        [Price trend chart would appear here]
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Spaghetti Price Trend
                    </h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-500">
                        [Price trend chart would appear here]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="md:w-1/4">
            {/* Markets */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Popular Markets
              </h3>
              <ul className="space-y-3">
                {markets.map((market) => (
                  <li key={market.id}>
                    <a
                      href="#"
                      className="flex items-center text-gray-700 hover:text-green-600"
                    >
                      <svg
                        className="h-5 w-5 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span>
                        {market.name}, {market.location}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <a
                  href="#"
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  View All Markets →
                </a>
              </div>
            </div>

            {/* Food Categories */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Food Categories
              </h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block px-3 py-2 rounded bg-green-100 text-green-800 font-medium"
                >
                  Grains & Rice
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
                >
                  Legumes & Beans
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
                >
                  Pasta & Noodles
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
                >
                  Tubers & Roots
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
                >
                  Oils & Fats
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
                >
                  Vegetables & Fruits
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
                >
                  Spices & Seasonings
                </a>
              </div>
            </div>

            {/* Join Community */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 shadow rounded-lg p-6 text-white">
              <h3 className="text-lg font-medium mb-2">Join Our Community</h3>
              <p className="text-green-100 mb-4">
                Help track and share food prices across Nigerian markets
              </p>
              <button className="w-full bg-white text-green-600 hover:bg-green-50 font-medium py-2 px-4 rounded">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
