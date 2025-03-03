"use client"

import React from "react";

const ItemDetailsPage = () => {
  
  const item = {
    name: "Organic Black Beans",
    image: "/images/black-beans.jpg", 
    description: "High-quality organic black beans, perfect for soups, salads, and more.",
    currentPrice: "$2.99",
    originalPrice: "$3.49",
    priceHistory: [
      { date: "2023-10-01", price: "$3.49" },
      { date: "2023-09-25", price: "$3.29" },
      { date: "2023-09-15", price: "$2.99" },
    ],
  };

  // Raw static data for reviews
  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 4.5,
      comment: "Great quality beans! They cook perfectly and taste amazing.",
      date: "2023-10-05",
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 5,
      comment: "Love these beans! They're organic and very affordable.",
      date: "2023-10-03",
    },
    {
      id: 3,
      user: "Alice Johnson",
      rating: 4,
      comment: "Good value for the price. Will buy again!",
      date: "2023-09-28",
    },
  ];

  // Function to handle review submission (static for now)
  const handleSubmitReview = (e) => {
    e.preventDefault();
    alert("Review submitted! (Static data mode)"); 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Item Details Section */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Item Image */}
            <div className="w-full md:w-1/2 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
            </div>

            {/* Item Information */}
            <div className="w-full md:w-1/2 p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{item.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{item.description}</p>
              <div className="flex items-center mb-6">
                <span className="text-3xl font-semibold text-green-600 mr-4">
                  {item.currentPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
              </div>

              {/* Price History */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Price History</h2>
                <div className="space-y-2">
                  {item.priceHistory.map((entry, index) => (
                    <div key={index} className="flex justify-between text-gray-600">
                      <span>{entry.date}</span>
                      <span className="font-medium">{entry.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          {/* Review List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{review.user}</h3>
                  <span className="text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
                <p className="mt-1 text-sm text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>

          {/* Comment Submission Form */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Leave a Review</h3>
            <form className="space-y-4" onSubmit={handleSubmitReview}>
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <select
                  id="rating"
                  name="rating"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="4"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your thoughts..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;