"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Heart, ShoppingCart, Star, MapPin, Filter, X, BookmarkIcon } from "lucide-react";

// Updated food data with Nigerian household quantities
const foodItems = [
  {
    id: 1,
    name: "Rice (Foreign)",
    price: 85000,
    discountedPrice: 78500,
    quantity: "50kg bag",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Farmers Market", location: "Lagos, Nigeria", rating: 4.5 },
    category: "Grains"
  },
  {
    id: 2,
    name: "Rice (Local)",
    price: 65000,
    discountedPrice: 60000,
    quantity: "50kg bag",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Ajegunle Market", location: "Lagos, Nigeria", rating: 4.2 },
    category: "Grains"
  },
  {
    id: 3,
    name: "Beans (Honey)",
    price: 2500,
    discountedPrice: 2200,
    quantity: "5 cups",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Local Farms", location: "Port Harcourt, Nigeria", rating: 4.7 },
    category: "Legumes"
  },
  {
    id: 4,
    name: "Beans (Oloyin)",
    price: 3000,
    discountedPrice: 2800,
    quantity: "5 cups",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Agro Store", location: "Ibadan, Nigeria", rating: 4.0 },
    category: "Legumes"
  },
  {
    id: 5,
    name: "Spaghetti (Golden Penny)",
    price: 3600,
    discountedPrice: 3300,
    quantity: "x3 packs",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Shoprite", location: "Abuja, Nigeria", rating: 4.3 },
    category: "Pasta"
  },
  {
    id: 6,
    name: "Spaghetti (Dangote)",
    price: 3300,
    discountedPrice: 3000,
    quantity: "x3 packs",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Everyday Supermarket", location: "Kano, Nigeria", rating: 4.6 },
    category: "Pasta"
  },
  {
    id: 7,
    name: "Garri (Ijebu)",
    price: 5000,
    discountedPrice: 4500,
    quantity: "1 bag",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Spice World", location: "Kaduna, Nigeria", rating: 4.4 },
    category: "Processed"
  },
  {
    id: 8,
    name: "Red Oil",
    price: 8000,
    discountedPrice: 7200,
    quantity: "5 litres",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Vegetable King", location: "Owerri, Nigeria", rating: 4.1 },
    category: "Cooking Oil"
  },
  {
    id: 9,
    name: "Yam",
    price: 25000,
    discountedPrice: 22000,
    quantity: "1 bag (12 tubers)",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Tubers Direct", location: "Jos, Nigeria", rating: 4.8 },
    category: "Tubers"
  },
  {
    id: 10,
    name: "Semovita",
    price: 2800,
    discountedPrice: 2500,
    quantity: "2kg bag",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Grains Galore", location: "Sokoto, Nigeria", rating: 4.9 },
    category: "Flour"
  },
  {
    id: 11,
    name: "Indomie Noodles",
    price: 9000,
    discountedPrice: 8400,
    quantity: "1 carton",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Wholesale Depot", location: "Lagos, Nigeria", rating: 4.3 },
    category: "Noodles"
  },
  {
    id: 12,
    name: "Groundnut Oil",
    price: 12000,
    discountedPrice: 11000,
    quantity: "10 litres",
    image: "/pepper.avif",
    available: false,
    seller: { name: "Mama's Grocery", location: "Enugu, Nigeria", rating: 4.5 },
    category: "Cooking Oil"
  },
];

const FoodCard = ({ item, addToCart, addToFavorites, favorites }) => {
  const discountPercentage = Math.round(((item.price - item.discountedPrice) / item.price) * 100);
  const isFavorite = favorites.includes(item.id);
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col relative">
      {/* Discount badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          -{discountPercentage}%
        </div>
      )}
      
      {/* Food Image with overlay buttons */}
      <div className="relative w-full h-48 overflow-hidden group">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => addToFavorites(item)}
              className={`p-2 rounded-full mx-2 ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
              aria-label="Add to favorites"
            >
              <Heart size={20} fill={isFavorite ? "white" : "none"} />
            </button>
            <button 
              onClick={() => addToCart(item)}
              className="p-2 bg-white rounded-full mx-2 text-green-500"
              disabled={!item.available}
              aria-label="Add to cart"
            >
              <BookmarkIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Food Details */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mb-2 inline-block">
            {item.category}
          </span>
          
          <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
          
          {/* Price, Discount & Quantity */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600">{item.quantity}</span>
            <div className="flex flex-col items-end">
              <span className="text-gray-500 line-through text-sm">₦{item.price.toLocaleString()}</span>
              <span className="text-lg font-bold text-green-600">₦{item.discountedPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Seller Information */}
        <div className="mt-3 border-t pt-3 border-gray-100">
          <div className="flex items-center text-sm text-gray-700 mb-1">
            <Star size={16} className="text-yellow-400 mr-1" />
            <span>{item.seller.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1" />
            <span className="truncate">{item.seller.location}</span>
          </div>
        </div>

        {/* Availability Tag */}
        <div className="mt-3">
          {!item.available && (
            <span className="inline-block w-full py-1 bg-red-100 text-red-700 text-xs text-center font-medium rounded-md">
              Out of Stock
            </span>
          )}
        </div>

        {/* Add to Cart Button 
        <button
          className={`w-full mt-4 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
            item.available 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!item.available}
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>*/}
      </div>
    </div>
  );
};

const FoodCollection = () => {
  const [sortBy, setSortBy] = useState("default");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  const categories = ["all", ...new Set(foodItems.map(item => item.category))];
  
  // Handle add to favorites
  const addToFavorites = (item) => {
    setFavorites(prev => 
      prev.includes(item.id) 
        ? prev.filter(id => id !== item.id)
        : [...prev, item.id]
    );
  };

  // Filter and sort food items
  const filteredAndSortedItems = [...foodItems]
    .filter(item => 
      (filterCategory === "all" || item.category === filterCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.seller.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "priceLowToHigh") return a.discountedPrice - b.discountedPrice;
      if (sortBy === "priceHighToLow") return b.discountedPrice - a.discountedPrice;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "rating") return b.seller.rating - a.seller.rating;
      if (sortBy === "discount") {
        const discountA = ((a.price - a.discountedPrice) / a.price) * 100;
        const discountB = ((b.price - b.discountedPrice) / b.price) * 100;
        return discountB - discountA;
      }
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl flex items-center">
            <span className="w-3 h-12 bg-gradient-to-b from-green-500 to-green-700 rounded-full mr-4 inline-block"></span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">Nigerian Pantry</span>
          </h2>
          <p className="text-gray-600 ml-7 mt-1">Your household staples at wholesale prices</p>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search products or sellers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Filter and Sort Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-3 md:space-y-0">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                filterCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort and Filter Mobile Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <Filter size={16} className="mr-1" />
            <span>Filter</span>
          </button>

          {/* Sort By Dropdown (always visible) */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="default">Sort by: Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="name">Name</option>
            <option value="rating">Best Rating</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden flex justify-end">
          <div className="bg-white w-4/5 h-full p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Category</h4>
              <div className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filterCategory === category}
                      onChange={() => setFilterCategory(category)}
                      className="mr-2"
                    />
                    <span>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Sort By</h4>
              <div className="flex flex-col space-y-2">
                {[
                  { value: "default", label: "Default" },
                  { value: "priceLowToHigh", label: "Price: Low to High" },
                  { value: "priceHighToLow", label: "Price: High to Low" },
                  { value: "name", label: "Name" },
                  { value: "rating", label: "Best Rating" },
                  { value: "discount", label: "Biggest Discount" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="sortBy"
                      checked={sortBy === option.value}
                      onChange={() => setSortBy(option.value)}
                      className="mr-2"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button
              className="w-full bg-green-600 text-white py-2 rounded-md mt-4"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-gray-600 mb-4">{filteredAndSortedItems.length} items found</p>

      {/* Empty state */}
      {filteredAndSortedItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
          <img src="/api/placeholder/100/100" alt="No results" className="mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">No items found</h3>
          <p className="text-gray-600 text-center max-w-md">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={() => {
              setSearchTerm("");
              setFilterCategory("all");
              setSortBy("default");
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedItems.map((item) => (
          <FoodCard 
            key={item.id} 
            item={item} 
            addToCart={addToCart} 
            addToFavorites={addToFavorites}
            favorites={favorites}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodCollection;