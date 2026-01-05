import React, { useState } from 'react';
import Image from 'next/image';
import { popularRestaurants } from '@/assets/assets';

const HeroSection = ({ restaurant }) => {
  const [mainImage, setMainImage] = useState(restaurant?.image || '');

  // Use restaurant's images array if available, otherwise create array from other restaurants
  const images = restaurant?.images && restaurant.images.length > 0 
    ? restaurant.images 
    : [
        restaurant?.image,
        popularRestaurants[1]?.image,
        popularRestaurants[2]?.image,
        popularRestaurants[3]?.image,
      ].filter(Boolean);

  if (!restaurant) return null;

  return (
    <div className="flex flex-col items-center space-y-4 mt-20 px-4">
      {/* Main Image */}
      <div className="w-full max-w-3xl">
        <img
          src={mainImage}
          alt="Main restaurant image"
          className="w-full rounded-lg object-cover h-96"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 max-w-3xl gap-4 w-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setMainImage(image)}
            className="rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;