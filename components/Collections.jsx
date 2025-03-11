"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";

// Sample food data with quantity
const foodItems = [
  {
    id: 1,
    name: "Rice",
    price: 12.99,
    discountedPrice: 9.99,
    quantity: "5kg",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Farmers Market", location: "Lagos, Nigeria", rating: 4.5 },
  },
  {
    id: 2,
    name: "Beans",
    price: 10.99,
    discountedPrice: 8.99,
    quantity: "2kg",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Agro Seller", location: "Abuja, Nigeria", rating: 4.2 },
  },
  {
    id: 3,
    name: "Yam",
    price: 15.99,
    discountedPrice: 12.99,
    quantity: "3kg",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Local Farms", location: "Port Harcourt, Nigeria", rating: 4.7 },
  },
  {
    id: 4,
    name: "Garri",
    price: 5.99,
    discountedPrice: 4.99,
    quantity: "10kg",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Agro Store", location: "Ibadan, Nigeria", rating: 4.0 },
  },
  {
    id: 5,
    name: "Plantain",
    price: 8.99,
    discountedPrice: 6.99,
    quantity: "1 bunch",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Farmers Hub", location: "Enugu, Nigeria", rating: 4.3 },
  },
  {
    id: 6,
    name: "Tomatoes",
    price: 3.99,
    discountedPrice: 2.99,
    quantity: "1kg",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Fresh Produce", location: "Kano, Nigeria", rating: 4.6 },
  },
  {
    id: 7,
    name: "Pepper",
    price: 4.99,
    discountedPrice: 3.99,
    quantity: "500g",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Spice World", location: "Kaduna, Nigeria", rating: 4.4 },
  },
  {
    id: 8,
    name: "Onions",
    price: 2.99,
    discountedPrice: 1.99,
    quantity: "1kg",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Vegetable King", location: "Owerri, Nigeria", rating: 4.1 },
  },
  {
    id: 9,
    name: "Potatoes",
    price: 7.99,
    discountedPrice: 5.99,
    quantity: "2kg",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Tubers Direct", location: "Jos, Nigeria", rating: 4.8 },
  },
  {
    id: 10,
    name: "Millet",
    price: 9.99,
    discountedPrice: 7.99,
    quantity: "3kg",
    image: "/pepper.avif",
    available: true,
    seller: { name: "Grains Galore", location: "Sokoto, Nigeria", rating: 4.9 },
  },
];

const FoodCollection = () => {
  const [sortBy, setSortBy] = useState("default");
  const { addToCart } = useCart();

  // Sort food items
  const sortedItems = [...foodItems].sort((a, b) => {
    if (sortBy === "priceLowToHigh") return a.price - b.price;
    if (sortBy === "priceHighToLow") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-green-600 uppercase tracking-wider">
        Trending Products
      </h1>

      {/* Sort By Dropdown */}
      <div className="my-6 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="default">Default</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
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
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>

              {/* Price, Discount & Quantity */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">{item.quantity}</span>
                <div className="flex flex-col items-end">
                  <span className="text-gray-500 line-through text-sm">&#8358;{item.price.toFixed(2)}</span>
                  <span className="text-lg font-bold text-green-600">&#8358;{item.discountedPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Seller Information */}
              <div className="mt-3 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Seller:</span> {item.seller.name}
                </p>
                <p>
                  <span className="font-semibold">Location:</span> {item.seller.location}
                </p>
                <p>
                  <span className="font-semibold">Rating:</span> {item.seller.rating} ⭐
                </p>
              </div>

              {/* Availability Tag */}
              <div className="mt-3">
                {item.available ? (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Available
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400"
                disabled={!item.available}
                onClick={() => addToCart(item)}
              >
                Add to Favorite
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCollection;
