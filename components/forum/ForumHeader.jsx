// components/forum/ForumHeader.jsx
"use client"

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function ForumHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", e.target.email.value);
    setIsLoginModalOpen(false);
  };
  
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-800 shadow-md">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              <Link href="/forum" className="flex items-center">
                <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
                Food Price Community
              </Link>
            </h1>
            <p className="text-green-100 text-sm mt-1">Track and discuss Nigerian food prices</p>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center mr-4">
              <Link href="/forum" className="text-white hover:text-green-200 px-3 py-2">Home</Link>
              <Link href="/prices" className="text-white hover:text-green-200 px-3 py-2">Price Tracker</Link>
              <Link href="/trends" className="text-white hover:text-green-200 px-3 py-2">Trends</Link>
            </nav>
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-white text-green-700 px-4 py-2 rounded font-medium text-sm hover:bg-green-50 transition-colors"
            >
              Log In
            </button>
            <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded font-medium text-sm hover:bg-green-400 transition-colors">
              Sign Up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-2" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <nav className="flex flex-col space-y-2">
              <Link href="/forum" className="text-white hover:bg-green-700 px-3 py-2 rounded">Home</Link>
              <Link href="/prices" className="text-white hover:bg-green-700 px-3 py-2 rounded">Price Tracker</Link>
              <Link href="/trends" className="text-white hover:bg-green-700 px-3 py-2 rounded">Trends</Link>
            </nav>
            <div className="mt-4 flex space-x-3">
              <button 
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 bg-white text-green-700 px-4 py-2 rounded font-medium text-sm"
              >
                Log In
              </button>
              <Link href="/signup" className="flex-1 bg-green-500 text-white px-4 py-2 rounded font-medium text-sm text-center">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Log In</h3>
              <button onClick={() => setIsLoginModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input 
                    id="password"
                    name="password"
                    type="password" 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      id="remember-me" 
                      name="remember-me" 
                      type="checkbox" 
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-500">
                    Forgot password?
                  </Link>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account? <Link href="/signup" className="text-green-600 hover:text-green-500 font-medium">Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}