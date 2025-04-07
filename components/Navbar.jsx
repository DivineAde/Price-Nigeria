"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import {
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  BookmarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Added for navigation

const Navbar = () => {
  const router = useRouter(); // For programmatic navigation
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
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

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        hoveredItem
      ) {
        setHoveredItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchModalOpen, hoveredItem]);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const navigationItems = [
    {
      id: "prices",
      label: "Prices",
      dropdown: ["Price Trends", "Price Alerts", "Price Comparisons"],
      icon: <ShoppingBagIcon className="size-4" />,
    },
    {
      id: "category",
      label: "Categories",
      dropdown: [
        "Food Cupboard",
        "Fresh Fruits",
        "Drinks",
        "Household",
        "Toiletries and cleaning",
      ],
      icon: <BookmarkIcon className="size-4" />,
    },
    {
      id: "listings",
      label: "Listings",
      dropdown: ["New Listings", "Top Deals", "Featured Products"],
      icon: <ShoppingBagIcon className="size-4" />,
    },
    {
      id: "forum",
      label: "Forum",
      dropdown: [""],
      icon: <UserIcon className="size-4" />,
    },
  ];

  const SearchModal = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
      e.preventDefault();
      // Redirect to search page with query parameter
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          ref={searchInputRef}
          className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg mx-4 transform transition-all duration-300 ease-in-out"
        >
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
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
                autoFocus
              />
              <MagnifyingGlassIcon className="absolute left-4 top-6 transform -translate-y-1/2 size-5 text-gray-400" />
              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <MagnifyingGlassIcon className="size-5" />
                Search
              </button>
            </div>
          </form>

          {/* Quick search suggestions */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Popular searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Rice", "Indomie", "Milk", "Sugar", "Bread"].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    router.push(`/search?q=${encodeURIComponent(term)}`);
                    onClose();
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="fixed left-0 right-0 z-50 ">
        {/* Glassmorphism Background */}
        <div className="backdrop-blur-md bg-white/90 shadow-md border-b border-gray-100 my-2 mx-auto w-11/12 lg:w-5/6 rounded-2xl">
          <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-blue-900">
                priceWatch
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  ref={hoveredItem === item.id ? dropdownRef : null}
                >
                  <div className="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 transition-colors duration-200 rounded-md">
                    <Link
                      href={`/category`}
                      className="text-gray-700 hover:text-gray-900 text-md font-medium flex items-center gap-1"
                    >
                      {item.label}
                      {item.dropdown && (
                        <ChevronDownIcon
                          className={`size-4 text-gray-500 transition-transform duration-200 ${
                            hoveredItem === item.id ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      )}
                    </Link>
                  </div>
                  {hoveredItem === item.id && item.dropdown && (
                    <div
                      className="absolute top-full left-0 mt-1 w-60 bg-white rounded-lg shadow-lg border border-gray-100 transition-opacity duration-300 ease-in-out z-10 overflow-hidden"
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="py-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem}
                            href={`/${item.id}/${subItem
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700"
                          >
                            <span className="text-green-600">{item.icon}</span>
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearchInput}
                aria-label="Search"
                className="rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <MagnifyingGlassIcon className="size-5" />
              </Button>
              <Link href="/login">
                <Avatar className="border-2 border-gray-200 hover:border-green-200 transition-all cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback className="bg-green-100 text-green-800">
                    CN
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Link href="/bookmark" className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  <BookmarkIcon className="size-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearchInput}
                aria-label="Search"
                className="rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <MagnifyingGlassIcon className="size-5" />
              </Button>
              <Link href="/bookmark" className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  <BookmarkIcon className="size-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="rounded-lg hover:bg-gray-100 text-gray-700"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <XMarkIcon className="size-5" />
                ) : (
                  <Bars3Icon className="size-5" />
                )}
              </Button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu - Slide in from right */}
        <div
          className={`md:hidden fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-green-600 text-white rounded-lg p-1">
                <ShoppingBagIcon className="size-5" />
              </div>
              <span className="text-lg font-bold text-green-800">Price.ng</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="rounded-lg hover:bg-gray-100 text-gray-700"
              aria-label="Close menu"
            >
              <XMarkIcon className="size-5" />
            </Button>
          </div>

          <div className="py-4">
            {navigationItems.map((item) => (
              <div key={item.id} className="px-4 py-2">
                <Link
                  href={`/dashboard/${item.id}`}
                  className="flex items-center justify-between text-gray-800 hover:text-green-700 font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-green-600">{item.icon}</span>
                    {item.label}
                  </div>
                  {item.dropdown && (
                    <ChevronDownIcon className="size-4 text-gray-500" />
                  )}
                </Link>

                {item.dropdown && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem}
                        href={`/${item.id}/${subItem
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block py-2 text-gray-600 hover:text-green-700"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Avatar className="border-2 border-gray-200">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback className="bg-green-100 text-green-800">
                    CN
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={toggleMenu}
          ></div>
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