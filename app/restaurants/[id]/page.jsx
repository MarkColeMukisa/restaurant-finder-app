"use client";

import { useParams } from 'next/navigation';
import { popularRestaurants } from '@/assets/assets';
import HeaderSection from './_components/HeaderSection';
import HeroSection from './_components/RestaurantHeroSection';
import Overview from './_components/overview';

export default function RestaurantDetailPage() {
  const params = useParams();
  const restaurantId = params.id;

  // Find restaurant by ID
  const restaurant = popularRestaurants.find(r => r.id === parseInt(restaurantId));

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Restaurant Not Found</h1>
          <p className="text-gray-600">The restaurant you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeaderSection restaurant={restaurant} />

      <HeroSection restaurant={restaurant} />

      <Overview restaurant={restaurant} />
    </div>
  );
}
