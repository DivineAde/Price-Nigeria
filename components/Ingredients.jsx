"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCube,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar"
import "swiper/css/navigation"

const ingredients = [
  {
    name: "Fresh Tomatoes",
    size: "1kg",
    price: "₦5.00",
    discountedPrice: "₦3.50",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "30% OFF",
    description: "Juicy and ripe, perfect for salads and sauces.",
  },
  {
    name: "Organic Onions",
    size: "500g",
    price: "₦2.00",
    discountedPrice: "₦1.50",
    image: "/pepper.avif",
    hotDeal: false,
    discountPercent: "",
    description: "Great for cooking and adding flavor to dishes.",
  },
  {
    name: "Premium Garlic",
    size: "200g",
    price: "₦1.00",
    discountedPrice: "₦0.75",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "25% OFF",
    description: "Aromatic and essential for savory recipes.",
  },
  {
    name: "Bell Peppers",
    size: "1kg",
    price: "₦4.00",
    discountedPrice: "₦3.00",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "25% OFF",
    description: "Colorful and crunchy, perfect for stir-fries.",
  },
  {
    name: "Fresh Carrots",
    size: "1kg",
    price: "₦3.00",
    discountedPrice: "₦2.00",
    image: "/pepper.avif",
    hotDeal: false,
    discountPercent: "",
    description: "Sweet and nutritious, great for snacking.",
  },
  {
    name: "Crisp Cucumbers",
    size: "1kg",
    price: "₦2.50",
    discountedPrice: "₦1.75",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "30% OFF",
    description: "Refreshing and hydrating, ideal for salads.",
  },
  {
    name: "Green Beans",
    size: "500g",
    price: "₦3.50",
    discountedPrice: "₦2.50",
    image: "/pepper.avif",
    hotDeal: false,
    discountPercent: "",
    description: "Tender and flavorful, perfect for side dishes.",
  },
  {
    name: "Zucchini",
    size: "1kg",
    price: "₦4.50",
    discountedPrice: "₦3.25",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "28% OFF",
    description: "Versatile and delicious for grilling or baking.",
  },
  {
    name: "Fresh Spinach",
    size: "500g",
    price: "₦3.00",
    discountedPrice: "₦2.00",
    image: "/pepper.avif",
    hotDeal: false,
    discountPercent: "",
    description: "Nutrient-packed and great for salads or smoothies.",
  },
  {
    name: "Broccoli",
    size: "1kg",
    price: "₦5.00",
    discountedPrice: "₦3.50",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "30% OFF",
    description: "Rich in vitamins and perfect for steaming.",
  },
];

const KitchenSwiper = () => {
  return (
    <div className="container mx-auto px-4 py-8 my-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Fresh Kitchen Ingredients
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation
        scrollbar={{
          draggable: true,
          
        }}
        pagination={{
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Navigation, Scrollbar, ]}
        className="mySwiper"
      >
        {ingredients.map((ingredient, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative my-8 transition-transform transform hover:scale-105 hover:shadow-xl">
              {ingredient.hotDeal && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-3 py-1 rounded-full z-10">
                  Hot Deal: {ingredient.discountPercent}
                </div>
              )}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {ingredient.name} - <span>{ingredient.size}</span>
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {ingredient.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 line-through">
                    {ingredient.price}
                  </span>
                  <span className="text-green-600 font-bold text-xl">
                    {ingredient.discountedPrice}
                  </span>
                </div>
                {/*
                <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Add to Cart
                </button>*/}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default KitchenSwiper;
