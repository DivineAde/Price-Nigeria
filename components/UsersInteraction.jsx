"use client";

import { useState } from "react";

export default function UsersInteraction() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Tomatoes",
      price: "$2.50",
      likes: 0,
      comments: [],
      shares: 0,
    },
    {
      id: 2,
      name: "Potatoes",
      price: "$1.20",
      likes: 0,
      comments: [],
      shares: 0,
    },
    {
      id: 3,
      name: "Carrots",
      price: "$0.80",
      likes: 0,
      comments: [],
      shares: 0,
    },
  ]);

  const handleLike = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleComment = (id, comment) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, comments: [...item.comments, comment] }
          : item
      )
    );
  };

  const handleShare = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, shares: item.shares + 1 } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Market Price Updates
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600 mt-2">Price: {item.price}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleLike(item.id)}
                className="flex items-center text-gray-500 hover:text-red-500"
              >
                <span>👍</span>
                <span className="ml-2">{item.likes}</span>
              </button>
              <button
                onClick={() => {
                  const comment = prompt("Enter your comment:");
                  if (comment) handleComment(item.id, comment);
                }}
                className="flex items-center text-gray-500 hover:text-blue-500"
              >
                <span>💬</span>
                <span className="ml-2">{item.comments.length}</span>
              </button>
              <button
                onClick={() => handleShare(item.id)}
                className="flex items-center text-gray-500 hover:text-green-500"
              >
                <span>🔗</span>
                <span className="ml-2">{item.shares}</span>
              </button>
            </div>
            {item.comments.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Comments:</h3>
                <ul className="mt-2 space-y-2">
                  {item.comments.map((comment, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
