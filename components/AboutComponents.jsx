"use client"

// AboutSection.jsx
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingCart, Clock, Users } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6 text-emerald-500" />,
      title: "Real-time Price Tracking",
      description: "Monitor price fluctuations across markets with our advanced tracking algorithms"
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-emerald-500" />,
      title: "Smart Shopping Lists",
      description: "Create lists that automatically update with the best prices and availability"
    },
    {
      icon: <Clock className="h-6 w-6 text-emerald-500" />,
      title: "Price History",
      description: "View historical data to make informed purchasing decisions"
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      title: "Community Insights",
      description: "Benefit from crowdsourced information on quality and availability"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About <span className="text-emerald-500">FreshTrack</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Empowering consumers with real-time food market data to make smarter shopping decisions and reduce food waste.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            className="rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img 
                src="/pexels-reneasmussen-2544829.jpg" 
                alt="Market data visualization" 
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              We believe that access to accurate, timely information about food prices and availability should be universal. FreshTrack was founded in 2025 with the goal of bringing transparency to food markets and helping consumers make informed decisions.
            </p>
            <p className="text-gray-600">
              Our platform aggregates data from thousands of sources, processing millions of price points daily to deliver the most comprehensive food market intelligence available anywhere.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="bg-emerald-50 p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;