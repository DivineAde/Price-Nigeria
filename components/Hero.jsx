"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const images = [
  '/pexels-heftiba-940302.jpg', 
  '/pexels-ifreestock-566888.jpg',
  '/pexels-reneasmussen-2544829.jpg',
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  //  Auto-switch background images on the hero page
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Changes or switches image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 mt-16 h-screen flex items-center overflow-hidden">
      {/* Background Images with Effect */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Background ${index + 1}`}
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
              className="transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-in-out"
            />
          </div>
        ))}
      </div>

      {/* Dynamic Gradient Overlay 
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/70 to-purple-600/70 animate-gradient-shift"></div> */}

      {/* Hero Section Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Discover the Best Deals and Connect with a Thriving Community
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 font-bold animate-fade-in-up delay-200">
            Whether you're looking to check prices, join a vibrant community, or list your own offerings, we've got you covered.
          </p>

          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="#"
              className="bg-white flex items-center justify-center text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 animate-fade-in-up delay-400"
            >
              Check Prices
            </Link>
            <Link
              href="#"
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 animate-fade-in-up delay-600"
            >
              Join the Community
            </Link>
            <Link
              href="#"
              className="bg-white flex items-center justify-center text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 animate-fade-in-up delay-800"
            >
              List Your Offerings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;