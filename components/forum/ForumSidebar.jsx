// components/forum/ForumSidebar.jsx
import Link from 'next/link';
import { communityStats, trendingTopics, priceUpdates } from '@/data/forumData';
import { ArrowUp, ArrowDown, Minus, Users, MessageSquare, TrendingUp, DollarSign } from 'lucide-react';

export default function ForumSidebar() {
  return (
    <div className="space-y-4 sticky top-12">
      {/* Community Stats */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
          <Users size={18} className="mr-2 text-green-600" />
          Community Stats
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="block text-gray-500 mb-1">Threads</span>
            <span className="font-bold text-gray-900 text-lg">{communityStats.threads.toLocaleString()}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="block text-gray-500 mb-1">Posts</span>
            <span className="font-bold text-gray-900 text-lg">{communityStats.posts.toLocaleString()}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="block text-gray-500 mb-1">Members</span>
            <span className="font-bold text-gray-900 text-lg">{communityStats.members.toLocaleString()}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="block text-gray-500 mb-1">Online</span>
            <span className="font-bold text-green-600 text-lg">{communityStats.online.toLocaleString()}</span>
          </div>
        </div>
        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
          <Users size={16} className="mr-2" />
          Join Community
        </button>
      </div>
      
      {/* Trending Topics */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
          <TrendingUp size={18} className="mr-2 text-blue-600" />
          Trending Topics
        </h3>
        <ul className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <li key={index}>
              <Link 
                href={`/forum/topic/${topic.slug}`}
                className="block p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{topic.title}</span>
                  <span className="text-xs text-gray-500">{topic.posts} posts</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{topic.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link 
          href="/forum/trending"
          className="text-sm text-blue-600 hover:text-blue-800 mt-3 inline-block font-medium"
        >
          View all trending topics →
        </Link>
      </div>

      {/* Price Updates */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
          <DollarSign size={18} className="mr-2 text-purple-600" />
          Market Updates
        </h3>
        <ul className="space-y-2">
          {priceUpdates.map((update, index) => (
            <li key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
              <div className="flex items-center">
                <img 
                  src={update.icon} 
                  alt={update.name} 
                  className="w-6 h-6 mr-2" 
                />
                <span className="font-medium text-gray-900">{update.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">${update.price.toFixed(2)}</span>
                <div className={`flex items-center ${
                  update.change > 0 ? 'text-green-600' :
                  update.change < 0 ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {update.change > 0 ? (
                    <ArrowUp size={14} />
                  ) : update.change < 0 ? (
                    <ArrowDown size={14} />
                  ) : (
                    <Minus size={14} />
                  )}
                  <span className="text-xs ml-1">
                    {Math.abs(update.change).toFixed(2)}%
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link 
          href="/forum"
          className="text-sm text-purple-600 hover:text-purple-800 mt-3 inline-block font-medium"
        >
          View full market data →
        </Link>
      </div>
    </div>
  );
}