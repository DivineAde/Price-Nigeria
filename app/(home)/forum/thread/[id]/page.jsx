// app/forum/thread/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock thread data
const mockThread = {
  id: 1,
  title: "Rice prices spiking in Lagos markets",
  author: "FoodTracker23",
  authorAvatar: "F",
  content: `I've been tracking rice prices in major Lagos markets for the past 3 months, and the situation is quite alarming. 

Foreign rice (50kg) has jumped from ₦55,000 to ₦62,000 in just the last two weeks. Local rice isn't far behind, now at ₦58,000 from ₦52,000.

My observations at Daleko, Mile 12, and Trade Fair markets all show the same trend. Retailers are blaming increased transport costs and supply issues at the borders.

Has anyone noticed similar trends in other states? Are there any markets still selling at the old rates? Please share your findings below.`,
  datePosted: "2023-10-15T10:30:00",
  replies: 24,
  views: 342,
  upvotes: 47,
  category: "Price Alerts",
  tags: ["Lagos", "Rice"],
  isPinned: true,
  isHot: true,
};

// Mock comments data
const mockComments = [
  {
    id: 1,
    author: "MarketWatcher",
    authorAvatar: "M",
    isModerator: true,
    content:
      "I can confirm this trend. In Ibadan markets, we're seeing similar price jumps. Foreign rice is now ₦60,000 for 50kg, up from ₦53,000 just three weeks ago. Local rice has hit ₦56,500. The traders are citing transportation costs and dollar exchange rates as the main factors.",
    datePosted: "2023-10-15T11:45:00",
    upvotes: 18,
    downvotes: 0,
    replies: [],
  },
  {
    id: 2,
    author: "EconomyExpert",
    authorAvatar: "E",
    isModerator: false,
    content:
      "This isn't just a Lagos phenomenon. It's nationwide. Looking at the data from the National Bureau of Statistics, there's been a 15% increase in rice prices across all major cities in the last month alone. This is connected to the fuel price hikes and naira devaluation.",
    datePosted: "2023-10-15T12:30:00",
    upvotes: 24,
    downvotes: 2,
    replies: [
      {
        id: 21,
        author: "PriceHunter",
        authorAvatar: "P",
        isModerator: false,
        content:
          "Do you have a link to that NBS data? I'd like to see the breakdown by state.",
        datePosted: "2023-10-15T13:15:00",
        upvotes: 5,
        downvotes: 0,
      },
      {
        id: 22,
        author: "EconomyExpert",
        authorAvatar: "E",
        isModerator: false,
        content:
          "Sure, here's the link to the latest Food Price Watch report: [https://nigerianstat.gov.ng/foodpricewatch](https://nigerianstat.gov.ng/foodpricewatch) - You'll find the cereals section has the rice data broken down by state.",
        datePosted: "2023-10-15T14:05:00",
        upvotes: 8,
        downvotes: 0,
      },
    ],
  },
  {
    id: 3,
    author: "GreenHarvest",
    authorAvatar: "G",
    isModerator: false,
    content:
      "I've found that smaller markets sometimes have better prices. There's a small market in Ikorodu where rice is still selling for ₦58,000 as of yesterday. It might be worth checking out markets that aren't as mainstream.",
    datePosted: "2023-10-15T15:20:00",
    upvotes: 12,
    downvotes: 1,
    replies: [],
  },
  {
    id: 4,
    author: "AgricPolicy",
    authorAvatar: "A",
    isModerator: true,
    content:
      "The government needs to step in here. These prices are unsustainable for the average Nigerian. We need better implementation of the agricultural policies and import regulations. The CBN's intervention funds don't seem to be making enough impact on local production.",
    datePosted: "2023-10-16T09:10:00",
    upvotes: 31,
    downvotes: 3,
    replies: [],
  },
];

export default function ThreadDetailPage({ params }) {
  const [thread, setThread] = useState(mockThread);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  const [replyToComment, setReplyToComment] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const router = useRouter();

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate time ago
  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  // Handle posting new comment
  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      author: "CurrentUser", // In a real app, this would be the logged-in user
      authorAvatar: "U",
      isModerator: false,
      content: newComment,
      datePosted: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      replies: [],
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  // Handle posting reply to a comment
  const handlePostReply = (commentId) => {
    if (!replyContent.trim()) return;

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now(),
              author: "CurrentUser", // In a real app, this would be the logged-in user
              authorAvatar: "U",
              isModerator: false,
              content: replyContent,
              datePosted: new Date().toISOString(),
              upvotes: 0,
              downvotes: 0,
            },
          ],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyToComment(null);
    setReplyContent("");
  };

  // Handle upvote for thread
  const handleThreadUpvote = () => {
    setIsUpvoted(!isUpvoted);
    setThread({
      ...thread,
      upvotes: isUpvoted ? thread.upvotes - 1 : thread.upvotes + 1,
    });
  };

  // Handle upvote for comment
  const handleCommentUpvote = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          upvotes: comment.upvotes + 1,
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Forum Header - Simplified version */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 border-b border-green-600 shadow-lg">
        <div className="container mx-auto px-4 py-28">
          <div className="flex items-center">
            <div className="mr-4">
              <svg
                className="w-8 h-8 text-green-300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6V4M12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10M12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10M6 18C7.10457 18 8 17.1046 8 16C8 14.8954 7.10457 14 6 14M6 18C4.89543 18 4 17.1046 4 16C4 14.8954 4.89543 14 6 14M6 18V20M6 14V4M12 10V20M18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14M18 18C16.8954 18 16 17.1046 16 16C16 14.8954 16.8954 14 18 14M18 18V20M18 14V4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Food Price Community
              </h1>
              <div className="flex mt-2 space-x-4">
                <Link
                  href="/forum"
                  className="text-green-200 hover:text-white text-sm"
                >
                  Forums
                </Link>
                <span className="text-green-500 text-sm">›</span>
                <Link
                  href={`/forum/category/${thread.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-green-200 hover:text-white text-sm"
                >
                  {thread.category}
                </Link>
                <span className="text-green-500 text-sm">›</span>
                <span className="text-white text-sm truncate max-w-xs">
                  {thread.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column (Main Content) */}
          <div className="md:w-3/4">
            {/* Thread Detail Card */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              {/* Thread Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                      {thread.isPinned && (
                        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-green-100 bg-green-600 rounded">
                          Pinned
                        </span>
                      )}
                      {thread.isHot && (
                        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-500 rounded">
                          Hot
                        </span>
                      )}
                      {thread.title}
                    </h1>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <span>
                        Posted by{" "}
                        <Link
                          href={`/forum`}
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          {thread.author}
                        </Link>
                      </span>
                      <span>•</span>
                      <span title={formatDate(thread.datePosted)}>
                        {timeAgo(thread.datePosted)}
                      </span>
                      <span>•</span>
                      <span>
                        <svg
                          className="w-4 h-4 text-gray-500 inline mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {thread.views} views
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                      onClick={() => setShowShareOptions(!showShareOptions)}
                    >
                      <svg
                        className="w-4 h-4 mr-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      Share
                    </button>
                    {showShareOptions && (
                      <div className="absolute mt-10 right-0 z-10 bg-white shadow-lg rounded-md py-2 w-48">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() =>
                            navigator.clipboard.writeText(window.location.href)
                          }
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                          </svg>
                          Copy Link
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                          </svg>
                          WhatsApp
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13.6,13.4l-2.9-2.9c0.4-0.7,0.7-1.5,0.7-2.4c0-2.6-2.1-4.7-4.7-4.7S2,5.5,2,8.1s2.1,4.7,4.7,4.7c0.9,0,1.7-0.2,2.4-0.7l2.9,2.9c0.2,0.2,0.5,0.3,0.8,0.3c0.3,0,0.6-0.1,0.8-0.3C14,14.5,14,13.8,13.6,13.4z M4,8.1c0-1.5,1.2-2.7,2.7-2.7s2.7,1.2,2.7,2.7S8.2,10.8,6.7,10.8S4,9.6,4,8.1z"></path>
                          </svg>
                          Twitter
                        </button>
                      </div>
                    )}
                    <button
                      className={`px-3 py-1.5 rounded text-sm transition-colors flex items-center ${
                        isUpvoted
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={handleThreadUpvote}
                    >
                      <svg
                        className={`w-4 h-4 mr-1.5 ${
                          isUpvoted ? "text-green-600" : "text-gray-500"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {thread.upvotes + (isUpvoted ? 1 : 0)}
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {thread.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/`}
                      className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded text-xs hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Thread Content */}
              <div className="p-5 thread-content text-gray-800">
                <div className="flex items-start mb-4">
                  <div className="mr-3 flex-shrink-0">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {thread.authorAvatar}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="whitespace-pre-line">{thread.content}</div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <button
                      className={`flex items-center space-x-1 ${
                        isUpvoted
                          ? "text-green-600"
                          : "text-gray-500 hover:text-green-600"
                      }`}
                      onClick={handleThreadUpvote}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={isUpvoted ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span>{isUpvoted ? "Upvoted" : "Upvote"}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                      <span>Reply</span>
                    </button>
                    <button
                      className="flex items-center space-x-1 text-gray-500 hover:text-amber-600"
                      onClick={() => setShowShareOptions(!showShareOptions)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-red-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Thread Reply Form */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Reply to this thread
              </h3>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    U
                  </div>
                </div>
                <div className="flex-grow">
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Write your reply..."
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-22H6v14a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                      onClick={handlePostComment}
                      disabled={!newComment.trim()}
                    >
                      Post Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">
                  Comments ({comments.length})
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort By:</span>
                  <select className="text-sm border-gray-300 rounded py-1">
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Most Upvoted</option>
                  </select>
                </div>
              </div>

              {/* Comments List */}
              <div className="divide-y divide-gray-200">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-5"
                    id={`comment-${comment.id}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 ${
                            comment.isModerator
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          } rounded-full flex items-center justify-center text-white font-bold`}
                        >
                          {comment.authorAvatar}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <Link
                            href={`/forum`}
                            className="font-medium text-gray-900 hover:text-green-600"
                          >
                            {comment.author}
                          </Link>
                          {comment.isModerator && (
                            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                              Moderator
                            </span>
                          )}
                          <span
                            className="ml-2 text-sm text-gray-500"
                            title={formatDate(comment.datePosted)}
                          >
                            {timeAgo(comment.datePosted)}
                          </span>
                        </div>

                        <div className="mt-2 text-gray-800 whitespace-pre-line">
                          {comment.content}
                        </div>

                        <div className="mt-3 flex items-center space-x-4 text-sm">
                          <button
                            className="flex items-center space-x-1 text-gray-500 hover:text-green-600"
                            onClick={() => handleCommentUpvote(comment.id)}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              />
                            </svg>
                            <span>{comment.upvotes}</span>
                          </button>
                          <button
                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                            onClick={() =>
                              setReplyToComment(
                                replyToComment === comment.id
                                  ? null
                                  : comment.id
                              )
                            }
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                            <span>Reply</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-amber-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                              />
                            </svg>
                            <span>Share</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                              />
                            </svg>
                            <span>Report</span>
                          </button>
                        </div>

                        {/* Reply Box */}
                        {replyToComment === comment.id && (
                          <div className="mt-4 flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                U
                              </div>
                            </div>
                            <div className="flex-grow">
                              <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
                                placeholder={`Reply to ${comment.author}...`}
                                rows={3}
                                value={replyContent}
                                onChange={(e) =>
                                  setReplyContent(e.target.value)
                                }
                              ></textarea>
                              <div className="mt-2 flex justify-end space-x-2">
                                <button
                                  className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded text-sm transition-colors"
                                  onClick={() => setReplyToComment(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded text-sm transition-colors"
                                  onClick={() => handlePostReply(comment.id)}
                                  disabled={!replyContent.trim()}
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Nested Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-4">
                            {comment.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="pt-3"
                                id={`reply-${reply.id}`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0">
                                    <div
                                      className={`w-8 h-8 ${
                                        reply.isModerator
                                          ? "bg-yellow-500"
                                          : "bg-gray-500"
                                      } rounded-full flex items-center justify-center text-white font-bold text-sm`}
                                    >
                                      {reply.authorAvatar}
                                    </div>
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex items-center">
                                      <Link
                                        href={`/forum`}
                                        className="font-medium text-gray-900 hover:text-green-600"
                                      >
                                        {reply.author}
                                      </Link>
                                      {reply.isModerator && (
                                        <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                                          Moderator
                                        </span>
                                      )}
                                      <span
                                        className="ml-2 text-sm text-gray-500"
                                        title={formatDate(reply.datePosted)}
                                      >
                                        {timeAgo(reply.datePosted)}
                                      </span>
                                    </div>

                                    <div className="mt-1 text-gray-800 whitespace-pre-line text-sm">
                                      {reply.content}
                                    </div>

                                    <div className="mt-2 flex items-center space-x-4 text-xs">
                                      <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                                        <svg
                                          className="w-3.5 h-3.5"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                          />
                                        </svg>
                                        <span>{reply.upvotes}</span>
                                      </button>
                                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600">
                                        <svg
                                          className="w-3.5 h-3.5"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                                          />
                                        </svg>
                                        <span>Report</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Comments */}
              <div className="p-4 bg-gray-50 text-center">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  Load More Comments
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="md:w-1/4 space-y-4">
            {/* About This Thread */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 text-green-600 mr-1.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Thread Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">
                    {formatDate(thread.datePosted)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Author</span>
                  <Link
                    href={`/forum/user/${thread.author}`}
                    className="font-medium text-green-600 hover:text-green-700"
                  >
                    {thread.author}
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Replies</span>
                  <span className="font-medium">{thread.replies}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Views</span>
                  <span className="font-medium">{thread.views}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Upvotes</span>
                  <span className="font-medium">
                    {thread.upvotes + (isUpvoted ? 1 : 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Thread Actions */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 text-green-600 mr-1.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Thread Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm font-medium flex items-center justify-center transition-colors">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  Bookmark Thread
                </button>
                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm font-medium flex items-center justify-center transition-colors">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  Subscribe to Updates
                </button>
                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm font-medium flex items-center justify-center transition-colors">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                  Report Thread
                </button>
              </div>
            </div>

            {/* Similar Threads */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 text-green-600 mr-1.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Similar Threads
              </h3>
              <div className="space-y-3">
                <Link
                  href="/forum/thread/2"
                  className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 text-sm">
                    Local rice prices becoming more competitive
                  </h4>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <span>12 replies</span>
                    <span className="mx-1">•</span>
                    <span>3d ago</span>
                  </div>
                </Link>
                <Link
                  href="/forum/thread/3"
                  className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 text-sm">
                    Food price trends after fuel subsidy removal
                  </h4>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <span>28 replies</span>
                    <span className="mx-1">•</span>
                    <span>1w ago</span>
                  </div>
                </Link>
                <Link
                  href="/forum/thread/4"
                  className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 text-sm">
                    Rice import ban: one year later
                  </h4>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <span>36 replies</span>
                    <span className="mx-1">•</span>
                    <span>2w ago</span>
                  </div>
                </Link>
              </div>
              <Link
                href="/forum/search?q=rice"
                className="mt-3 block text-center text-green-600 hover:text-green-700 text-sm font-medium py-2 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
              >
                View More Similar Topics
              </Link>
            </div>

            {/* Latest Price Updates - Mini Widget */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 text-green-600 mr-1.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm.75-6.75a.75.75 0 00-1.5 0v2.69l-1.72 1.72a.75.75 0 101.06 1.06l2-2a.75.75 0 00.22-.53v-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Latest Rice Prices
              </h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-red-50 rounded-md border border-red-100">
                  <div className="text-xs text-gray-500">Lagos</div>
                  <div className="font-medium text-red-800">
                    ₦62,000 (+8.2%)
                  </div>
                </div>
                <div className="p-2 bg-red-50 rounded-md border border-red-100">
                  <div className="text-xs text-gray-500">Abuja</div>
                  <div className="font-medium text-red-800">
                    ₦60,000 (+5.3%)
                  </div>
                </div>
                <div className="p-2 bg-amber-50 rounded-md border border-amber-100">
                  <div className="text-xs text-gray-500">Kano</div>
                  <div className="font-medium text-amber-800">
                    ₦58,500 (+2.6%)
                  </div>
                </div>
              </div>
              <Link
                href="/"
                className="mt-3 block text-center text-green-600 hover:text-green-700 text-sm font-medium py-2 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
              >
                View All Rice Prices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
