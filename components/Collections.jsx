"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";

// Sample food data e long small lol
const foodItems = [
  {
    id: 1,
    name: "Rice",
    price: 12.99,
    discountedPrice: 9.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 2,
    name: "Beans",
    price: 10.99,
    discountedPrice: 8.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 3,
    name: "Yam",
    price: 15.99,
    discountedPrice: 12.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 4,
    name: "Maize",
    price: 8.99,
    discountedPrice: 6.99,
    image: "/pepper.avif",
    available: false,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 5,
    name: "Plantain",
    price: 9.99,
    discountedPrice: 7.99,
    image: "/pepper.avif",
    available: false,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 6,
    name: "Cassava",
    price: 7.99,
    discountedPrice: 5.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 7,
    name: "Tomatoes",
    price: 6.99,
    discountedPrice: 5.49,
    image: "/pepper.avif",
    available: false,
    seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 8,
    name: "Pepper",
    price: 5.99,
    discountedPrice: 4.49,
    image: "/pepper.avif",
    available: false,
    seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 9,
    name: "Onions",
    price: 4.99,
    discountedPrice: 3.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 10,
    name: "Okra",
    price: 5.99,
    discountedPrice: 4.99,
    image: "/pepper.avif",
    available: false,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 11,
    name: "Garri",
    price: 11.99,
    discountedPrice: 9.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 12,
    name: "Cucumber",
    price: 4.99,
    discountedPrice: 3.99,
    image: "/pepper.avif",
    available: true,seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 13,
    name: "Groundnuts",
    price: 7.49,
    discountedPrice: 5.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 14,
    name: "Palm Fruit",
    price: 9.49,
    discountedPrice: 7.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 15,
    name: "Bitter Leaf",
    price: 4.49,
    discountedPrice: 3.49,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 16,
    name: "Waterleaf",
    price: 3.99,
    discountedPrice: 2.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 17,
    name: "Spinach",
    price: 4.49,
    discountedPrice: 3.49,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 18,
    name: "Banana",
    price: 6.99,
    discountedPrice: 5.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 19,
    name: "Pineapple",
    price: 9.99,
    discountedPrice: 7.99,
    image: "/pepper.avif",
    available: false,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 20,
    name: "Mango",
    price: 8.49,
    discountedPrice: 6.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Mallam yusuf",
      location: "Kaduna, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 21,
    name: "Orange",
    price: 5.99,
    discountedPrice: 4.49,
    image: "/pepper.avif",
    available: false,
    seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 22,
    name: "Cocoa",
    price: 14.99,
    discountedPrice: 12.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 23,
    name: "Cashew Nuts",
    price: 18.99,
    discountedPrice: 15.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 24,
    name: "Sugarcane",
    price: 7.49,
    discountedPrice: 5.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 25,
    name: "Sorghum",
    price: 10.99,
    discountedPrice: 8.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 26,
    name: "Millet",
    price: 9.99,
    discountedPrice: 7.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Agro Seller",
      location: "Abuja, Nigeria",
      rating: 4.2,
    },
  },
  {
    id: 27,
    name: "Eggplant",
    price: 4.99,
    discountedPrice: 3.99,
    image: "/pepper.avif",
    available: false,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 28,
    name: "Avocado",
    price: 8.99,
    discountedPrice: 6.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 29,
    name: "Sweet Potatoes",
    price: 7.99,
    discountedPrice: 5.99,
    image: "/pepper.avif",
    available: false,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
  {
    id: 30,
    name: "Cabbage",
    price: 6.99,
    discountedPrice: 4.99,
    image: "/pepper.avif",
    available: true,
    seller: {
      name: "Farmers Market",
      location: "Lagos, Nigeria",
      rating: 4.5,
    },
  },
];

const FoodCollection = () => {
  const [sortBy, setSortBy] = useState("default");
  const { addToCart } = useCart(); // same as bookmarking on the page

  // Sort food items based on the selected option
  const sortedItems = [...foodItems].sort((a, b) => {
    if (sortBy === "priceLowToHigh") return a.price - b.price;
    if (sortBy === "priceHighToLow") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0; // Default order
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-pink-500 to-green-400 bg-clip-text text-transparent uppercase tracking-wider">
        Trending Products
      </h1>
      
      {/* Sort By Feature */}
      <div className="my-8 focus:ring-opacity-0">
        <label htmlFor="sort" className="mr-2 text-gray-700">
          Sort By:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="default">Default</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Food Image */}
            <div className="w-full h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Food Details */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>

              {/* Price and Discount */}
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-gray-600 line-through">
                  &#8358;{item.price.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-blue-600">
                  &#8358;{item.discountedPrice.toFixed(2)}
                </span>
              </div>

              {/* Seller Information */}
              <div className="mb-2">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Seller:</span> {item.seller.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Location:</span> {item.seller.location}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Rating:</span> {item.seller.rating} ⭐
                </p>
              </div>

              {/* Availability Tag */}
              <div className="mb-4">
                {item.available ? (
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    Available
                  </span>
                ) : (
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                className="w-full bg-black font-semibold text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!item.available}
                onClick={() => addToCart(item)} // Add item to bookmark 
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCollection;