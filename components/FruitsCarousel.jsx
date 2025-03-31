"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

const fruits = [
  {
    name: "Fresh Apples",
    size: "1kg",
    price: "₦4.00",
    discountedPrice: "₦2.50",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "38% OFF",
    description: "Crisp and juicy, perfect for snacking or baking.",
  },
  {
    name: "Organic Bananas",
    size: "1kg",
    price: "₦3.00",
    discountedPrice: "₦2.00",
    image: "/pepper.avif",
    hotDeal: false,
    discountPercent: "",
    description: "Naturally sweet and packed with potassium.",
  },
  {
    name: "Sweet Oranges",
    size: "1kg",
    price: "₦5.00",
    discountedPrice: "₦3.50",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "30% OFF",
    description: "Vitamin C-rich and refreshingly tangy.",
  },
  {
    name: "Ripe Mangoes",
    size: "1kg",
    price: "₦6.00",
    discountedPrice: "₦4.00",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "33% OFF",
    description: "The king of fruits, sweet and succulent.",
  },
  {
    name: "Golden Pineapple",
    size: "1pc",
    price: "₦3.50",
    discountedPrice: "₦2.50",
    image: "/pepper.avif",
    hotDeal: false,
    discountPercent: "",
    description: "Tropical and tangy, great for desserts.",
  },
  {
    name: "Fresh Strawberries",
    size: "500g",
    price: "₦7.00",
    discountedPrice: "₦5.00",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "29% OFF",
    description: "Sweet and aromatic, perfect for smoothies.",
  },
  {
    name: "Juicy Grapes",
    size: "1kg",
    price: "₦8.00",
    discountedPrice: "₦6.00",
    image: "/pepper.avif",
    hotDeal: false,
    discountPercent: "",
    description: "Bursting with flavor, great for snacking.",
  },
  {
    name: "Sweet Watermelon",
    size: "1pc",
    price: "₦10.00",
    discountedPrice: "₦7.00",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "30% OFF",
    description: "Hydrating and refreshing, perfect for summer.",
  },
  {
    name: "Fresh Kiwi",
    size: "500g",
    price: "₦6.00",
    discountedPrice: "₦4.50",
    image: "/pepper.avif",
    hotDeal: false,
    discountPercent: "",
    description: "Tart and tangy, packed with nutrients.",
  },
  {
    name: "Sweet Peaches",
    size: "1kg",
    price: "₦5.50",
    discountedPrice: "₦4.00",
    image: "/pepper.avif",
    hotDeal: true,
    discountPercent: "27% OFF",
    description: "Soft, juicy, and perfect for desserts.",
  },
];

const FruitSwiper = () => {
  return (
    <div className="container mx-auto px-4 py-8 my-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Fresh Fruits for You
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
        modules={[Navigation, Scrollbar]}
        className="mySwiper"
      >
        {fruits.map((fruit, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative my-8 transition-transform transform hover:scale-105 hover:shadow-xl">
              {fruit.hotDeal && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-3 py-1 rounded-full z-10">
                  Hot Deal: {fruit.discountPercent}
                </div>
              )}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={fruit.image}
                  alt={fruit.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {fruit.name} - <span>{fruit.size}</span>
                </h3>
                <p className="text-gray-600 text-sm">{fruit.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 line-through">
                    {fruit.price}
                  </span>
                  <span className="text-green-600 font-bold text-xl">
                    {fruit.discountedPrice}
                  </span>
                </div>
                {/* <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
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

export default FruitSwiper;