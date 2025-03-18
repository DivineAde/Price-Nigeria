"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRightIcon, 
  MagnifyingGlassIcon,
  ArrowRightIcon,
  StarIcon
} from "@heroicons/react/24/solid";
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  TruckIcon,
  TagIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

const CategoryCard = ({ category }) => {
  return (
    <Link 
      href={`/category/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{category.name}</h3>
          <p className="text-sm text-white/80">{category.itemCount} items</p>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="mb-3 flex flex-wrap gap-2">
          {category.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block text-xs px-2 py-1 rounded-full bg-green-50 text-green-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
      </div>
      
      <div className="p-4 pt-0 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">{category.rating}</span>
        </div>
        <span className="flex items-center text-sm font-medium text-green-600 group-hover:text-green-700">
          Explore
          <ChevronRightIcon className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

const FeaturedCategory = ({ category }) => {
  return (
    <div className="relative h-80 overflow-hidden rounded-2xl">
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-6 left-6 right-6">
        <span className="inline-block mb-2 px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
          Featured
        </span>
        <h2 className="text-3xl font-bold text-white mb-2">{category.name}</h2>
        <p className="text-white/80 mb-4 line-clamp-2">{category.description}</p>
        <Link 
          href={`/category/${category.slug}`}
          className="inline-flex items-center px-4 py-2 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors"
        >
          Explore Category
          <ArrowRightIcon className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Sample category data
  const categories = [
    {
      id: 1,
      name: "Food Cupboard",
      slug: "food-cupboard",
      description: "Essential groceries, canned goods, pasta, rice, and other pantry staples for your everyday cooking needs.",
      image: "/pexels-heftiba-940302.jpg",
      itemCount: 342,
      tags: ["Groceries", "Essentials"],
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      name: "Fresh Fruits",
      slug: "fresh-fruits",
      description: "Fresh, seasonal fruits delivered from local farms and international sources.",
      image: "/fruits.jpg",
      itemCount: 124,
      tags: ["Fresh", "Organic"],
      rating: 4.9
    },
    {
      id: 3,
      name: "Beverages",
      slug: "beverages",
      description: "Wide range of drinks including soft drinks, juices, water, and energy drinks.",
      image: "/fruits.jpg",
      itemCount: 278,
      tags: ["Drinks", "Refreshments"],
      rating: 4.6
    },
    {
      id: 4,
      name: "Household",
      slug: "household",
      description: "Everything you need to keep your home clean and maintained, from cleaning supplies to home improvement.",
      image: "/fruits.jpg",
      itemCount: 455,
      tags: ["Home", "Essentials"],
      rating: 4.5
    },
    {
      id: 5,
      name: "Toiletries",
      slug: "toiletries",
      description: "Personal care products including soaps, shampoos, toothpaste, and more.",
      image: "/fruits.jpg",
      itemCount: 387,
      tags: ["Personal Care", "Hygiene"],
      rating: 4.7
    },
    {
      id: 6,
      name: "Baby Products",
      slug: "baby-products",
      description: "Everything for your little ones - from diapers and wipes to baby food and toys.",
      image: "/fruits.jpg",
      itemCount: 213,
      tags: ["Baby", "Care"],
      rating: 4.8
    },
    {
      id: 7,
      name: "Electronics",
      slug: "electronics",
      description: "The latest in consumer electronics, gadgets, and accessories for your digital lifestyle.",
      image: "/fruits.jpg",
      itemCount: 192,
      tags: ["Tech", "Gadgets"],
      rating: 4.6
    },
    {
      id: 8,
      name: "Fresh Vegetables",
      slug: "fresh-vegetables",
      description: "Fresh vegetables sourced from local farms and suppliers with quality you can trust.",
      image: "/fruits.jpg",
      itemCount: 156,
      tags: ["Fresh", "Organic"],
      rating: 4.7
    }
  ];
  
  // Filter categories based on search and active filter
  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "featured") return matchesSearch && category.featured;
    if (activeFilter === "popular") return matchesSearch && category.rating >= 4.7;
    
    return matchesSearch;
  });
  
  // Featured category
  const featuredCategory = categories.find(cat => cat.featured);
  
  // Filter buttons data
  const filters = [
    { id: "all", label: "All Categories" },
    { id: "featured", label: "Featured" },
    { id: "popular", label: "Popular" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 pt-20 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mt-2 mb-4">
            <Link href="/" className="text-green-200 hover:text-white text-sm">
              Home
            </Link>
            <ChevronRightIcon className="h-3 w-3 text-green-200" />
            <span className="text-white text-sm font-medium">Categories</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Shop By Category</h1>
          <p className="text-green-100 text-lg max-w-2xl mb-8">
            Browse our wide range of products organized by category to find exactly what you need at the best prices.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="w-full py-3 pl-12 pr-4 rounded-xl border-0 focus:ring-2 focus:ring-green-500 outline-none shadow-lg"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Featured Category Banner */}
        {featuredCategory && (
          <div className="mb-12">
            <FeaturedCategory category={featuredCategory} />
          </div>
        )}
        
        {/* Why Shop With Us */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-green-50 rounded-lg">
              <ShieldCheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Quality Guarantee</h3>
              <p className="text-sm text-gray-500">Only verified products</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-green-50 rounded-lg">
              <TruckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Fast Delivery</h3>
              <p className="text-sm text-gray-500">Same-day delivery available</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-green-50 rounded-lg">
              <TagIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Best Prices</h3>
              <p className="text-sm text-gray-500">Price comparison on all items</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-green-50 rounded-lg">
              <HeartIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Customer Love</h3>
              <p className="text-sm text-gray-500">Highly rated experience</p>
            </div>
          </div>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
          <span className="text-sm text-gray-500 ml-auto">
            Showing {filteredCategories.length} categories
          </span>
        </div>
        
        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center">
            <ShoppingBagIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-4">
              We couldn't find any categories matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;