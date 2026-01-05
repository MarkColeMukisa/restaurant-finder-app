import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { popularRestaurants } from '@/assets/assets';

const RestaurantHeroSection = ({ restaurant }) => {
  const [mainImage, setMainImage] = useState(restaurant?.image || '');
  const [activeIndex, setActiveIndex] = useState(0);

  // Get gallery images from restaurant object or fallback to other restaurants
  const images = restaurant?.images && restaurant.images.length > 0 
    ? restaurant.images 
    : [
        restaurant?.image,
        popularRestaurants[1]?.image,
        popularRestaurants[2]?.image,
        popularRestaurants[3]?.image,
      ].filter(Boolean);

  if (!restaurant) return null;

  const handleThumbnailClick = (image, index) => {
    setMainImage(image);
    setActiveIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setMainImage(images[newIndex]);
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setMainImage(images[newIndex]);
    setActiveIndex(newIndex);
  };

  return (
    <div className="w-full bg-gray-50 mt-6">
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Main Image Section */}
        <div className="relative mb-6">
          <div className="relative w-full bg-gray-200 rounded-xl overflow-hidden shadow-lg">
            <img
              src={mainImage}
              alt="Main restaurant image"
              className="w-full h-80 md:h-96 lg:h-[500px] object-cover transition-opacity duration-300"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
              <div 
                className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / images.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="overflow-x-auto">
          <div className="flex gap-2 md:gap-3 pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(image, index)}
                className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                  activeIndex === index 
                    ? 'border-orange-600 shadow-lg scale-105' 
                    : 'border-transparent hover:border-gray-300'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover hover:opacity-80 transition-opacity"
                />
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeroSection;