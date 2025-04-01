"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Heart, Star, MapPin, BookmarkIcon } from "lucide-react";
import Link from "next/link";

// Importing the food items data
// In a real application, you might want to move this to a central data file
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
      </div>
    </div>
  );
};

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { addToCart } = useCart();

  // Handle add to favorites
  const addToFavorites = (item) => {
    setFavorites(prev => 
      prev.includes(item.id) 
        ? prev.filter(id => id !== item.id)
        : [...prev, item.id]
    );
  };

  useEffect(() => {
    // Search logic
    if (query) {
      const results = foodItems.filter(item => {
        const matchName = item.name.toLowerCase().includes(query.toLowerCase());
        const matchSeller = item.seller.name.toLowerCase().includes(query.toLowerCase());
        const matchCategory = item.category.toLowerCase().includes(query.toLowerCase());
        const matchLocation = item.seller.location.toLowerCase().includes(query.toLowerCase());
        
        return matchName || matchSeller || matchCategory || matchLocation;
      });
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Search Results Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center mb-2">
          <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-700 rounded-full mr-3 inline-block"></span>
          Search Results
        </h1>
        {query && (
          <p className="text-gray-600 ml-5">
            {searchResults.length} results for "{query}"
          </p>
        )}
      </div>

      {/* Search Form
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form action="/search" method="get" className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search products, sellers, or categories..."
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Search Again
          </button>
        </form>
      </div>
      */}

      {/* Empty state or not found */}
      {searchResults.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
          
             <img src="/notfound.webp" alt="No results" className="w-full h-48 object-contain" />
        
              <h3 className="text-xl font-medium text-gray-800 mb-3">No items found</h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                {query ? 
                  `We couldn't find any items matching "${query}". Try using different keywords or browse our categories.` : 
                  "Please enter a search term to find products."
                }
              </p>
              <Link 
                href="/"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Browse All Products
              </Link>
        
        </div>
      )}

      {/* Results Grid */}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((item) => (
            <FoodCard 
              key={item.id} 
              item={item} 
              addToCart={addToCart} 
              addToFavorites={addToFavorites}
              favorites={favorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;