import React from 'react';
import { Search, MessageSquare, Utensils } from 'lucide-react';

const ServiceCard = ({ icon, title, description, iconColor }) => (
  <div className="p-8 rounded-2xl border bg-white hover:border-orange-500/50 hover:shadow-xl transition-all duration-300 group">
    <div className={`mb-6 p-4 rounded-xl w-fit group-hover:scale-110 transition-transform bg-orange-50 ${iconColor}`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors uppercase">{title}</h3>
    <p className="text-gray-600 leading-relaxed font-medium">{description}</p>
  </div>
);

const HowItWorks = () => {
  const services = [
    {
      title: "Discover Nearby",
      description: "Instantly find top-rated restaurants, hidden gems, and local favorites tailored to your location and taste.",
      iconColor: "text-orange-600",
      icon: <Search className="h-8 w-8" />
    },
    {
      title: "Compare & Choose",
      description: "Dive into detailed menus, high-quality photos, and authentic reviews from our vibrant foodie community.",
      iconColor: "text-red-600",
      icon: <MessageSquare className="h-8 w-8" />
    },
    {
      title: "Enjoy The Experience",
      description: "Book your table in seconds or order directly. A seamless journey from craving to first bite.",
      iconColor: "text-orange-500",
      icon: <Utensils className="h-8 w-8" />
    }
  ];

  return (
    <div className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Works</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-600 to-red-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Your journey to the perfect meal is just three simple steps away. Fast, intuitive, and always delicious.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              iconColor={service.iconColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;