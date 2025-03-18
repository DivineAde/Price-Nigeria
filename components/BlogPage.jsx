// components/BlogSection.js
import Image from "next/image";
import Link from "next/link";

const BlogSection = () => {
  const posts = [
    {
      id: 1,
      slug: "how-weather-patterns-impact-food-prices",
      category: "Market Trends",
      title: "How Weather Patterns Are Impacting Global Food Prices",
      description: "Weather patterns have a profound impact on global food prices...",
      date: "October 10, 2023",
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
      description: "Grocery shopping can be expensive, but with a few smart strategies...",
      date: "October 8, 2023",
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
      title: "The Rise of Plant-Based Diets and Their Impact on the Food Industry",
      description: "In recent years, plant-based diets have surged in popularity...",
      date: "October 15, 2023",
      image: "/pexels-heftiba-940302.jpg",
      author: {
        name: "Emily Johnson",
        bio: "Emily is a food industry analyst with a focus on sustainability...",
        avatar: "/emily-johnson-avatar.jpg",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Latest Blogs</h1>

          <Link href="/blog" className="text-blue-600 hover:underline">
           View more
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="relative h-96 overflow-hidden rounded-lg shadow-lg group cursor-pointer">
                {/* Background Image */}
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="z-0"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gray-700/50 group-hover:bg-black/70 transition-all duration-300"></div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end text-white">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-sm mb-4">{post.description}</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{post.author.name}</p>
                      <p className="text-xs text-gray-300">{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;