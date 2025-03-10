"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const images = ["/pexels-heftiba-940302.jpg", "/pexels-ifreestock-566888.jpg", "/pexels-picjumbo-com-55570-196643.jpg"];

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
    <section className="relative py-20 h-screen flex items-center overflow-hidden">
      {/* Background Images with Effect */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
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
          <p className="text-lg md:text-xl text-slate-50 mb-8 font-bold animate-fade-in-up delay-200">
            Whether you're looking to check prices, join a vibrant community, or
            list your own offerings, we've got you covered.
          </p>

          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row justify-center w-full">
            <button className="font-semibold px-8 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600  text-white overflow-hidden transition-all duration-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-green-300 shadow-lg shadow-green-500/50 rounded-lg text-sm me-2 mb-2">
              Getting Started
            </button>

            <button className="font-semibold px-8 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600  text-white overflow-hidden transition-all duration-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-green-300 shadow-lg shadow-green-500/50 rounded-lg text-sm me-2 mb-2">
              Join the Community
            </button>

            {/*

            <button className="relative px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg overflow-hidden transition-all duration-500 hover:text-white hover:bg-transparent hover:ring-2 hover:ring-white hover:ring-offset-2">
              <span className="relative z-10">Explore</span>
              <span className="absolute inset-0 bg-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            </button>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
