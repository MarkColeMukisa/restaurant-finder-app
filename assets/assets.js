import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export  const popularDestinations = [
    {
      id: 1,
      name: 'Downtown District',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurants: 85,
      rating: 4.7,
      description: 'Trendy restaurants & rooftop bars',
      distance: 'City Center',
      featured: ['Italian', 'Fine Dining', 'Asian Fusion']
    },
    {
      id: 2,
      name: 'Waterfront Area',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurants: 42,
      rating: 4.5,
      description: 'Seafood with ocean views',
      distance: '2 miles',
      featured: ['Seafood', 'Mediterranean', 'Wine Bars']
    },
    {
      id: 3,
      name: 'Historic Quarter',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurants: 63,
      rating: 4.6,
      description: 'Charming cafes & traditional cuisine',
      distance: '1.5 miles',
      featured: ['French', 'Cafes', 'Traditional']
    },
    {
      id: 4,
      name: 'Arts District',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurants: 38,
      rating: 4.4,
      description: 'Hip eateries & craft cocktails',
      distance: '3 miles',
      featured: ['Fusion', 'Cocktail Bars', 'Vegetarian']
    },

  ]

  export const categories = [
    {
      id: 'all',
      name: 'All',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '250+',
      bgColor: 'bg-gradient-to-br from-gray-500 to-gray-600'
    },
    {
      id: 'italian',
      name: 'Italian',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '45',
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-500'
    },
    {
      id: 'japanese',
      name: 'Japanese',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '32',
      bgColor: 'bg-gradient-to-br from-red-500 to-pink-500'
    },
    {
      id: 'chinese',
      name: 'Chinese',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '38',
      bgColor: 'bg-gradient-to-br from-red-600 to-orange-500'
    },
    {
      id: 'indian',
      name: 'Indian',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '25',
      bgColor: 'bg-gradient-to-br from-yellow-500 to-orange-500'
    },
    {
      id: 'american',
      name: 'American',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '42',
      bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-500'
    },
    {
      id: 'mediterranean',
      name: 'Mediterranean',
      image: 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '22',
      bgColor: 'bg-gradient-to-br from-teal-500 to-blue-500'
    },
    {
      id: 'vegetarian',
      name: 'Vegetarian',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '35',
      bgColor: 'bg-gradient-to-br from-green-600 to-emerald-600'
    },
    {
      id: 'seafood',
      name: 'Seafood',
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '29',
      bgColor: 'bg-gradient-to-br from-blue-400 to-cyan-500'
    },
    {
      id: 'desserts',
      name: 'Desserts',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '31',
      bgColor: 'bg-gradient-to-br from-pink-400 to-rose-500'
    }
  ];

  export const popularRestaurants = [
    {
      id: 1,
      name: 'Bella Vista',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'Italian',
      rating: 4.7,
      reviews: 284,
      price: '$$$',
      deliveryTime: '25-35 min',
      distance: '0.8 miles',
      location: 'Downtown',
      isOpen: true,
      promotion: 'Free delivery',
      featured: ['Pasta', 'Wine', 'Romantic']
    },
    {
      id: 2,
      name: 'Sakura Sushi',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'Japanese',
      rating: 4.5,
      reviews: 156,
      price: '$$',
      deliveryTime: '30-40 min',
      distance: '1.2 miles',
      location: 'Midtown',
      isOpen: true,
      promotion: '20% off first order',
      featured: ['Sushi', 'Ramen', 'Fresh']
    },
    {
      id: 3,
      name: 'Golden Dragon',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'Chinese',
      rating: 4.4,
      reviews: 223,
      price: '$$',
      deliveryTime: '35-45 min',
      distance: '1.5 miles',
      location: 'Chinatown',
      isOpen: true,
      promotion: 'Family combo deal',
      featured: ['Dim Sum', 'Noodles', 'Authentic']
    },
    {
      id: 4,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: 167,
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer']
    },
       {
      id: 5,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: 167,
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer']
    },
       {
      id: 6,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: 167,
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer']
    },
       {
      id: 7,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: 167,
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer']
    },
       {
      id: 8,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: 167,
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer']
    },
       {
      id: 9,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: 167,
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer']
    },
       {
      id: 10,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: 167,
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer']
    },
       {
      id: 11,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: 167,
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer']
    },
    {
      id: 12,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: 167,
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer']
    },
    {
      id: 13,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: 167,
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer']
    }
    
  ];

  export const popularMenus = [
    {
      id: 1,
      name: 'Truffle Mushroom Pasta',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'Bella Vista',
      price: '$24',
      rating: 4.8,
      prepTime: '20-25 min',
      category: 'Main Course',
      calories: '420 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: false,
      description: 'Creamy pasta with wild mushrooms and black truffle',
      tags: ['Signature', 'Creamy', 'Gourmet']
    },
    {
      id: 2,
      name: 'Dragon Roll Sushi',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'Sakura Sushi',
      price: '$18',
      rating: 4.7,
      prepTime: '15-20 min',
      category: 'Sushi',
      calories: '320 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Eel, avocado, and cucumber with spicy mayo',
      tags: ['Spicy', 'Fresh', 'Best Seller']
    },
    {
      id: 3,
      name: 'Birria Tacos',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '$16',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
    {
      id: 4,
      name: 'Birria Tacos',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '$16',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
    {
      id: 5,
      name: 'Birria Tacos',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '$16',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
    {
      id: 6,
      name: 'Birria Tacos',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '$16',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
    {
      id: 7,
      name: 'Butter Chicken',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'Spice Route',
      price: '$22',
      rating: 4.8,
      prepTime: '25-35 min',
      category: 'Curry',
      calories: '410 cal',
      isVegetarian: false,
      isSpicy: false,
      isPopular: true,
      description: 'Tender chicken in rich tomato butter sauce',
      tags: ['Creamy', 'Aromatic', 'Best Seller']
    },
    {
      id: 8,
      name: 'Birria Tacos',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '$16',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
    {
      id: 9,
      name: 'Birria Tacos',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '$16',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
    {
      id: 10,
      name: 'Birria Tacos',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '$16',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
    {
      id: 11,
      name: 'Birria Tacos',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '$16',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
    {
      id: 12,
      name: 'Birria Tacos',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '$16',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
    {
      id: 13,
      name: 'Birria Tacos',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '$16',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
    {
      id: 14,
      name: 'Rolex',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      restaurant: 'El Fuego',
      price: '3',
      rating: 4.9,
      prepTime: '18-22 min',
      category: 'Tacos',
      calories: '380 cal',
      isVegetarian: false,
      isSpicy: true,
      isPopular: true,
      description: 'Slow-cooked beef tacos with consommé dip',
      tags: ['Trending', 'Hearty', 'Authentic']
    },
  ];

  export const linkSections = [
      {
        title: "Quick Links",
        links: ["Home", "Restaurants", "Menus", "Offers & Deals", "Contact Us", "FAQs"]
      },
      {
        title: "Need Help?",
        links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Support"]
      },
      {
        title: "For Restaurants",
        links: ["Partner with Us", "Add Your Restaurant", "Business Dashboard", "Marketing Solutions"]
      }
    ];

    export   const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

export const featuredItems = [
      {
        type: 'restaurant',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        name: 'Bella Vista',
        cuisine: 'Italian',
        price: 'UGX 20,000',
        location: 'Downtown',
        rating: 4.7,
        reviews: 284,
        distance: '0.8 miles',
        status: 'Open Now',
        isOpen: true,
        deliveryTime: '25-35 min',
        promotion: 'Free delivery'
      },
      {
        type: 'menu',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        name: 'Truffle Pasta',
        restaurant: 'Bella Vista',
        price: 'UGX 20,000',
        category: 'Main Course',
        rating: 4.8,
        prepTime: '20-25 min',
        isFeatured: true,
        calories: '420 cal',
        popular: true
      },
      {
        type: 'restaurant',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        name: 'Sakura Sushi',
        cuisine: 'Japanese',
        price: 'UGX 20,000',
        location: 'Midtown',
        rating: 4.5,
        reviews: 156,
        distance: '1.2 miles',
        status: 'Closes soon',
        isOpen: true,
        deliveryTime: '30-40 min',
        promotion: '20% off first order'
      },
      {
        type: 'menu',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        name: 'Avocado Roll',
        restaurant: 'Sakura Sushi',
        price: 'UGX 20,000',
        category: 'Appetizer',
        rating: 4.6,
        prepTime: '10-15 min',
        isFeatured: false,
        calories: '180 cal',
        popular: true
      }
    ];

    export  const popularCuisines = [
    'Italian', 'Japanese', 'Mexican', 'Chinese', 'Indian', 'Thai', 'American', 'Mediterranean'
  ];

  export const cardData = [
        {
            title: "Unlock Your Creative Flow",
            image: "https://images.unsplash.com/photo-1543487945-139a97f387d5?w=1200&auto=format&fit=crop&q=60",
        },
        {
            title: "Design Your Digital Future",
            image: "https://images.unsplash.com/photo-1529254479751-faeedc59e78f?w=1200&auto=format&fit=crop&q=60",
        },
        {
            title: "Build with Passion, Ship with Pride",
            image: "https://images.unsplash.com/photo-1618327907215-4e514efabd41?w=1200&auto=format&fit=crop&q=60",
        },
        {
            title: "Think Big, Code Smart",
            image: "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=1200&auto=format&fit=crop&q=60",
        },
    ];

  
