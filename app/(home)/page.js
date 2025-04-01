import FoodCollection from "@/components/FeaturedProduct";
import HeroSection from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogPage";
import FruitSwiper from "@/components/FruitsCarousel";
import Ingredients from "@/components/Ingredients";
import NigerianAnalyticsSection from "@/components/AnalyticalComponents";
import AboutSection from "@/components/AboutComponents";
import LocationMapComponent from "@/components/LocationComponent";
import LocationPriceComparison from "@/components/LocationComparison";
import CommunityForum from  "@/components/CommunityForum"
import Marquee from "@/components/MarqueeComponent";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <Marquee />
      <BlogSection />
      <NigerianAnalyticsSection />
      <Ingredients />
      <FruitSwiper />
      <LocationMapComponent />
      <LocationPriceComparison />
      {/*<AboutSection
      <FoodCollection />
       />
      <div className="bg-gray-100">
        <Testimonials />
      </div>*/}
    </div>
  );
}
