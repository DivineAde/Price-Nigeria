import FoodCollection from "@/components/Collections";
import HeroSection from "@/components/Hero";
import { HomeCarousel } from "@/components/HomeCarousel";
import UsersInteraction from "@/components/UsersInteraction";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogPage";
import EmblaCarousel from "@/components/EmblaCarousel";
import FruitsCarousel from "@/components/FruitsCarousel";
import FruitsDrinksCarousel from "@/components/Fruits&DrinksCarousel";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
  const items = [
    { name: "Apple", price: 1.99, image: "/pepper.avif" },
    { name: "Banana", price: 0.99, image: "/pepper.avif" },
    { name: "Orange", price: 1.49, image: "/pepper.avif" },
    { name: "Strawberry", price: 2.99, image: "/pepper.avif" },
    { name: "Mango", price: 3.49, image: "/pepper.avif" },
  ];
  return (
    <div className="">
      <HeroSection />
      <BlogSection />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8">Fruits and Drinks</h1>
        <FruitsDrinksCarousel items={items} />
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
