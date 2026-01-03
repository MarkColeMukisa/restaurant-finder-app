import React from 'react';

const ServiceCard = ({ icon, title, description, iconColor }) => (
  <div className="p-8 rounded-2xl border hover:border-blue-500/50 transition-colors group">
    <div className={`mb-6 p-4 rounded-xl w-fit group-hover:scale-110 transition-transform ${iconColor}`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const HowItWorks = () => {
  const services = [
    {
      title: "Software Development",
      description: "We build and distribute world-class software: Web Apps, Mobile Apps, Desktop Apps, and Custom Systems.",
      iconColor: "text-blue-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code h-8 w-8">
          <path d="m16 18 6-6-6-6" />
          <path d="m8 6-6 6 6 6" />
        </svg>
      )
    },
    {
      title: "Training & Mentorship",
      description: "We cultivate elite talent through rigorous training and mentorship programs, ensuring our team is the best.",
      iconColor: "text-purple-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap h-8 w-8">
          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
          <path d="M22 10v6" />
          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
        </svg>
      )
    },
    {
      title: "Research & Development",
      description: "We never stop learning. From React to Golang, we stay ahead of the curve to deliver cutting-edge solutions.",
      iconColor: "text-yellow-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb h-8 w-8">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      )
    }
  ];

  return (
    <>
    {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How iT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most loved restaurants in your area. From local favorites to award-winning cuisine.
          </p>
        </div>
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8 p-6">
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
    </>
  );
};

export default HowItWorks;