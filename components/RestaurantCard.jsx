"use client";
import React, { useState } from 'react';
import { Star, MapPin, Clock, Heart, DollarSign, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import { popularRestaurants } from '../assets/assets';

const RestaurantCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 12;

  // Pagination logic
  const totalPages = Math.ceil(popularRestaurants.length / restaurantsPerPage);
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = popularRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Restaurants Grid - 4 cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Favorite Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-md">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                </button>

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    restaurant.isOpen 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {restaurant.isOpen ? 'Open Now' : 'Closed'}
                  </div>
                </div>

                {/* Promotion Badge */}
                {restaurant.promotion && (
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      {restaurant.promotion}
                    </div>
                  </div>
                )}
              </div>

              {/* Restaurant Info */}
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                      <Utensils className="w-4 h-4 text-blue-500" />
                      <span>{restaurant.cuisine}</span>
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span>{restaurant.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg flex-shrink-0 ml-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{restaurant.rating}</span>
                  </div>
                </div>

                {/* Location & Delivery */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{restaurant.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>

                {/* Reviews */}
                <div className="text-xs text-gray-500 mb-3">
                  {restaurant.reviews} reviews • {restaurant.location}
                </div>

                {/* Featured Tags */}
                <div className="flex flex-wrap gap-1">
                  {restaurant.featured.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`w-12 h-12 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCard;