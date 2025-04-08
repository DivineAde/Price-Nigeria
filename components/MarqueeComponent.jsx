"use client"

import { useState, useEffect } from "react";

export default function Marquee() {
  const [marketAlerts, setMarketAlerts] = useState([
    {
      id: 1,
      type: "shortage",
      item: "Tomatoes",
      price: "₦1,800 per basket",
      reason: "Heavy rainfall in northern regions affecting harvest",
      icon: "🍅",
    },
    {
      id: 2,
      type: "surplus",
      item: "Yams",
      price: "₦850 per tuber",
      reason: "Excellent harvest season in the Middle Belt",
      icon: "🍠",
    },
    {
      id: 3,
      type: "price-increase",
      item: "Rice",
      price: "₦48,000 per bag",
      reason: "Import restrictions and high demand",
      icon: "🍚",
    },
    {
      id: 4,
      type: "seasonal-peak",
      item: "Mangoes",
      price: "₦3,500 per crate",
      reason: "Peak season in southern states",
      icon: "🥭",
    },
    {
      id: 5,
      type: "weather-alert",
      item: "Cassava",
      price: "₦25,000 per bag",
      reason: "Drought affecting harvest in southeastern regions",
      icon: "🌱",
    },
    {
      id: 6,
      type: "surplus",
      item: "Corn",
      price: "₦350 per cob",
      reason: "Abundant rainfall in central growing regions",
      icon: "🌽",
    },
    {
      id: 7,
      type: "price-drop",
      item: "Oranges",
      price: "₦2,500 per bag",
      reason: "Bumper harvest in Benue state",
      icon: "🍊",
    },
    {
      id: 8,
      type: "seasonal-peak",
      item: "Watermelon",
      price: "₦1,200 each",
      reason: "Peak season in northern Nigeria",
      icon: "🍉",
    },
  ]);

  // Get alert type color
  const getAlertTypeColor = (type) => {
    switch (type) {
      case "shortage":
        return "bg-red-100 border-red-500 text-red-800";
      case "surplus":
        return "bg-green-100 border-green-500 text-green-800";
      case "price-increase":
        return "bg-amber-100 border-amber-500 text-amber-800";
      case "price-drop":
        return "bg-blue-100 border-blue-500 text-blue-800";
      case "seasonal-peak":
        return "bg-purple-100 border-purple-500 text-purple-800";
      case "weather-alert":
        return "bg-orange-100 border-orange-500 text-orange-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

  // Get human-readable alert type
  const getAlertTypeLabel = (type) => {
    switch (type) {
      case "shortage":
        return "Shortage";
      case "surplus":
        return "Surplus";
      case "price-increase":
        return "Price Increase";
      case "price-drop":
        return "Price Drop";
      case "seasonal-peak":
        return "In Season";
      case "weather-alert":
        return "Weather Alert";
      default:
        return "Market Alert";
    }
  };

  return (
    <div className="bg-slate-50">
      <main className="py-8">
        {/* Market Alert Ticker */}
        <div className="relative overflow-hidden bg-white shadow-md border border-green-200 mb-10">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

          <div className="ticker-container py-4 overflow-hidden">
            <div className="ticker flex animate-ticker">
              {marketAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`ticker-item flex-shrink-0 mx-3 px-4 py-3 rounded-lg border-l-4 shadow-sm transition-all hover:shadow-md ${getAlertTypeColor(
                    alert.type
                  )}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{alert.icon}</span>
                    <div>
                      <div className="flex items-center">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-white bg-opacity-50 mr-2">
                          {getAlertTypeLabel(alert.type)}
                        </span>
                        <h3 className="font-bold">{alert.item}</h3>
                      </div>
                      <p className="text-sm">{alert.price}</p>
                      <p className="text-xs opacity-75">{alert.reason}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Duplicate alerts for seamless looping */}
              {marketAlerts.map((alert) => (
                <div
                  key={`duplicate-${alert.id}`}
                  className={`ticker-item flex-shrink-0 mx-3 px-4 py-3 rounded-lg border-l-4 shadow-sm transition-all hover:shadow-md ${getAlertTypeColor(
                    alert.type
                  )}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{alert.icon}</span>
                    <div>
                      <div className="flex items-center">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-white bg-opacity-50 mr-2">
                          {getAlertTypeLabel(alert.type)}
                        </span>
                        <h3 className="font-bold">{alert.item}</h3>
                      </div>
                      <p className="text-sm">{alert.price}</p>
                      <p className="text-xs opacity-75">{alert.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Content 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              Regional Insights
            </h2>
            <p className="text-gray-700">
              Our market alerts track conditions across Nigeria's diverse
              agricultural regions, from the northern states to the coastal
              areas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              Climate Impact
            </h2>
            <p className="text-gray-700">
              Weather patterns and climate changes significantly affect crop
              yields and market prices across Nigeria's agricultural sector.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              Seasonal Calendar
            </h2>
            <p className="text-gray-700">
              Our alerts help you track which products are in season, allowing
              for better planning and more economical purchasing.
            </p>
          </div>
        </div>*/}
      </main>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-ticker {
          animation: ticker 30s linear infinite;
        }

        .ticker-container:hover .animate-ticker {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
