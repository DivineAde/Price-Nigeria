// components/BlogSection.js
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const BlogSection = () => {
  const posts = [
    {
      id: 1,
      slug: "how-weather-patterns-impact-food-prices",
      category: "Market Trends",
      title: "How Weather Patterns Are Impacting Global Food Prices",
      description:
        "Weather patterns have a profound impact on global food prices...",
      date: "October 10, 2023",
      readTime: "5 min read",
      image: "/pexels-heftiba-940302.jpg",
      author: {
        name: "John Doe",
        bio: "John is a seasoned agricultural economist with over 10 years of experience...",
        avatar: "/Frame 1000003208 (1).png",
      },
    },
    {
      id: 2,
      slug: "smart-shopping-tips-to-save-money",
      category: "Consumer Tips",
      title: "10 Smart Shopping Tips to Save Money on Groceries",
      description:
        "Grocery shopping can be expensive, but with a few smart strategies...",
      date: "October 8, 2023",
      readTime: "4 min read",
      image: "/pexels-heftiba-940302.jpg",
      author: {
        name: "Jane Smith",
        bio: "Jane is a personal finance expert who specializes in helping families...",
        avatar: "/Frame 1000003208 (2).png",
      },
    },
    {
      id: 3,
      slug: "rise-of-plant-based-diets",
      category: "Food Industry",
      title:
        "The Rise of Plant-Based Diets and Their Impact on the Food Industry",
      description:
        "In recent years, plant-based diets have surged in popularity...",
      date: "October 15, 2023",
      readTime: "6 min read",
      image: "/pexels-heftiba-940302.jpg",
      author: {
        name: "Emily Johnson",
        bio: "Emily is a food industry analyst with a focus on sustainability...",
        avatar: "/Frame 1000003208 (3).png",
      },
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <span className="text-blue-600 font-medium text-sm uppercase tracking-wider">Our Blog</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">Latest Insights</h2>
          </div>
          <Link 
            href="/blog" 
            className="mt-4 md:mt-0 group flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-300"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="flex flex-col rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 h-full"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-full w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-grow p-6">
                <Link href={`/blog/${post.slug}`} className="group">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.description}</p>
                
                {/* Meta Info */}
                <div className="flex items-center text-xs text-gray-500 mt-auto mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="mx-2">•</div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                {/* Author */}
                <div className="flex items-center pt-4 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {post.author.name}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;