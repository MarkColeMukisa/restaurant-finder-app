"use client";

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PopularDestinations from './PopularDestinations';
import { categories } from '@/assets/assets';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollContainerRef = useRef(null);

  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-7 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Cuisine</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover restaurants by your favorite cuisine types. Tap to explore curated collections.
          </p>
        </div>

        {/* Categories Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:scale-110 border border-gray-200 hidden lg:flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:scale-110 border border-gray-200 hidden lg:flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Categories Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 text-center group cursor-pointer"
                onClick={() => setActiveCategory(category.id)}
              >
                {/* Circular Image Container */}
                <div className="relative mb-4">
                  <div className={`w-24 h-24 rounded-full p-1 transition-all duration-300 transform group-hover:scale-110 ${
                    activeCategory === category.id 
                      ? `${category.bgColor} shadow-lg ring-4 ring-white ring-offset-2 ring-offset-slate-50 scale-110` 
                      : 'bg-white shadow-md group-hover:shadow-lg'
                  }`}>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  
                  {/* Active Indicator */}
                  {activeCategory === category.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full ring-2 ring-white"></div>
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <h3 className={`font-semibold transition-colors duration-200 ${
                    activeCategory === category.id ? 'text-blue-600' : 'text-gray-900 group-hover:text-gray-700'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm transition-colors duration-200 ${
                    activeCategory === category.id ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-600'
                  }`}>
                    {category.count} places
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator Dots - Mobile */}
          <div className="flex justify-center space-x-2 mt-8 lg:hidden">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 bg-gray-300 rounded-full"
              />
            ))}
          </div>
        </div>

        <PopularDestinations />
      </div>
    </section>
  );
};

export default Categories;