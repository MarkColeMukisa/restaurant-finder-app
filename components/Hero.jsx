"use client";

import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Utensils, Clock, Heart, Shield, Users, Award } from 'lucide-react';
import { featuredItems, popularCuisines } from '@/assets/assets';


const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCuisine, setSearchCuisine] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === featuredItems.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredItems.length]);

  const currentItem = featuredItems[currentIndex];

  const nextItem = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(currentIndex === featuredItems.length - 1 ? 0 : currentIndex + 1);
      setIsAnimating(false);
    }, 400);
  };

  const prevItem = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(currentIndex === 0 ? featuredItems.length - 1 : currentIndex - 1);
      setIsAnimating(false);
    }, 400);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', { searchLocation, searchCuisine });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-100/20 via-transparent to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 lg:space-y-10">
            {/* Header Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award className="w-4 h-4" />
                Discover Premium Dining Experiences
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Exquisite Dining,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-600 mt-2">
                  Moments to Cherish
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl leading-relaxed">
                Explore the finest restaurants in your city. From Michelin-rated establishments to hidden culinary treasures,
                find your next extraordinary dining destination.
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto lg:mx-0">
              <form onSubmit={handleSearch} className="space-y-3">
                <div className="bg-white rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-0 sm:gap-0">
                    <div className="flex-1 flex items-center gap-3 px-4 py-3">
                      <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        placeholder="City or neighborhood..."
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm min-w-0 font-medium"
                      />
                    </div>
                    <div className="h-px sm:h-auto sm:w-px bg-amber-100"></div>
                    <div className="flex-1 flex items-center gap-3 px-4 py-3">
                      <Utensils className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <input
                        type="text"
                        value={searchCuisine}
                        onChange={(e) => setSearchCuisine(e.target.value)}
                        placeholder="Cuisine or restaurant..."
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm min-w-0 font-medium"
                      />
                    </div>
                    <div className="h-px sm:h-auto sm:w-px bg-amber-100"></div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-none sm:rounded-r-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-2 justify-center shadow-none hover:shadow-lg text-sm whitespace-nowrap flex-shrink-0"
                    >
                      <Search className="w-4 h-4 flex-shrink-0" />
                      <span className="hidden sm:inline">Search</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Popular Cuisines - Also Reduced */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 mt-3">
                <span className="text-xs text-gray-500 mr-1">Popular:</span>
                {popularCuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => setSearchCuisine(cuisine)}
                    className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {cuisine}
                  </button>
                )).reduce((prev, curr, index) => [
                  prev,
                  <span key={`dot-${index}`} className="text-gray-300 text-xs">•</span>,
                  curr
                ])}
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 lg:gap-12 pt-6">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                    <p className="text-gray-600 text-sm">Happy Customers</p>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-green-600 fill-current" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.8</div>
                    <p className="text-gray-600 text-sm">Average Rating</p>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <p className="text-gray-600 text-sm">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Card Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevItem}
              className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:scale-110 border border-gray-100"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextItem}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:scale-110 border border-gray-100"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main Card */}
            <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              } border border-gray-100 overflow-hidden`}>
              {/* Image Container */}
              <div className="relative">
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  className="w-full h-72 object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className={`px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm ${currentItem.type === 'restaurant'
                    ? currentItem.isOpen
                      ? 'bg-green-500/90 text-white'
                      : 'bg-red-500/90 text-white'
                    : currentItem.isFeatured
                      ? 'bg-orange-500/90 text-white'
                      : 'bg-blue-500/90 text-white'
                    }`}>
                    {currentItem.type === 'restaurant' ? currentItem.status : 'Featured'}
                  </div>
                  {currentItem.popular && (
                    <div className="bg-yellow-500/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                      Popular
                    </div>
                  )}
                </div>

                {/* Right Side Info */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{currentItem.rating}</span>
                  </div>
                  {currentItem.type === 'restaurant' && currentItem.promotion && (
                    <div className="bg-purple-500/95 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                      {currentItem.promotion}
                    </div>
                  )}
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {currentItem.type === 'restaurant' ? '🍽️ Restaurant' : '📋 Menu Item'}
                      </span>
                      {currentItem.type === 'restaurant' ? (
                        <span className="text-sm">{currentItem.deliveryTime}</span>
                      ) : (
                        <span className="text-sm">{currentItem.calories}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Below Image */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{currentItem.name}</h3>

                    {currentItem.type === 'restaurant' ? (
                      <>
                        <p className="text-gray-600 mb-2">
                          {currentItem.cuisine} • {currentItem.price} • {currentItem.location}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{currentItem.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{currentItem.reviews} reviews</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-600 mb-2">
                          {currentItem.restaurant} • {currentItem.category}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <span>{currentItem.price}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{currentItem.prepTime}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <button className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Dots Indicator */}
            <div className="flex justify-center space-x-3 mt-6">
              {featuredItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentIndex(index);
                      setIsAnimating(false);
                    }, 400);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;