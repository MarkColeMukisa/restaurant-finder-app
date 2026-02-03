"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Utensils, Clock, X, ChevronDown, Grid3X3, List, Map, Sliders, Search } from 'lucide-react';
import { popularRestaurants } from '@/assets/assets';

const RestaurantsPage = () => {
  const [searchData, setSearchData] = useState({
    cuisine: '',
    location: ''
  });
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: [],
    priceRange: [],
    rating: null,
    meals: [],
    dietary: [],
    amenities: [],
    services: []
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'rating', 'price'

  const cuisines = ['Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 'American', 'Thai', 'Mediterranean'];
  const priceRanges = ['$', '$$', '$$$', '$$$$'];
  const ratings = [4.5, 4.0, 3.5, 3.0];
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Snacks', 'Desserts'];
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-free', 'Keto', 'Halal', 'Kosher'];
  const amenities = ['WiFi', 'Parking', 'Outdoor Seating', 'Private Rooms', 'Bar', 'Live Music'];
  const services = ['Delivery', 'Takeout', 'Dine-in', 'Reservations', 'Online Booking'];
  const popularCuisines = ['Italian', 'Pizza', 'Sushi', 'Burgers', 'Indian', 'Desserts'];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchData);
  };

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let results = popularRestaurants.filter(restaurant => {
      if (selectedFilters.cuisine.length > 0) {
        if (!selectedFilters.cuisine.includes(restaurant.cuisine)) {
          return false;
        }
      }

      if (selectedFilters.priceRange.length > 0) {
        if (!selectedFilters.priceRange.includes(restaurant.price)) {
          return false;
        }
      }

      if (selectedFilters.rating) {
        if (restaurant.rating < selectedFilters.rating) {
          return false;
        }
      }

      return true;
    });

    // Sort
    if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price') {
      results.sort((a, b) => a.price.length - b.price.length);
    }

    return results;
  }, [selectedFilters, sortBy]);

  // Handle filter changes
  const toggleCuisineFilter = (cuisine) => {
    setSelectedFilters(prev => ({
      ...prev,
      cuisine: prev.cuisine.includes(cuisine)
        ? prev.cuisine.filter(c => c !== cuisine)
        : [...prev.cuisine, cuisine]
    }));
  };

  const togglePriceFilter = (price) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange.includes(price)
        ? prev.priceRange.filter(p => p !== price)
        : [...prev.priceRange, price]
    }));
  };

  const setRatingFilter = (rating) => {
    setSelectedFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? null : rating
    }));
  };

  const toggleMealFilter = (meal) => {
    setSelectedFilters(prev => ({
      ...prev,
      meals: prev.meals.includes(meal)
        ? prev.meals.filter(m => m !== meal)
        : [...prev.meals, meal]
    }));
  };

  const toggleDietaryFilter = (dietary) => {
    setSelectedFilters(prev => ({
      ...prev,
      dietary: prev.dietary.includes(dietary)
        ? prev.dietary.filter(d => d !== dietary)
        : [...prev.dietary, dietary]
    }));
  };

  const toggleAmenitiesFilter = (amenity) => {
    setSelectedFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const toggleServicesFilter = (service) => {
    setSelectedFilters(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      cuisine: [],
      priceRange: [],
      rating: null,
      meals: [],
      dietary: [],
      amenities: [],
      services: []
    });
  };

  const activeFilterCount = selectedFilters.cuisine.length + selectedFilters.priceRange.length + (selectedFilters.rating ? 1 : 0) + selectedFilters.meals.length + selectedFilters.dietary.length + selectedFilters.amenities.length + selectedFilters.services.length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Search Section - Compact Hero */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
              Find Restaurants
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-300">
              Search by cuisine or location
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 max-w-5xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {/* Cuisine Dropdown */}
                <div className="flex-1 min-w-0">
                  <div className="relative">
                    <Utensils className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 flex-shrink-0" />
                    <select
                      value={searchData.cuisine}
                      onChange={(e) => setSearchData(prev => ({ ...prev, cuisine: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 text-xs sm:text-sm"
                    >
                      <option value="">Select cuisine</option>
                      {cuisines.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none flex-shrink-0" />
                  </div>
                </div>

                {/* Location Input */}
                <div className="flex-1 min-w-0">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={searchData.location}
                      onChange={(e) => setSearchData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City or address"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 placeholder-gray-500 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 sm:px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Mobile Filter Button - Left Side */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden p-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex-shrink-0"
              title="Open filters"
            >
              <Sliders className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                <span className="font-semibold text-gray-900">{filteredRestaurants.length}</span>
                <span className="hidden xs:inline"> restaurants found</span>
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                <option value="popular">Popular</option>
                <option value="rating">Rated</option>
                <option value="price">Price</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1 hidden sm:flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
                  title="Grid view"
                >
                  <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
                  title="List view"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        ></div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          
          {/* Left Sidebar Filters - Slide in from left on mobile */}
          <div className={`fixed lg:relative left-0 top-20 h-[calc(100vh-5rem)] lg:h-auto lg:top-0 w-64 lg:w-auto lg:col-span-1 bg-white lg:rounded-lg lg:shadow-sm z-40 transition-transform duration-300 ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:translate-x-0 overflow-y-auto`}>
            <div className="p-4 sm:p-6 lg:p-6 space-y-6">
              {/* Close button for mobile */}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Filter Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 pt-10 lg:pt-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-600 hover:text-red-700 font-medium hover:underline"
                  >
                    Clear ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* Cuisine Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-red-600" />
                  Cuisine
                </h4>
                <div className="space-y-2">
                  {cuisines.map(cuisine => (
                    <label key={cuisine} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.cuisine.includes(cuisine)}
                        onChange={() => toggleCuisineFilter(cuisine)}
                        className="w-4 h-4 text-red-600 rounded cursor-pointer"
                      />
                      <span className="text-gray-700 text-sm">{cuisine}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Price Range
                </h4>
                <div className="space-y-2">
                  {priceRanges.map(price => (
                    <label key={price} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.priceRange.includes(price)}
                        onChange={() => togglePriceFilter(price)}
                        className="w-4 h-4 text-green-600 rounded cursor-pointer"
                      />
                      <span className="text-gray-700 text-sm">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Rating
                </h4>
                <div className="space-y-2">
                  {ratings.map(rating => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(rating)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                        selectedFilters.rating === rating
                          ? 'bg-yellow-50 text-yellow-700 border border-yellow-300'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      {rating}+ Stars
                    </button>
                  ))}
                </div>
              </div>

              {/* Meals Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Meals
                </h4>
                <div className="space-y-2">
                  {meals.map(meal => (
                    <label key={meal} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.meals.includes(meal)}
                        onChange={() => toggleMealFilter(meal)}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                      <span className="text-gray-700 text-sm">{meal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dietary Options Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-purple-600" />
                  Dietary
                </h4>
                <div className="space-y-2">
                  {dietaryOptions.map(option => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.dietary.includes(option)}
                        onChange={() => toggleDietaryFilter(option)}
                        className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                      />
                      <span className="text-gray-700 text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  Amenities
                </h4>
                <div className="space-y-2">
                  {amenities.map(amenity => (
                    <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.amenities.includes(amenity)}
                        onChange={() => toggleAmenitiesFilter(amenity)}
                        className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                      />
                      <span className="text-gray-700 text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Services Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Services
                </h4>
                <div className="space-y-2">
                  {services.map(service => (
                    <label key={service} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.services.includes(service)}
                        onChange={() => toggleServicesFilter(service)}
                        className="w-4 h-4 text-orange-600 rounded cursor-pointer"
                      />
                      <span className="text-gray-700 text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Restaurants Content */}
          <div className="lg:col-span-4">
            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.cuisine.map(c => (
                    <button
                      key={c}
                      onClick={() => toggleCuisineFilter(c)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      {c}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                  {selectedFilters.priceRange.map(p => (
                    <button
                      key={p}
                      onClick={() => togglePriceFilter(p)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors"
                    >
                      {p}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                  {selectedFilters.rating && (
                    <button
                      onClick={() => setRatingFilter(selectedFilters.rating)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs sm:text-sm font-medium hover:bg-yellow-200 transition-colors"
                    >
                      {selectedFilters.rating}★
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {selectedFilters.meals.map(m => (
                    <button
                      key={m}
                      onClick={() => toggleMealFilter(m)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      {m}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                  {selectedFilters.dietary.map(d => (
                    <button
                      key={d}
                      onClick={() => toggleDietaryFilter(d)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium hover:bg-purple-200 transition-colors"
                    >
                      {d}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                  {selectedFilters.amenities.map(a => (
                    <button
                      key={a}
                      onClick={() => toggleAmenitiesFilter(a)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-medium hover:bg-indigo-200 transition-colors"
                    >
                      {a}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                  {selectedFilters.services.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleServicesFilter(s)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-medium hover:bg-orange-200 transition-colors"
                    >
                      {s}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Restaurants Grid/List */}
            {filteredRestaurants.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-5'}>
                {filteredRestaurants.map(restaurant => (
                  <div
                    key={restaurant.id}
                    className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 ${
                      viewMode === 'list' ? 'flex gap-4 p-4' : ''
                    }`}
                  >
                    {/* Image Container */}
                    <div className={`relative overflow-hidden flex-shrink-0 ${viewMode === 'list' ? 'w-56 h-44 rounded-lg' : 'h-48'}`}>
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          restaurant.isOpen 
                            ? 'bg-green-600' 
                            : 'bg-red-600'
                        }`}>
                          {restaurant.isOpen ? 'Open' : 'Closed'}
                        </div>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-white px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-md">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-gray-900">{restaurant.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${viewMode === 'grid' ? 'p-4' : 'flex-1 flex flex-col justify-between'}`}>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">{restaurant.name}</h3>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3 flex-wrap">
                          <span className="text-red-600 font-medium">{restaurant.cuisine}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-green-600 font-medium">{restaurant.price}</span>
                        </div>

                        <div className={`${viewMode === 'list' ? 'space-y-1.5' : 'space-y-2'} text-sm text-gray-600 mb-4`}>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>{restaurant.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>{restaurant.deliveryTime}</span>
                          </div>
                        </div>
                      </div>

                      {restaurant.promotion && (
                        <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200 text-xs font-semibold text-blue-700 text-center">
                          {restaurant.promotion}
                        </div>
                      )}
                      
                      <Link href={`/restaurants/${restaurant.id}`} className="w-full mt-3">
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md text-sm">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium mb-2">No restaurants found</p>
                <p className="text-gray-400 text-sm mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
