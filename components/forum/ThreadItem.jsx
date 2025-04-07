"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ThreadItem({ thread }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(thread.replies > 10 ? thread.replies - 10 : 0);
  
  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };
  
  const handleUpvote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasUpvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    setHasUpvoted(!hasUpvoted);
  };
  
  // Calculate how fresh the thread is
  const isFresh = thread.lastUpdated.includes('h') || thread.lastUpdated === 'Yesterday';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative p-4 hover:bg-gray-50 transition-colors group ${
        thread.isFeatured ? 'border-l-4 border-green-500 pl-3' : ''
      }`}
    >
      {/* Absolute positioned bookmark button */}
      <button 
        onClick={toggleBookmark}
        className="absolute top-3 right-3 text-gray-400 hover:text-yellow-500 transition-colors"
        title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        {isBookmarked ? (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
          </svg>
        )}
      </button>

      <div className="flex items-start gap-3">
        {/* Vote column - Functional */}
        <div className="hidden sm:flex flex-col items-center space-y-1">
          <button 
            onClick={handleUpvote}
            className={`p-1 rounded-full transition-colors ${
              hasUpvoted ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-green-600'
            }`}
            title="Upvote"
          >
            <svg className="w-5 h-5" fill={hasUpvoted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"></path>
            </svg>
          </button>
          <span className={`text-sm font-medium ${hasUpvoted ? 'text-green-600' : 'text-gray-500'}`}>
            {upvotes}
          </span>
        </div>
        
        {/* Thread content with enhanced UI */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              {thread.category}
            </span>
            {thread.isHot && (
              <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                Hot
              </span>
            )}
            {isFresh && (
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                New
              </span>
            )}
          </div>
          
          <Link 
            href={`/forum/thread/${thread.id}`} 
            className="text-lg font-bold text-gray-900 hover:text-green-600 transition-colors group-hover:underline"
          >
            {thread.title}
          </Link>
          
          <div className="mt-2 flex flex-wrap gap-1.5">
            {thread.tags.map((tag, idx) => (
              <Link 
                key={idx} 
                href={`/forum/tag/${tag.toLowerCase()}`}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
          
          <div className="mt-3 flex items-center text-xs text-gray-500">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold mr-1.5">
              {thread.author.charAt(0).toUpperCase()}
            </div>
            <span>
              <Link href={`/forum/user/${thread.author}`} className="font-medium text-gray-700 hover:text-green-600 transition-colors">
                {thread.author}
              </Link>
            </span>
            <span className="mx-1.5">•</span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {thread.lastUpdated}
            </span>
            <span className="mx-1.5">•</span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
              {thread.replies} replies
            </span>
            <span className="mx-1.5">•</span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {thread.views} views
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}