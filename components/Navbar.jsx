"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import {
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ChevronDownIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const searchInputRef = useRef(null);
  const timeoutRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (item) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 300);
  };

  const toggleSearchInput = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchModalOpen(false);
      }
    };

    if (isSearchModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchModalOpen]);

  const dropdownContent = {
    prices: ["Price Trends", "Price Alerts", "Price Comparisons"],
    forum: ["Latest Discussions", "Popular Topics", "Ask a Question"],
    listings: ["New Listings", "Top Deals", "Featured Products"],
    analytics: ["Market Trends", "Sales Analytics", "User Insights"],
  };

  const showChevronItems = ["prices", "forum", "listings"];

  const SearchModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg mx-4 transform transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Search</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close search modal"
            >
              <XMarkIcon className="size-6 text-gray-600" />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
              autoFocus
            />
            <MagnifyingGlassIcon className="absolute left-4 top-6 transform -translate-y-1/2 size-5 text-gray-400" />
            <button
              onClick={onClose}
              className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="fixed left-0 right-0 z-50">
        {/* Glassmorphism Background */}
        <div className="backdrop-blur-md bg-white/80 shadow-lg rounded-full my-2 mx-auto w-5/6">
          <nav className="container mx-auto px-6 py-2 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-green-800">
              Price.ng
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {Object.keys(dropdownContent).map((item) => (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center space-x-1 p-2 hover:bg-gray-100 transition-colors duration-200 rounded-md">
                    <a
                      href={`/dashboard/${item}`}
                      className="text-gray-600 hover:text-gray-800 text-md"
                    >
                      {item.charAt(0).toLowerCase() + item.slice(1)}
                    </a>
                    {showChevronItems.includes(item) && (
                      <ChevronDownIcon
                        className={`size-3 text-black transition-transform duration-200 ${
                          hoveredItem === item ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    )}
                  </div>
                  {hoveredItem === item && (
                    <div
                      className="absolute top-full left-0 mt-2 w-52 bg-white rounded-md shadow-lg transition-opacity duration-300 ease-in-out"
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {dropdownContent[item].map((subItem) => (
                        <a
                          key={subItem}
                          href={`/dashboard/${item}/${subItem
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <MagnifyingGlassIcon
                  className="size-6 text-black hover:text-gray-600 cursor-pointer"
                  onClick={toggleSearchInput}
                  aria-label="Search"
                />
              </div>
              <Link href="/login">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <Link href={"/bookmark"} className="relative">
                <HeartIcon className="size-6 text-black hover:text-gray-600 cursor-pointer" />
                <span className="text-white absolute top-[-10px] right-[-10px] bg-green-600 text-xs px-[8px] py-[2px] rounded-full font-bold">
                  {cart.length}
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-slate-50 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <XMarkIcon className="size-6 text-black" />
                ) : (
                  <Bars3Icon className="size-6 text-black" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-md z-50">
            <div className="flex justify-end p-4">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <XMarkIcon className="size-6 text-black" />
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              {Object.keys(dropdownContent).map((item) => (
                <div key={item} className="relative">
                  <a
                    href={`/dashboard/${item}`}
                    className="text-gray-800 hover:text-gray-600 block text-lg"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <MagnifyingGlassIcon
                    className="size-6 text-black hover:text-gray-600 cursor-pointer"
                    onClick={toggleSearchInput}
                    aria-label="Search"
                  />
                </div>
                <Link href="/login">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <Link href={"/bookmark"}>
                  <BookmarkIcon className="size-6 text-black hover:text-gray-600 cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </>
  );
};

export default Navbar;