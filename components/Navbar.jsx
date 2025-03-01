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

const Navbar = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const searchInputRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
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

  // diplaying which items should show the ChevronDownIcon
  const showChevronItems = ["prices", "forum", "listings"]; // items that should show the chevron

  const SearchModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Search</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
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
            <div className="mt-6 absolute top-[-38%] right-1">
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Search
              </button>
            </div>
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 h-16">
        {/* Glassmorphism Background */}
        <div className="backdrop-blur-md bg-white/80 shadow-md">
          <nav className="container mx-auto px-4 py-[16px] flex items-center justify-between">
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
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                    {/* Conditionally render ChevronDownIcon */}
                    {showChevronItems.includes(item) && (
                      <ChevronDownIcon
                        className={`size-3 text-black transition-transform duration-200 ${
                          hoveredItem === item ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    )}
                  </div>
                  {hoveredItem === item && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-md shadow-lg transition-opacity duration-300 ease-in-out">
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
                />
              </div>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
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
          <div className="md:hidden bg-transparent h-screen backdrop-blur-md shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {Object.keys(dropdownContent).map((item) => (
                <a
                  key={item}
                  href={`/dashboard/${item}`}
                  className="text-slate-50 hover:text-gray-600 block"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </div>
            <div className="px-4 pt-2 pb-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <MagnifyingGlassIcon
                    className="size-6 text-slate-800 hover:text-gray-600 cursor-pointer"
                    onClick={toggleSearchInput}
                  />
                </div>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
