"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const BlogPost = () => {
  const params = useParams();
  const { slug } = params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock data
  const posts = [
    {
      id: 1,
      slug: "how-weather-patterns-impact-food-prices",
      category: "Market Trends",
      title: "How Weather Patterns Are Impacting Global Food Prices",
      content: [
        <p key="1" className="mb-4">
          Weather patterns have a profound impact on global food prices. From
          droughts to floods, extreme weather events disrupt agricultural
          production, leading to supply shortages and price volatility. For
          example, prolonged droughts in major wheat-producing regions can
          reduce yields, causing bread prices to soar. Similarly, excessive
          rainfall can damage crops, leading to higher prices for fruits and
          vegetables.
        </p>,
        <p key="2">
          Climate change is exacerbating these issues, making weather patterns
          more unpredictable. Farmers are struggling to adapt, and governments
          are implementing policies to stabilize food markets. Understanding
          these dynamics is crucial for consumers, policymakers, and businesses
          alike.
        </p>,
      ],
      date: "October 10, 2023",
      readTime: "4 min read",
      image: "/pexels-heftiba-940302.jpg",
      author: {
        name: "John Doe",
        bio: "John is a seasoned agricultural economist with over 10 years of experience in analyzing global food markets.",
        avatar: "/Frame 1000003208 (1).png",
      },
      tags: ["Climate", "Agriculture", "Economics"],
    },
    {
      id: 2,
      slug: "smart-shopping-tips-to-save-money",
      category: "Consumer Tips",
      title: "10 Smart Shopping Tips to Save Money on Groceries",
      content: [
        <p key="1" className="mb-4">
          Grocery shopping can be expensive, but with a few smart strategies,
          you can save money without sacrificing quality. Here are 10 tips to
          help you stretch your budget:
        </p>,
        <ol key="2" className="list-decimal pl-8 space-y-2 mb-4">
          <li>
            Plan your meals and make a shopping list to avoid impulse buys.
          </li>
          <li>
            Shop in bulk for non-perishable items like rice, pasta, and canned
            goods.
          </li>
          <li>
            Take advantage of sales and discounts, but only buy what you need.
          </li>
          <li>Compare prices between stores to find the best deals.</li>
          <li>Use coupons and cashback apps to save even more.</li>
          <li>Buy seasonal produce, which is often cheaper and fresher.</li>
          <li>Avoid pre-packaged items and opt for whole foods instead.</li>
          <li>Shop at local farmers' markets for affordable, fresh produce.</li>
          <li>Limit trips to the store to reduce impulse purchases.</li>
          <li>
            Consider store-brand products, which are often just as good as name
            brands.
          </li>
        </ol>,
      ],
      date: "October 8, 2023",
      readTime: "6 min read",
      image: "/pexels-heftiba-940302.jpg",
      author: {
        name: "Jane Smith",
        bio: "Jane is a personal finance expert who specializes in helping families save money on everyday expenses.",
        avatar: "/Frame 1000003208 (2).png",
      },
      tags: ["Budgeting", "Shopping", "Savings"],
    },
    {
      id: 3,
      slug: "rise-of-plant-based-diets",
      category: "Food Industry",
      title:
        "The Rise of Plant-Based Diets and Their Impact on the Food Industry",
      content: [
        <p key="1" className="mb-4">
          In recent years, plant-based diets have surged in popularity, driven
          by growing awareness of health, environmental, and ethical concerns.
          This shift is reshaping the food industry, with companies racing to
          meet the demand for plant-based alternatives to meat, dairy, and other
          animal products.
        </p>,
        <p key="2" className="mb-4">
          Major food brands and startups alike are investing heavily in
          plant-based innovations. Products like Beyond Meat and Impossible
          Foods have become household names, offering plant-based burgers,
          sausages, and more that closely mimic the taste and texture of meat.
          Similarly, dairy alternatives made from almonds, oats, and soy are now
          staples in many households.
        </p>,
        <p key="3" className="mb-4">
          The environmental benefits of plant-based diets are significant.
          Livestock farming is a major contributor to greenhouse gas emissions,
          deforestation, and water usage. By shifting to plant-based diets,
          consumers can reduce their carbon footprint and contribute to a more
          sustainable food system.
        </p>,
        <p key="4">
          However, challenges remain. Critics argue that some plant-based
          products are highly processed and may not be as healthy as whole plant
          foods. Additionally, the cost of plant-based alternatives can be a
          barrier for some consumers. Despite these challenges, the trend shows
          no signs of slowing down, and the food industry is likely to continue
          evolving to meet the demands of a growing plant-based market.
        </p>,
      ],
      date: "October 15, 2023",
      readTime: "8 min read",
      image: "/pexels-heftiba-940302.jpg",
      author: {
        name: "Emily Johnson",
        bio: "Emily is a food industry analyst with a focus on sustainability and emerging trends.",
        avatar: "/Frame 1000003208 (2).png",
      },
      tags: ["Plant-Based", "Sustainability", "Food Trends"],
    },
  ];

  // Find the post that matches the slug
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Post Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't seem to exist.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
          >
            Return to Blog Home
          </Link>
        </div>
      </div>
    );
  }

  // Related posts (excluding current post)
  const relatedPosts = posts.filter((p) => p.id !== post.id);

  // Function to handle bookmark toggle
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Hero Section with Full-width Image */}
      <div className="relative w-full h-96 lg:h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:container lg:mx-auto lg:px-16">
          <Link
            href="/blog"
            className="inline-flex items-center text-white hover:text-green-200 transition-colors duration-300 mb-4"
          >
            ← Back to Blog
          </Link>
          <span className="text-sm md:text-base bg-green-600 text-white px-3 py-1 rounded-full inline-block mb-3">
            {post.category}
          </span>
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-white">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <div>
              <p className="font-medium">{post.author.name}</p>
              <div className="flex items-center text-sm">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-3">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none text-gray-700">
                {post.content.map((element, index) => (
                  <div key={index}>{element}</div>
                ))}
              </div>

              {/* Author Bio Card */}
              <div className="mt-12 bg-green-50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      About {post.author.name}
                    </h3>
                    <p className="text-gray-700">{post.author.bio}</p>
                    <button className="mt-4 px-4 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-300">
                      View All Articles
                    </button>
                  </div>
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="mt-8 flex items-center justify-between border-t border-b border-gray-200 py-4">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>Comment</span>
                  </button>
                  <button
                    className="flex items-center space-x-2 transition-colors duration-300"
                    onClick={toggleBookmark}
                    style={{ color: isBookmarked ? "#16a34a" : "#6b7280" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={isBookmarked ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>{isBookmarked ? "Saved" : "Save"}</span>
                  </button>
                </div>
                <div className="flex space-x-3">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-90 transition-opacity duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3B5998] text-white hover:bg-opacity-90 transition-opacity duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077B5] text-white hover:bg-opacity-90 transition-opacity duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-green-600 rounded-xl shadow-lg p-8 text-white mt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Subscribe to our Newsletter
                  </h3>
                  <p className="text-green-100">
                    Get the latest food industry news and tips delivered to your
                    inbox.
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none flex-grow w-full md:w-64"
                    />
                    <button className="bg-green-800 hover:bg-green-900 px-4 py-3 rounded-r-lg transition-colors duration-300">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform transition duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/20">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{relatedPost.date}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center mt-4">
                      <img
                        src={relatedPost.author.avatar}
                        alt={relatedPost.author.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        {relatedPost.author.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
