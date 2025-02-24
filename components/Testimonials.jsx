"use client";

import React, { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Deji Olamide",
    role: "User",
    content:
      "This website has completely transformed the way i and my family shop without getting cheated by retailers. Highly recommended!",
    image: "/Frame 1000003208 (1).png",
  },
  {
    id: 2,
    name: "Adamu Sani",
    role: "User",
    content:
      "Excellent service and support. The team is always ready to help with any issues.",
    image: "/Frame 1000003208 (2).png",
  },
  {
    id: 3,
    name: "Chioma Okon",
    role: "User",
    content:
      "The best innovation i have seem this year. It has significantly improved my budget.",
    image: "/Frame 1000003208 (3).png",
  },
  {
    id: 4,
    name: "Bob Brown",
    role: "User",
    content: "best platform to track price of goods in nigeria hands down!!!",
    image: "/Frame 1000003208 (4).png",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicator with Smooth Width Transition */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-slate-600 w-6" : "bg-slate-500 w-3"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
