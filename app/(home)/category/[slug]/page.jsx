"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ChevronRightIcon, 
  MagnifyingGlassIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/solid";
import { 
  ClockIcon,
  ArchiveBoxIcon,
  TagIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

const CategorySlugPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [lastUpdated, setLastUpdated] = useState(null);
  
  useEffect(() => {
    // Simulating fetching category data based on slug
    // In a real app, this would be an API call
    const fetchCategory = () => {
      const categories = {
        "food-cupboard": {
          id: 1,
          name: "Food Cupboard",
          slug: "food-cupboard",
          description: "Essential groceries, canned goods, pasta, rice, and other pantry staples for your everyday cooking needs.",
          image: "/pexels-heftiba-940302.jpg",
          items: [
            {
              id: 101,
              name: "Stallion Rice",
              quantity: "50kg",
              price: 56000,
              previousPrice: 52000,
              priceChange: "increased",
              lastUpdated: "2025-03-15",
              marketLocation: "Mile 12 Market",
              availability: "High"
            },
            {
              id: 102,
              name: "Beans (Honey)",
              quantity: "3 cups",
              price: 1500,
              previousPrice: 1200,
              priceChange: "increased",
              lastUpdated: "2025-03-16",
              marketLocation: "Oyingbo Market",
              availability: "Medium"
            },
            {
              id: 103,
              name: "Golden Penny Spaghetti",
              quantity: "Pack of 3",
              price: 1800,
              previousPrice: 1800,
              priceChange: "stable",
              lastUpdated: "2025-03-17",
              marketLocation: "Daleko Market",
              availability: "High"
            },
            {
              id: 104,
              name: "Kings Vegetable Oil",
              quantity: "5 liters",
              price: 12500,
              previousPrice: 11000,
              priceChange: "increased",
              lastUpdated: "2025-03-14",
              marketLocation: "Mushin Market",
              availability: "High"
            },
            {
              id: 105,
              name: "Garri (White)",
              quantity: "1 mudu",
              price: 800,
              previousPrice: 950,
              priceChange: "decreased",
              lastUpdated: "2025-03-18",
              marketLocation: "Agege Market",
              availability: "High"
            },
            {
              id: 106,
              name: "Indomie Instant Noodles",
              quantity: "Carton of 40",
              price: 14500,
              previousPrice: 13800,
              priceChange: "increased",
              lastUpdated: "2025-03-15",
              marketLocation: "Idumota Market",
              availability: "High"
            },
            {
              id: 107,
              name: "Semovita",
              quantity: "10kg",
              price: 15000,
              previousPrice: 14500,
              priceChange: "increased",
              lastUpdated: "2025-03-16",
              marketLocation: "Balogun Market",
              availability: "Medium"
            },
            {
              id: 108,
              name: "Powdered Milk (Peak)",
              quantity: "900g",
              price: 8200,
              previousPrice: 7900,
              priceChange: "increased",
              lastUpdated: "2025-03-17",
              marketLocation: "Ajah Market",
              availability: "High"
            }
          ]
        },
        "fresh-fruits": {
          id: 2,
          name: "Fresh Fruits",
          slug: "fresh-fruits",
          description: "Fresh, seasonal fruits delivered from local farms and international sources.",
          image: "/fruits.jpg",
          items: [
            {
              id: 201,
              name: "Apples (Red)",
              quantity: "1 dozen",
              price: 3500,
              previousPrice: 3800,
              priceChange: "decreased",
              lastUpdated: "2025-03-16",
              marketLocation: "Oyingbo Market",
              availability: "High"
            },
            {
              id: 202,
              name: "Bananas",
              quantity: "Bunch of 6",
              price: 1200,
              previousPrice: 1000,
              priceChange: "increased",
              lastUpdated: "2025-03-17",
              marketLocation: "Mile 12 Market",
              availability: "High"
            },
            {
              id: 203,
              name: "Watermelon",
              quantity: "Medium sized",
              price: 2500,
              previousPrice: 2800,
              priceChange: "decreased",
              lastUpdated: "2025-03-15",
              marketLocation: "Agege Market",
              availability: "Medium"
            },
            {
              id: 204,
              name: "Oranges",
              quantity: "Bag of 30",
              price: 5000,
              previousPrice: 5200,
              priceChange: "decreased",
              lastUpdated: "2025-03-18",
              marketLocation: "Mushin Market",
              availability: "High"
            }
          ]
        },
        "beverages": {
          id: 3,
          name: "Beverages",
          slug: "beverages",
          description: "Wide range of drinks including soft drinks, juices, water, and energy drinks.",
          image: "/fruits.jpg",
          items: [
            {
              id: 301,
              name: "Coca-Cola",
              quantity: "Crate of 24",
              price: 5500,
              previousPrice: 5200,
              priceChange: "increased",
              lastUpdated: "2025-03-15",
              marketLocation: "Idumota Market",
              availability: "High"
            },
            {
              id: 302,
              name: "Lipton Yellow Label Tea",
              quantity: "Box of 100 bags",
              price: 3200,
              previousPrice: 3000,
              priceChange: "increased",
              lastUpdated: "2025-03-16",
              marketLocation: "Balogun Market",
              availability: "High"
            },
            {
              id: 303,
              name: "Nescafe Classic",
              quantity: "200g",
              price: 4500,
              previousPrice: 4500,
              priceChange: "stable",
              lastUpdated: "2025-03-17",
              marketLocation: "Ajah Market",
              availability: "Medium"
            }
          ]
        }
      };
      
      const foundCategory = categories[slug];
      if (foundCategory) {
        setCategory(foundCategory);
        
        // Set the last updated date to the most recent item update
        if (foundCategory.items && foundCategory.items.length > 0) {
          const latestDate = new Date(
            Math.max(...foundCategory.items.map(item => new Date(item.lastUpdated)))
          );
          setLastUpdated(latestDate);
        }
      }
    };
    
    fetchCategory();
  }, [slug]);
  
  // Filter items based on search query
  const filteredItems = category?.items?.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  // Sort items based on selected sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    } else if (sortBy === "recently-updated") {
      return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    }
    return 0;
  });
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <ArchiveBoxIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Category Not Found</h1>
          <p className="text-gray-500 mb-6">The category you're looking for doesn't exist or has been removed.</p>
          <Link href="/category" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Category Banner */}
      <div className="relative h-96">
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-center gap-2 mt-1 mb-4">
            <Link href="/" className="text-green-200 hover:text-white text-sm">
              Home
            </Link>
            <ChevronRightIcon className="h-3 w-3 text-green-200" />
            <Link href="/category" className="text-green-200 hover:text-white text-sm">
              Categories
            </Link>
            <ChevronRightIcon className="h-3 w-3 text-green-200" />
            <span className="text-white text-sm font-medium">{category.name}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
          <p className="text-white/80 max-w-2xl mb-4">{category.description}</p>
          
          {lastUpdated && (
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <ClockIcon className="h-4 w-4" />
              <span>Last updated: {lastUpdated.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* Filter and Sort Controls */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items..."
                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="recently-updated">Recently Updated</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Market Price Information */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Market Price Information</h3>
              <p className="text-sm text-green-700 mt-1">
                Prices shown are current market rates collected from various markets. 
                Prices may vary slightly depending on location and vendor.
              </p>
            </div>
          </div>
        </div>
        
        {/* Items Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Current Prices</h2>
            <span className="text-sm text-gray-500">
              Showing {sortedItems.length} items
            </span>
          </div>
          
          {sortedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {item.quantity}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        item.availability === "High" 
                          ? "bg-green-50 text-green-700" 
                          : item.availability === "Medium"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                      }`}>
                        {item.availability} availability
                      </span>
                    </div>
                    
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-2xl font-bold text-gray-800">
                        ₦{item.price.toLocaleString()}
                      </span>
                      
                      {item.priceChange !== "stable" && (
                        <div className={`flex items-center text-sm ${
                          item.priceChange === "increased" 
                            ? "text-red-600" 
                            : "text-green-600"
                        }`}>
                          <span>
                            {item.priceChange === "increased" ? "▲" : "▼"} 
                            {" "}
                            ₦{Math.abs(item.price - item.previousPrice).toLocaleString()}
                          </span>
                        </div>
                      )}
                      
                      {item.priceChange === "stable" && (
                        <div className="flex items-center text-sm text-gray-500">
                          <span>Price stable</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <TagIcon className="h-4 w-4" />
                        <span>Market: {item.marketLocation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        <span>Updated: {new Date(item.lastUpdated).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <ArchiveBoxIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">No items found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any items matching your search criteria.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
        
        {/* Back to Categories Button */}
        <div className="flex justify-center mt-12">
          <Link href="/category" className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to All Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategorySlugPage;