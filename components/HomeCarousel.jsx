import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Bookmark } from "lucide-react"; // Assuming you're using Lucide React icons for the bookmark

// Sample data for trending food items
const trendingFoodItems = [
  { name: "Beans", image: "/pepper.avif", price: "$5.99" },
  { name: "Rice", image: "/pepper.avif", price: "$3.99" },
  { name: "Potato", image: "/pepper.avif", price: "$2.99" },
  { name: "Tomato", image: "/pepper.avif", price: "$1.99" },
  { name: "Chicken", image: "/pepper.avif", price: "$8.99" },
];

export function HomeCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-2xl"
    >
      <CarouselContent>
        {trendingFoodItems.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-full mb-4"
                  />
                  <span className="text-xl font-semibold">{item.name}</span>
                  <span className="text-lg text-gray-600">{item.price}</span>
                  <button className="mt-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}