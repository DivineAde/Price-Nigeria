"use client";

import React, { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
import { useCart } from "@/context/CartContext";
import {
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Navbar = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false); // State to control search input visibility
  const searchInputRef = useRef(null); // Ref for the search input

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
    setShowSearchInput(!showSearchInput); // Toggle search input visibility
  };

  // Handle clicks outside the search input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSearchInput(false); // Hide the input if clicked outside
      }
    };

    // event listener when the input is visible
    if (showSearchInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchInput]);

  // dropdown content for now
  const dropdownContent = {
    prices: ["Price Trends", "Price Alerts", "Price Comparisons"],
    forum: ["Latest Discussions", "Popular Topics", "Ask a Question"],
    listings: ["New Listings", "Top Deals", "Featured Products"],
    analytics: ["Market Trends", "Sales Analytics", "User Insights"],
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
                  <a
                    href={`/dashboard/${item}`}
                    className="text-black hover:text-gray-600"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                  {hoveredItem === item && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg transition-opacity duration-300 ease-in-out">
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
              <div className="flex items-center" ref={searchInputRef}>
                {showSearchInput ? (
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    autoFocus // Automatically focus the input when it appears
                  />
                ) : (
                  <MagnifyingGlassIcon
                    className="size-6 text-black hover:text-gray-600 cursor-pointer"
                    onClick={toggleSearchInput}
                  />
                )}
              </div>
              <Avatar>
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <Link href={"/bookmark"} className="relative">
                <BookmarkIcon className="size-6 text-black hover:text-gray-600 cursor-pointer" />
                <span className="text-white absolute top-[-10px] right-[-10px] bg-red-600 text-xs px-[8px] py-[2px] rounded-full font-bold">
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
                  {showSearchInput ? (
                    <input
                      type="text"
                      placeholder="Search..."
                      className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      autoFocus
                    />
                  ) : (
                    <MagnifyingGlassIcon
                      className="size-6 text-slate-800 hover:text-gray-600 cursor-pointer"
                      onClick={toggleSearchInput}
                    />
                  )}
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
    </>
  );
};

export default Navbar;