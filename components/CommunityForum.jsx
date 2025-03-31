"use client"

import React, { useState } from 'react';
import { 
  MessageCircle, 
  Award, 
  CheckCircle, 
  Shield, 
  Sparkles,
  Filter,
  Search,
  PlusCircle,
  Hash,
  Bookmark,
  Settings,
  Bell,
  Globe,
  TrendingUp
} from 'lucide-react';

const CommunityForumPage = () => {
  // Mock Data with Enhanced Information
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'MarketMaven',
      avatar: '/api/placeholder/80/80',
      reputation: 250,
      expertise: ['Commodities', 'Economic Trends'],
      badge: 'Expert'
    },
    {
      id: 2,
      username: 'DataAnalyst23',
      avatar: '/api/placeholder/80/80',
      reputation: 180,
      expertise: ['Financial Markets', 'Risk Analysis'],
      badge: 'Contributor'
    },
    {
      id: 3,
      username: 'GlobalInsights',
      avatar: '/api/placeholder/80/80',
      reputation: 420,
      expertise: ['International Trade', 'Investment Strategy'],
      badge: 'Moderator'
    }
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: users[0],
      title: 'Emerging Trends in Global Commodity Markets',
      summary: 'A deep dive into the shifting dynamics of international commodity trading, highlighting key indicators and potential investment opportunities...',
      timestamp: '2 hours ago',
      engagement: {
        likes: 42,
        comments: 15,
        views: 1240
      },
      verified: true,
      categories: ['Commodities', 'Market Analysis'],
      tags: ['#GlobalTrading', '#InvestmentStrategy']
    },
    {
      id: 2,
      author: users[1],
      title: 'Risk Mitigation in Volatile Economic Landscapes',
      summary: 'Comprehensive strategy framework for navigating uncertain economic environments, focusing on data-driven risk assessment techniques...',
      timestamp: '1 day ago',
      engagement: {
        likes: 67,
        comments: 22,
        views: 2100
      },
      verified: false,
      categories: ['Risk Management', 'Economic Strategy'],
      tags: ['#RiskAnalysis', '#EconomicTrends']
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    categories: [],
    sortBy: 'latest'
  });

  const [activeTab, setActiveTab] = useState('all');

  // Enhanced Filtering and Sorting Logic
  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(filters.searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch(filters.sortBy) {
        case 'trending':
          return (b.engagement.views + b.engagement.comments + b.engagement.likes) - 
                 (a.engagement.views + a.engagement.comments + a.engagement.likes);
        case 'top':
          return b.engagement.likes - a.engagement.likes;
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

  // Top Categories
  const topCategories = Array.from(
    new Set(posts.flatMap(post => post.categories))
  ).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Community Forum</h1>
            <p className="text-gray-600 mt-2">Connect, Learn, and Share Insights</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-600 transition-colors flex items-center">
              <PlusCircle className="mr-2" /> Create Post
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors">
              <Bell />
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors">
              <Settings />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Expert Profiles & Categories */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Contributors */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Sparkles className="w-8 h-8 text-indigo-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Top Contributors
                </h3>
              </div>

              {users.sort((a, b) => b.reputation - a.reputation).map(user => (
                <div 
                  key={user.id} 
                  className="bg-gray-100 rounded-xl p-4 mb-4 transition-all hover:bg-gray-200"
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src={user.avatar} 
                        alt={user.username} 
                        className="w-16 h-16 rounded-full border-3 border-indigo-200 mr-4"
                      />
                      {user.badge && (
                        <span className="absolute bottom-0 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          {user.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold text-gray-800 mr-2">
                          {user.username}
                        </h4>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <p className="text-sm text-gray-600">
                        Reputation: {user.reputation}
                      </p>
                      <div className="mt-2 flex space-x-2">
                        {user.expertise.map(area => (
                          <span 
                            key={area} 
                            className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Hash className="w-8 h-8 text-green-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Top Categories
                </h3>
              </div>
              <div className="space-y-3">
                {topCategories.map(category => (
                  <div 
                    key={category} 
                    className="flex justify-between items-center bg-gray-100 rounded-xl p-3 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <span className="text-gray-700">{category}</span>
                    <span className="text-sm text-gray-500">
                      {posts.filter(post => post.categories.includes(category)).length} posts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Search insights, topics, experts..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setFilters({...filters, sortBy: 'latest'})}
                    className={`p-3 rounded-xl ${filters.sortBy === 'latest' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Latest
                  </button>
                  <button 
                    onClick={() => setFilters({...filters, sortBy: 'trending'})}
                    className={`p-3 rounded-xl ${filters.sortBy === 'trending' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    <TrendingUp className="w-6 h-6" />
                  </button>
                  <button className="bg-indigo-500 text-white p-3 rounded-xl hover:bg-indigo-600 transition-colors">
                    <Filter className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-2 flex justify-center">
              <div className="flex space-x-4">
                {[
                  { key: 'all', label: 'All Posts', icon: Globe },
                  { key: 'following', label: 'Following', icon: Bookmark },
                  { key: 'my_posts', label: 'My Posts', icon: MessageCircle }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center px-6 py-3 rounded-xl transition-colors ${
                      activeTab === tab.key 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="mr-2" /> {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center mb-4">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.username} 
                        className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-200"
                      />
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-bold text-gray-800 mr-2">
                            {post.author.username}
                          </h4>
                          {post.verified && (
                            <Shield className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {post.timestamp}
                        </p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.summary}
                    </p>

                    {/* Categories and Tags */}
                    <div className="flex space-x-2 mb-4">
                      {post.categories.map(category => (
                        <span 
                          key={category} 
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                      {post.tags?.map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Engagement Metrics */}
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                      <div className="flex space-x-4 text-gray-600">
                        <div className="flex items-center">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          <span>{post.engagement.comments}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-5 h-5 mr-2" />
                          <span>{post.engagement.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 mr-2" />
                          <span>{post.engagement.views}</span>
                        </div>
                      </div>
                      <button className="text-indigo-500 hover:text-indigo-700 transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForumPage;