"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const images = ["/pexels-heftiba-940302.jpg", "/pexels-ifreestock-566888.jpg", "/pexels-picjumbo-com-55570-196643.jpg"];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-switch background images on the hero page
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Changes or switches image every 5 seconds
    
    // Animation trigger after component mounts
    setIsVisible(true);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
              className="transform scale-105 transition-transform duration-3000 ease-out"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Gradient Overlay with improved aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "w-8 bg-green-400" 
                : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Section Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Accent Line */}
          <div className="flex justify-center mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
          </div>
          
          {/* Tagline */}
          <p className="text-green-400 font-medium mt-4 tracking-wider uppercase">Market Prices. Community. Connections.</p>
          
          {/* Heading with staggered animation */}
          <h1 className="text-4xl md:text-6xl  font-extrabold text-white mb-6 leading-tight">
            <span className="block">Discover the Best Deals</span>
            <span className="block mt-2 bg-gradient-to-r from-green-300 via-green-400 to-emerald-500 text-transparent bg-clip-text">
              Connect with Community
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking to check prices, join a vibrant community, or
            list your own offerings, our platform brings everyone together.
          </p>

          {/* Interactive Buttons with improved design */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
            <Link href={'/forum'} className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full overflow-hidden shadow-lg hover:shadow-green-500/30 transition-all duration-300">
              <span className="relative z-10 flex items-center">
                Join the community
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>

            <Link href={'/'} className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-green-500 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full overflow-hidden hover:bg-white/20 transition-all duration-300">
              <span className="relative z-10">See Listing</span>
            </Link>
          </div>
          
          {/* Scroll indicator 
          <button 
            onClick={scrollToContent}
            className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 animate-bounce"
            aria-label="Scroll down"
          >
            <span className="text-sm mb-2">Explore More</span>
            <ChevronDown className="h-6 w-6" />
          </button>/*/}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/40 to-transparent z-10" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;