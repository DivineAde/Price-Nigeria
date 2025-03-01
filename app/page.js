import FoodCollection from "@/components/Collections";
import HeroSection from "@/components/Hero";
import { HomeCarousel } from "@/components/HomeCarousel";
import UsersInteraction from "@/components/UsersInteraction";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogPage";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <BlogSection />
      {/* <UsersInteraction />
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
