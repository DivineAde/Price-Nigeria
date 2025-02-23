import FoodCollection from "@/components/Collections";
import HeroSection from "@/components/Hero";
import { HomeCarousel } from "@/components/HomeCarousel";
import Testimonials from "@/components/Testimonials"

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-3xl font-bold">Trending Food items</h1>
        <HomeCarousel />
      </div>
      <FoodCollection />
      <Testimonials />
    </div>
  );
}
