"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const BlogPost = () => {
  const params = useParams();
  const { slug } = params; // Destructure the slug from the params object

  // Mock data
  const posts = [
    {
      id: 1,
      slug: "how-weather-patterns-impact-food-prices",
      category: "Market Trends",
      title: "How Weather Patterns Are Impacting Global Food Prices",
      content: [
        <p key="1">
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
      image: "/pexels-heftiba-940302.jpg",
      author: {
        name: "John Doe",
        bio: "John is a seasoned agricultural economist with over 10 years of experience in analyzing global food markets.",
        avatar: "/Frame 1000003208 (1).png",
      },
    },
    {
      id: 2,
      slug: "smart-shopping-tips-to-save-money",
      category: "Consumer Tips",
      title: "10 Smart Shopping Tips to Save Money on Groceries",
      content: [
        <p key="1">
          Grocery shopping can be expensive, but with a few smart strategies,
          you can save money without sacrificing quality. Here are 10 tips to
          help you stretch your budget:
        </p>,
        <ol key="2" className="list-decimal pl-8">
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
          <li>Shop at local farmers’ markets for affordable, fresh produce.</li>
          <li>Limit trips to the store to reduce impulse purchases.</li>
          <li>
            Consider store-brand products, which are often just as good as name
            brands.
          </li>
        </ol>,
      ],
      date: "October 8, 2023",
      image: "/pexels-heftiba-940302.jpg",
      author: {
        name: "Jane Smith",
        bio: "Jane is a personal finance expert who specializes in helping families save money on everyday expenses.",
        avatar: "/Frame 1000003208 (2).png",
      },
    },
    {
      id: 3,
      slug: "rise-of-plant-based-diets",
      category: "Food Industry",
      title:
        "The Rise of Plant-Based Diets and Their Impact on the Food Industry",
      content: [
        <p key="1">
          In recent years, plant-based diets have surged in popularity, driven
          by growing awareness of health, environmental, and ethical concerns.
          This shift is reshaping the food industry, with companies racing to
          meet the demand for plant-based alternatives to meat, dairy, and other
          animal products.
        </p>,
        <p key="2">
          Major food brands and startups alike are investing heavily in
          plant-based innovations. Products like Beyond Meat and Impossible
          Foods have become household names, offering plant-based burgers,
          sausages, and more that closely mimic the taste and texture of meat.
          Similarly, dairy alternatives made from almonds, oats, and soy are now
          staples in many households.
        </p>,
        <p key="3">
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
      image: "/pexels-heftiba-940302.jpg",
      author: {
        name: "Emily Johnson",
        bio: "Emily is a food industry analyst with a focus on sustainability and emerging trends.",
        avatar: "/emily-johnson-avatar.jpg",
      },
    },
  ];

  // Find the post that matches the slug
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <p className="text-2xl mt-12 text-center">Post not found.</p>; // If no post matches the slug, show a "not found" message
  }

  // Related posts (mock data)
  const relatedPosts = posts.filter((p) => p.id !== post.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors duration-300"
        >
          ← Back to Blog
        </Link>

        {/* Blog Content */}
        <div className="max-w-3xl mx-auto mt-8 backdrop-blur-lg">
          {/* Category */}
          <span className="text-sm text-green-600 font-semibold uppercase tracking-wide">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
            {post.title}
          </h1>

          {/* Date */}
          <p className="text-sm text-gray-500 mb-8">{post.date}</p>

          {/* Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-8 transform transition-transform duration-500 hover:scale-105"
          />

          {/* Content */}
          <div className="prose prose-lg text-gray-700">
            {post.content.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>

          {/* Author Bio */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex items-center space-x-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-600">{post.author.bio}</p>
              </div>
            </div>
          </div>

          {/* Social Sharing Buttons */}
          <div className="mt-8 flex space-x-4">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              <span>Share on Twitter</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              <span>Share on Facebook</span>
            </button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
          {relatedPosts.map((relatedPost) => (
            <Link
              key={relatedPost.id}
              href={`/blog/${relatedPost.slug}`}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 border border-white/20 h-full">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-sm text-green-600 font-semibold uppercase tracking-wide">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {relatedPost.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
