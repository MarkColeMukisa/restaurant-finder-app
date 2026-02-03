"use client";
import React, { useState } from 'react';
import { Search, MapPin, Utensils } from 'lucide-react';

const SearchComponent = ({ SearchType = "Restaurant" }) => {
  const [searchQuery, setSearchQuery] = useState({
    location: '',
    cuisine: ''
  });

  const popularCuisines = [
    'Italian', 'Japanese', 'Mexican', 'Chinese', 'Indian',
    'Thai', 'American', 'Mediterranean'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search logic here
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">{SearchType}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search by location and cuisine to discover amazing dining experiences near you.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <input
                    type="text"
                    value={searchQuery.location}
                    onChange={(e) => setSearchQuery(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter your location or neighborhood..."
                    className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                  />
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3 border-l border-gray-200">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  <input
                    type="text"
                    value={searchQuery.cuisine}
                    onChange={(e) => setSearchQuery(prev => ({ ...prev, cuisine: e.target.value }))}
                    placeholder="What are you craving? (Italian, Sushi, etc.)"
                    className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center shadow-lg hover:shadow-xl"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Popular Cuisines */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-sm text-gray-500 mr-2">Popular:</span>
            {popularCuisines.map((cuisine, index) => (
              <React.Fragment key={cuisine}>
                <button
                  onClick={() => setSearchQuery(prev => ({ ...prev, cuisine }))}
                  className={`text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200`}
                >
                  {cuisine}
                </button>
                {index < popularCuisines.length - 1 && (
                  <span className="text-gray-300 mx-1">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchComponent;