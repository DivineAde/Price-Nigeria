// components/forum/ThreadItem.jsx
import Link from 'next/link';
import { ChevronUp, MessageSquare, Eye, ArrowUpRight, Flame } from 'lucide-react';

export default function ThreadItem({ thread }) {  // Changed from threads to thread
  return (
    <div className={`p-4 hover:bg-gray-50 transition-colors ${thread.isFeatured ? 'border-l-4 border-green-500 pl-3' : ''}`}>
      <div className="flex items-start gap-3">
        {/* Vote column */}
        <div className="hidden md:flex flex-col items-center space-y-1 mt-1">
          <button className="text-gray-400 hover:text-green-600 transition-colors focus:outline-none">
            <ChevronUp size={18} />
          </button>
          <span className="text-sm font-medium text-gray-700">24</span>
        </div>
        
        {/* Thread content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              {thread.category}
            </span>
            {thread.isHot && (
              <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
                <Flame size={12} className="mr-1" />
                Hot
              </span>
            )}
            {thread.isFeatured && (
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full flex items-center">
                <ArrowUpRight size={12} className="mr-1" />
                Featured
              </span>
            )}
          </div>
          
          <Link href={`/forum/thread/${thread.id}`}>
            <h2 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
              {thread.title}
            </h2>
          </Link>
          
          {thread.tags && thread.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {thread.tags.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/forum/tag/${tag.toLowerCase()}`}
                  className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-3 flex flex-wrap items-center text-xs text-gray-500 gap-x-3 gap-y-1">
            <span className="flex items-center">
              <img 
                src={`https://ui-avatars.com/api/?name=${thread.author}&background=random`} 
                alt={thread.author} 
                className="w-5 h-5 rounded-full mr-1.5"
              />
              <Link href={`/forum/user/${thread.author}`} className="font-medium text-gray-700 hover:text-green-600 transition-colors">
                {thread.author}
              </Link>
            </span>
            
            <span>{thread.lastUpdated}</span>
            
            <span className="flex items-center">
              <MessageSquare size={14} className="mr-1 text-gray-400" />
              {thread.replies} replies
            </span>
            
            <span className="flex items-center">
              <Eye size={14} className="mr-1 text-gray-400" />
              {thread.views} views
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}