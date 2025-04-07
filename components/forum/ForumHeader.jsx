// components/forum/ForumHeader.jsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

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
                <svg
                  className="w-8 h-8 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 7V12L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Food Price Community
              </Link>
            </h1>
            <p className="text-green-100 text-sm mt-1">
              Track and discuss Nigerian food prices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
