"use client";

import React from 'react';
import RestaurantCard from '@/components/RestaurantCard';

export default function AllRestaurantsPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Restaurants</h1>
        <p className="text-gray-600 mb-8">Browse all available restaurants with View Details button</p>
        <RestaurantCard />
      </div>
    </div>
  );
}
