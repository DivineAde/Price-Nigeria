"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, User, Clock, Search, Bookmark, BookmarkCheck, ChevronRight, Tag } from "lucide-react";

const BlogPage = () => {
  const params = useParams();
  const { slug } = params;
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPosts, setSavedPosts] = useState([]);

  const posts = [
    {
      id: 1,
      slug: "how-weather-patterns-impact-food-prices",
      category: "Market Trends",
      title: "How Weather Patterns Are Impacting Global Food Prices",
      content:
        "Weather patterns have a profound impact on global food prices. Climate change exacerbates these issues, making weather patterns more unpredictable and leading to price volatility in agricultural markets worldwide. This affects both farmers and consumers in the food supply chain.",
      excerpt: "Weather patterns have a profound impact on global food prices. Climate change exacerbates these issues, making weather patterns more unpredictable.",
      date: "October 10, 2023",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
      author: "John Doe",
      authorImage: "/Frame 1000003208 (1).png",
      tags: ["Climate", "Food Prices", "Global Markets"]
    },
    {
      id: 2,
      slug: "smart-shopping-tips-to-save-money",
      category: "Consumer Tips",
      title: "10 Smart Shopping Tips to Save Money on Groceries",
      content:
        "Grocery shopping can be expensive, but with a few smart strategies, you can save money without sacrificing quality. From meal planning to seasonal shopping and bulk buying, these techniques will help you maximize your food budget while maintaining a nutritious diet.",
      excerpt: "Grocery shopping can be expensive, but with a few smart strategies, you can save money without sacrificing quality.",
      date: "October 8, 2023",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1668906093328-99601a1aa584?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
      author: "Jane Smith",
      authorImage: "/Frame 1000003208 (2).png",
      tags: ["Budgeting", "Shopping", "Savings"]
    },
    {
      id: 3,
      slug: "rise-of-plant-based-diets",
      category: "Food Industry",
      title: "The Rise of Plant-Based Diets and Their Impact on the Food Industry",
      content:
        "Plant-based diets have surged in popularity, driven by growing awareness of health, environmental, and ethical concerns. Food companies are responding with innovative plant-based alternatives that replicate the taste and texture of animal products, reshaping the future of food production.",
      excerpt: "Plant-based diets have surged in popularity, driven by growing awareness of health, environmental, and ethical concerns.",
      date: "October 15, 2023",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
      author: "Emily Johnson",
      authorImage: "/Frame 1000003208 (3).png",
      tags: ["Plant-based", "Diet", "Sustainability"]
    },
    {
      id: 4,
      slug: "sustainable-farming-practices",
      category: "Agriculture",
      title: "Sustainable Farming Practices for a Greener Future",
      content:
        "Sustainable farming practices are crucial for preserving natural resources and ensuring long-term food security. This article explores techniques like crop rotation, water conservation, and organic farming methods that reduce environmental impact while maintaining productivity and profitability.",
      excerpt: "Sustainable farming practices are crucial for preserving natural resources and ensuring long-term food security.",
      date: "November 2, 2023",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
      author: "Michael Green",
      authorImage: "/Frame 1000003208 (4).png",
      tags: ["Farming", "Sustainability", "Agriculture"]
    },
    {
      id: 5,
      slug: "food-waste-reduction-tips",
      category: "Sustainability",
      title: "How to Reduce Food Waste at Home and Save Money",
      content:
        "Reducing food waste not only helps the environment but also saves money on groceries. Learn practical ways to minimize waste through proper storage, creative leftovers usage, meal planning, and understanding food labels to significantly decrease your household's environmental footprint.",
      excerpt: "Reducing food waste not only helps the environment but also saves money on groceries. Learn practical ways to minimize waste.",
      date: "November 5, 2023",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
      author: "Sophia White",
      authorImage: "/Frame 1000003208.png",
      tags: ["Food Waste", "Sustainability", "Home Economics"]
    },
    {
      id: 6,
      slug: "impact-of-technology-on-food-production",
      category: "Tech & Food",
      title: "The Impact of Technology on Modern Food Production",
      content:
        "Technology is revolutionizing food production, improving efficiency and sustainability across the agricultural sector. From precision farming and AI-powered crop monitoring to vertical farming and lab-grown meat, these innovations are addressing global food challenges and creating new opportunities.",
      excerpt: "Technology is revolutionizing food production, improving efficiency and sustainability across the agricultural sector.",
      date: "November 10, 2023",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
      author: "Daniel Brown",
      authorImage: "/Frame 1000003208 (1).png",
      tags: ["Technology", "Innovation", "Agriculture"]
    }
  ];

  // Extract unique categories
  const categories = ["All", ...new Set(posts.map(post => post.category))];

  // Handle post saving
  const toggleSavePost = (postId) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
  };

  // Filter posts by category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Featured post is the most recent one
  const featuredPost = [...posts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )[0];

  return (
    <div className="bg-gray-50">
      {/* Hero section with featured post */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-[85rem] mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-green-800 bg-opacity-30 rounded-full mt-8 md:mt-1  mb-4">
                Featured Post
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h1>
              <p className="text-green-100 mb-6">{featuredPost.content}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={featuredPost.authorImage} 
                      alt={featuredPost.author} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-sm">{featuredPost.author}</span>
                </div>
                <span className="text-green-200 text-sm flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {featuredPost.date}
                </span>
                <span className="text-green-200 text-sm flex items-center">
                  <Clock size={14} className="mr-1" />
                  {featuredPost.readTime}
                </span>
              </div>
              
              <Link href={`/blog/${featuredPost.slug}`}>
                <span className="inline-flex items-center px-4 py-2 bg-white text-green-700 rounded-md hover:bg-green-50 transition-colors">
                  Read Article
                  <ChevronRight size={16} className="ml-1" />
                </span>
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-64 rounded-lg overflow-hidden shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-[85rem] mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-8">
          <p className="text-gray-600">{filteredPosts.length} articles found</p>
        </div>
        
        {/* Blog grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={post.image}
                    alt={post.title}
                  />
                  <button 
                    onClick={() => toggleSavePost(post.id)}
                    className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                    aria-label={savedPosts.includes(post.id) ? "Unsave post" : "Save post"}
                  >
                    {savedPosts.includes(post.id) ? (
                      <BookmarkCheck size={18} className="text-green-600" />
                    ) : (
                      <Bookmark size={18} className="text-gray-700" />
                    )}
                  </button>
                  <span className="absolute bottom-3 left-3 px-2 py-1 bg-green-600 text-white text-xs rounded">
                    {post.category}
                  </span>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src={post.authorImage} 
                          alt={post.author} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <span className="text-sm text-gray-700">{post.author}</span>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <span className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm">
                      Read More
                      <ChevronRight size={16} className="ml-1" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-sm">
            <img src="/api/placeholder/120/120" alt="No results" className="mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600 text-center max-w-md mb-4">
              We couldn't find any articles matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
        
        {/* Newsletter subscription */}
        <div className="mt-16 bg-gray-900 rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-300 mb-6">Get the latest articles, tips, and food industry insights directly to your inbox.</p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-gray-400 text-xs mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
            <div className="hidden md:block relative">
              <img
                src="/new-signup-img.webp"
                alt="Newsletter"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;