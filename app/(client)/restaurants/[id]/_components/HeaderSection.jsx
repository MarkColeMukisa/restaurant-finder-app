import React, { useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Clock, Phone, Share2, Heart } from 'lucide-react';

const HeaderSection = ({ restaurant }) => {

  return (
<div className="w-full border-b border-gray-200 bg-white mt-20">
  <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">

    {/* LEFT SIDE */}
    <div className="flex flex-col gap-2 w-full sm:w-auto">
      
      {/* Name */}
      <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
        {restaurant.name}
      </h1>

      {/* Info Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 flex-wrap">
        {/* Rating */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="font-semibold">{restaurant.rating}</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  i < Math.round(restaurant.rating)
                    ? "bg-green-600"
                    : "border border-green-600"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600">({restaurant.reviews?.length || 0})</span>
        </div>

        {/* Location */}
        <p className="text-xs sm:text-sm text-gray-700">
          {restaurant.location}
        </p>

        {/* Categories */}
        <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
          <span className="underline">{restaurant.cuisine}</span>
          <span>•</span>
          <span>{restaurant.price}</span>
        </div>

        {/* Languages */}
        {restaurant?.languages && restaurant.languages.length > 0 && (
          <div className="text-xs sm:text-sm flex items-center gap-2">
            <span className="text-gray-600">Languages:</span>
            <div className="flex flex-wrap gap-1">
              {restaurant.languages.map((lang, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

    {/* RIGHT SIDE ACTIONS */}
    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">

      <button className="flex items-center gap-2 border rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-100 flex-1 sm:flex-none justify-center">
        ⤴ Share
      </button>

      <button className="flex items-center gap-2 border rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-100 flex-1 sm:flex-none justify-center">
        ✎ Review
      </button>

      <button className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm hover:bg-gray-100">
        ♡ Save
      </button>
    </div>
  </div>
</div>

  );
};

export default HeaderSection;