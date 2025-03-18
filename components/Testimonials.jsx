"use client"

// pages/testimonials.js
import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      image: "/Frame 1000003208 (1).png",
      text: "Working with this team has completely transformed our digital presence. Their attention to detail and creative approach helped us increase engagement by 200% in just three months.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Startup Founder",
      company: "InnovateLabs",
      image: "/Frame 1000003208 (1).png",
      text: "I couldn't be happier with the results. Their strategic insights and technical expertise were exactly what we needed to launch our product successfully.",
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: "E-commerce Manager",
      company: "StyleHouse",
      image: "/Frame 1000003208 (1).png",
      text: "The level of professionalism and creativity exceeded all our expectations. Our conversion rates have improved by 45% since implementing their recommendations.",
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: "CFO",
      company: "FinancePartners",
      image: "/Frame 1000003208 (1).png",
      text: "Their team delivered exceptional value. The ROI on our project was evident within weeks, and their ongoing support has been invaluable to our success.",
    },
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Head>
        <title>Client Testimonials | Your Company Name</title>
        <meta name="description" content="See what our clients are saying about our services" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">What Our Clients</span>
            <span className="block text-indigo-600">Are Saying</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
            Don't just take our word for it. See what our clients have to say about their experience working with us.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <div className="relative mb-24">
          <motion.div 
            className="absolute inset-0 bg-indigo-600 rounded-3xl opacity-10"
            animate={{ rotate: -6 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 bg-indigo-700 text-white p-8 md:p-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={testimonials[activeTestimonial].id}
                    className="h-32 w-32 rounded-full object-cover border-4 border-white"
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.blockquote 
                    key={testimonials[activeTestimonial].id}
                    className="text-xl font-medium text-gray-900 mb-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                  >
                    "{testimonials[activeTestimonial].text}"
                  </motion.blockquote>
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={testimonials[activeTestimonial].id}
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{testimonials[activeTestimonial].name}</div>
                      <div className="text-indigo-600">
                        {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 transform translate-y-1/2 flex space-x-3">
            <motion.button
              onClick={prevTestimonial}
              className="h-12 w-12 rounded-full flex items-center justify-center bg-white shadow-lg hover:bg-indigo-50 transition duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="h-12 w-12 rounded-full flex items-center justify-center bg-indigo-600 shadow-lg hover:bg-indigo-700 transition duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}