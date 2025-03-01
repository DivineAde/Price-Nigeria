// components/BlogSection.js
import Link from "next/link";

const BlogSection = () => {
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

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Blog & News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-green-600 font-semibold">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-4">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  {/* Update the Link to point to the dynamic route */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-green-600 hover:text-green-800 font-semibold transition-colors duration-300"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
