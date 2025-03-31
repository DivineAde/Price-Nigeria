// data/forumData.js

export const forumThreads = [
  {
    id: 1,
    title: "Rice prices spiking in Lagos markets",
    author: "FoodTracker23",
    replies: 24,
    views: 342,
    lastUpdated: "2h ago",
    category: "Price Alerts",
    isFeatured: true,
    isHot: true,
    tags: ["Lagos", "Rice"]
  },
  {
    id: 2,
    title: "Best markets for fresh vegetables in Abuja",
    author: "GreenHarvest",
    replies: 18,
    views: 203,
    lastUpdated: "Yesterday",
    category: "Market Tips",
    isFeatured: false,
    isHot: false,
    tags: ["Abuja", "Vegetables"]
  },
  {
    id: 3,
    title: "Yam prices continue to fall in Eastern regions",
    author: "MarketWatcher",
    replies: 32,
    views: 451,
    lastUpdated: "3d ago",
    category: "Price Trends",
    isFeatured: true,
    isHot: true,
    tags: ["Yam", "Eastern"]
  },
  {
    id: 4,
    title: "How inflation is affecting garri prices nationwide",
    author: "EconomyExpert",
    replies: 56,
    views: 729,
    lastUpdated: "1w ago",
    category: "Analysis",
    isFeatured: false,
    isHot: true,
    tags: ["Garri", "Inflation"]
  },
  {
    id: 5,
    title: "Palm oil price comparison: North vs South",
    author: "PriceHunter",
    replies: 41,
    views: 382,
    lastUpdated: "5d ago",
    category: "Price Comparison",
    isFeatured: false,
    isHot: false,
    tags: ["Palm Oil", "Comparison"]
  }
];

export const categories = ["All Threads", "Price Alerts", "Market Tips", "Price Trends", "Analysis", "Price Comparison"];

export const trendingTopics = ["Rice", "Tomatoes", "Beans", "Palm Oil", "Yam"];

export const communityStats = {
  threads: 8942,
  posts: 142876,
  members: 24531,
  online: 384
};

export const priceUpdates = [
  {
    item: "Rice (50kg)",
    price: "₦62,000",
    change: "+8.2%",
    trend: "up"
  },
  {
    item: "Tomatoes (basket)",
    price: "₦15,500",
    change: "-12.4%",
    trend: "down"
  },
  {
    item: "Beans (100kg)",
    price: "₦98,000",
    change: "0%",
    trend: "neutral"
  }
];