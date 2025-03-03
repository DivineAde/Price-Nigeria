"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      alert(isLogin ? "Login successful!" : "Sign-up successful!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Image Section */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="/new-signup-img.webp"
          alt="Login Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
          priority
        />
      </div>

      {/* Login/Sign-Up Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                  required
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                required
              />
            </div>

            <Link href="/"> 
            <button
              type="submit"
              className="w-full mt-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <span>{isLogin ? "Login" : "Sign Up"}</span>
              )}
            </button>
            </Link>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <div className="mt-6">
            <button
              onClick={() => alert("Google login coming soon!")}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-6 h-6"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.8 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11.1 0 20-8.9 20-20 0-1.3-.1-2.6-.4-3.9z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.7 12.4 19.1 8 24 8c3.1 0 5.8 1.2 7.8 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 16.3 2 9.7 6.6 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 42c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-1.7 1.2-3.8 1.9-6.2 1.9-5.2 0-9.6-3.3-11.3-8l-6.6 4.8C9.7 41.4 16.3 46 24 46z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.2 5.2C39.9 36.2 44 30.2 44 22c0-1.3-.1-2.6-.4-3.9z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Toggle between Login and Sign-Up */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 hover:text-purple-500 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
