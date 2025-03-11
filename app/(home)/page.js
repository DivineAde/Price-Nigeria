import FoodCollection from "@/components/Collections";
import HeroSection from "@/components/Hero";
import { HomeCarousel } from "@/components/HomeCarousel";
import UsersInteraction from "@/components/UsersInteraction";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogPage";
import EmblaCarousel from "@/components/EmblaCarousel";
import FruitsCarousel from "@/components/FruitsCarousel";
const OPTIONS = { loop: true };
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
  const items = [
    { name: "Apple", price: 1.99, weight: "1kg", quantity: 10, image: "/fruits.jpg" },
    { name: "Banana", price: 0.99, weight: "1.5kg", quantity: 15, image: "/fruits.jpg" },
    { name: "Orange", price: 1.49, weight: "2kg", quantity: 12, image: "/fruits.jpg" },
    { name: "Strawberry", price: 2.99, weight: "500g", quantity: 8, image: "/fruits.jpg" },
    { name: "Mango", price: 3.49, weight: "1.2kg", quantity: 6, image: "/fruits.jpg" },
    { name: "Pineapple", price: 4.99, weight: "2.5kg", quantity: 4, image: "/fruits.jpg" },
    { name: "Grapes", price: 3.99, weight: "750g", quantity: 20, image: "/fruits.jpg" },
    { name: "Watermelon", price: 5.99, weight: "5kg", quantity: 3, image: "/fruits.jpg" },
  ];
  
  return (
    <div className="">
      <HeroSection />
      <BlogSection />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8">Fruits and Drinks</h1>
        <FruitsCarousel items={items} />
      </div>

      {/* 
       <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <UsersInteraction />
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-3xl font-bold">Trending Food items</h1>
        <HomeCarousel />
      </div> */}
      <FoodCollection />
      <div className="bg-gray-100">
        <Testimonials />
      </div>
    </div>
  );
}
