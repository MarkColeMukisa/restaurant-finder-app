"use client";
import React from 'react';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

const ExclusiveOffers = () => {
  const exclusiveOffers = [
    {
      id: 1,
      discount: '25% OFF',
      title: 'Summer Escape Package',
      description: 'Enjoy a complimentary night and daily breakfast',
      expiryDate: 'Aug 31',
      daysLeft: 15,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      badge: 'Popular'
    },
    {
      id: 2,
      discount: '20% OFF',
      title: 'Romantic Getaway',
      description: 'Special couples package including spa treatment',
      expiryDate: 'Sep 20',
      daysLeft: 35,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      badge: 'Limited'
    },
    {
      id: 3,
      discount: '30% OFF',
      title: 'Luxury Retreat',
      description: 'Book 60 days in advance and save on your stay at any of our luxury properties worldwide.',
      expiryDate: 'Sep 25',
      daysLeft: 40,
      image: 'https://images.unsplash.com/photo-1540959733332-0b10da0fdcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      badge: 'Premium'
    }
  ];

  const getDaysLeftColor = (daysLeft) => {
    if (daysLeft <= 5) return 'text-red-600 bg-red-50';
    if (daysLeft <= 15) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Offers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Limited time deals and special packages from top restaurants. Don't miss out on these amazing savings!
          </p>
        </div>

        {/* Offers Grid - 3 cards per row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exclusiveOffers.map((offer) => (
            <div
              key={offer.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Image Background */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
                    {offer.discount}
                  </div>
                </div>

                {/* Limited Badge */}
                {offer.badge && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      {offer.badge}
                    </div>
                  </div>
                )}
              </div>

              {/* Text Content Below Image */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {offer.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {offer.description}
                </p>

                {/* Expiry Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Expires {offer.expiryDate}</span>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getDaysLeftColor(offer.daysLeft)}`}>
                    <Clock className="w-4 h-4" />
                    <span>{offer.daysLeft} days left</span>
                  </div>
                </div>

                {/* View Offer Button */}
                <button className="w-full group/btn bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                  <Tag className="w-4 h-4" />
                  <span>View Offers</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffers;