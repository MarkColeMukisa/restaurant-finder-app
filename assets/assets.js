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
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551632786-fb3f32c4fd12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1504674900569-f3fb2991f5e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1555566999-5397f975edd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1555939594-58d7cb561091?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1537047902294-c1201df4bab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1494521174747-ba271e882ffe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1476124369162-f4978f60a8d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      ],
      cuisine: 'Italian',
      rating: 4.7,
      reviews: '284 reviews',
      price: '$$$',
      deliveryTime: '25-35 min',
      distance: '0.8 miles',
      location: 'Downtown',
      isOpen: true,
      promotion: 'Free delivery',
      featured: ['Pasta', 'Wine', 'Romantic'],
      features: {
        cuisines: ['Italian', 'Mediterranean', 'European'],
        mealTypes: ['Lunch', 'Dinner', 'Brunch'],
        specialDiets: ['Vegetarian options', 'Gluten-free options'],
        amenities: [
          'Accepts Credit Cards',
          'Digital Payments',
          'Family style',
          'Free Wifi',
          'Full Bar',
          'Live Music',
          'Non-smoking restaurant',
          'Outdoor Seating',
          'Parking Available',
          'Reservations',
          'Seating',
          'Serves Alcohol',
          'Table Service',
          'Takeout',
          'Wheelchair Accessible'
        ]
      },
      parking: [
        'Parking Available',
        'Free off-street parking',
        'Validated Parking'
      ],
      menu: [
        {
          id: 1,
          name: 'Spaghetti Carbonara',
          category: 'Pasta',
          description: 'Classic Italian pasta with creamy sauce, bacon, and parmesan',
          price: 18.99,
          image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 2,
          name: 'Margherita Pizza',
          category: 'Pizza',
          description: 'Fresh mozzarella, tomato sauce, basil, and olive oil',
          price: 15.99,
          image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 3,
          name: 'Risotto ai Funghi',
          category: 'Rice',
          description: 'Creamy risotto with wild mushrooms and truffle oil',
          price: 22.99,
          image: 'https://images.unsplash.com/photo-1611949186022-cce98ce8a4ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 4,
          name: 'Tiramisu',
          category: 'Dessert',
          description: 'Traditional Italian dessert with mascarpone and espresso',
          price: 9.99,
          image: 'https://images.unsplash.com/photo-1571115764595-644a12c7cb25?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 5,
          name: 'Panna Cotta',
          category: 'Dessert',
          description: 'Silky smooth cream dessert with berry compote',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1488477181946-85a2fdeedd0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 6,
          name: 'Fettuccine Alfredo',
          category: 'Pasta',
          description: 'Ribbon pasta with rich creamy parmesan sauce',
          price: 17.99,
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        }
      ],
      reviews: [
        {
          id: 1,
          author: 'Maria Johnson',
          rating: 5,
          date: '2024-12-28',
          title: 'Absolutely Fantastic!',
          text: 'Best Italian food I have ever had! The pasta was perfectly cooked and the sauce was divine. The ambiance was romantic and the service was impeccable. Highly recommend!',
          helpful: 45
        },
        {
          id: 2,
          author: 'James Wilson',
          rating: 4,
          date: '2024-12-20',
          title: 'Great Experience',
          text: 'Had a wonderful evening with my family. The food was excellent and the staff was very attentive. Only minor issue was the wait time during peak hours.',
          helpful: 28
        },
        {
          id: 3,
          author: 'Emma Davis',
          rating: 5,
          date: '2024-12-15',
          title: 'Perfect for Special Occasions',
          text: 'Celebrated our anniversary here and it was perfect. The chef prepared a special menu for us and everything was incredible. Will definitely come back!',
          helpful: 52
        },
        {
          id: 4,
          author: 'Robert Brown',
          rating: 4,
          date: '2024-12-10',
          title: 'Solid Choice',
          text: 'Good food and decent prices. The tiramisu was amazing. Service could be a bit faster, but overall a good dining experience.',
          helpful: 19
        },
        {
          id: 5,
          author: 'Sarah Martinez',
          rating: 5,
          date: '2024-12-05',
          title: 'Worth Every Penny',
          text: 'Took my date here and she loved it. The presentation of dishes was beautiful and taste was exceptional. The wine pairing suggestions were spot on.',
          helpful: 67
        },
        {
          id: 6,
          author: 'Michael Taylor',
          rating: 3,
          date: '2024-11-28',
          title: 'Good but Expensive',
          text: 'Food quality is good but prices are quite high. The portion sizes could be bigger. Good for special occasions but not for regular dining.',
          helpful: 34
        }
      ],
      dressCode: 'Smart Casual',
      averageCost: '$25-50 per person',
      paymentMethods: ['Credit Card', 'Debit Card', 'Digital Wallet', 'Cash'],
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-free'],
      reservationPolicy: 'Recommended for groups of 6+. Accepts walk-ins with possible wait during peak hours.',
      languages: ['English', 'Italian', 'Spanish']
    },
    {
      id: 2,
      name: 'Sakura Sushi',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1564489551768-f62db3f74ecc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1580959375944-abd0e72ada4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1570973957440-6b80b54ae612?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1546068131-fac1268e35e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      ],
      cuisine: 'Japanese',
      rating: 4.5,
      reviews: '156 reviews',
      price: '$$',
      deliveryTime: '30-40 min',
      distance: '1.2 miles',
      location: 'Midtown',
      isOpen: true,
      promotion: '20% off first order',
      featured: ['Sushi', 'Ramen', 'Fresh'],
      closing: '11:00 PM',
      features: {
        cuisines: ['Japanese', 'Asian Fusion', 'East Asian'],
        mealTypes: ['Lunch', 'Dinner', 'Drinks'],
        specialDiets: ['Vegetarian options', 'Gluten-free options'],
        amenities: [
          'Accepts Credit Cards',
          'Digital Payments',
          'Free Wifi',
          'Mastercard',
          'Parking Available',
          'Reservations',
          'Seating',
          'Serves Alcohol',
          'Takeout',
          'Television',
          'Visa',
          'Wheelchair Accessible'
        ]
      },
      parking: [
        'Street Parking',
        'Parking Available'
      ],
      menu: [
        {
          id: 1,
          name: 'California Roll',
          category: 'Sushi',
          description: 'Crab, cucumber, avocado wrapped in rice and nori',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 2,
          name: 'Spicy Tuna Roll',
          category: 'Sushi',
          description: 'Fresh tuna with spicy mayo and jalapeños',
          price: 13.99,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 3,
          name: 'Tonkotsu Ramen',
          category: 'Ramen',
          description: 'Rich pork bone broth with tender chashu pork and egg',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1519194797361-ca92f30d8c93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 4,
          name: 'Edamame',
          category: 'Appetizer',
          description: 'Steamed soybeans with sea salt',
          price: 5.99,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 5,
          name: 'Miso Soup',
          category: 'Soup',
          description: 'Traditional soy-based soup with tofu and seaweed',
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 6,
          name: 'Green Tea Cheesecake',
          category: 'Dessert',
          description: 'Creamy cheesecake with green tea flavor',
          price: 7.99,
          image: 'https://images.unsplash.com/photo-1533134242443-742c1a666b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        }
      ],
      reviews: [
        {
          id: 1,
          author: 'Lisa Chen',
          rating: 5,
          date: '2024-12-27',
          title: 'Authentic and Delicious',
          text: 'Amazing sushi! The fish is fresh and the rice is perfectly prepared. The chef clearly knows what they are doing. Will definitely come back for more!',
          helpful: 58
        },
        {
          id: 2,
          author: 'David Lee',
          rating: 5,
          date: '2024-12-22',
          title: 'Best Ramen in Town',
          text: 'The tonkotsu ramen is absolutely incredible. The broth is rich and flavorful, the noodles are cooked perfectly. This place is a must-visit!',
          helpful: 73
        },
        {
          id: 3,
          author: 'Jennifer Park',
          rating: 4,
          date: '2024-12-18',
          title: 'Very Good Quality',
          text: 'Fresh ingredients and skilled preparation. The sushi rolls are beautiful and taste amazing. Service is friendly and quick. Only downside is it gets crowded.',
          helpful: 41
        },
        {
          id: 4,
          author: 'Kevin Anderson',
          rating: 5,
          date: '2024-12-12',
          title: 'Exceeded Expectations',
          text: 'First time trying authentic Japanese food here. Every dish was a delight. The miso soup, edamame, sushi - everything was perfect. Highly recommended!',
          helpful: 85
        },
        {
          id: 5,
          author: 'Rachel Wong',
          rating: 4,
          date: '2024-12-08',
          title: 'Great Value',
          text: 'Prices are reasonable for the quality. The portions are generous. Loved the variety of sushi rolls available. Will be returning soon.',
          helpful: 36
        },
        {
          id: 6,
          author: 'Tom Harris',
          rating: 3,
          date: '2024-11-30',
          title: 'Good but Sometimes Inconsistent',
          text: 'Usually great but had one visit where the sushi was not as fresh. Otherwise good food and nice atmosphere. Hope they maintain consistency.',
          helpful: 22
        }
      ],
      dressCode: 'Casual',
      averageCost: '$15-30 per person',
      paymentMethods: ['Credit Card', 'Debit Card', 'Digital Wallet', 'Cash'],
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-free'],
      reservationPolicy: 'Walk-ins welcome. Reservations recommended for groups of 8+ on weekends.',
      languages: ['English', 'Japanese', 'Mandarin']
    },
    {
      id: 3,
      name: 'Golden Dragon',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'Chinese',
      rating: 4.4,
      reviews: '223 Reviews',
      price: '$$',
      deliveryTime: '35-45 min',
      distance: '1.5 miles',
      location: 'Chinatown',
      isOpen: true,
      promotion: 'Family combo deal',
      featured: ['Dim Sum', 'Noodles', 'Authentic'],
      features: [
        'WiFi',
        'Delivery',
        'Dine-in',
        'Takeout',
        'Reservations',
        'Tea Selection',
        'Parking Available',
        'Family Friendly',
        'Private Dining Rooms',
        'Large Parties Welcome'
      ]
    },
    {
      id: 4,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: '167 Reviews',
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer'],
      features: [
        'WiFi',
        'Delivery',
        'Takeout',
        'Dine-in',
        'Fast Service',
        'Outdoor Seating',
        'Pet Friendly',
        'Draft Beer',
        'Sports TV',
        'Casual Dining'
      ]
    },
       {
      id: 5,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: '167 Reviews',
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer'],
      features: [
        'WiFi',
        'Delivery',
        'Takeout',
        'Dine-in',
        'Fast Service',
        'Outdoor Seating',
        'Pet Friendly',
        'Draft Beer',
        'Sports TV',
        'Casual Dining'
      ]
    },
       {
      id: 6,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: '167 reviews',
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer'],
      features: [
        'WiFi',
        'Delivery',
        'Takeout',
        'Dine-in',
        'Fast Service',
        'Outdoor Seating',
        'Pet Friendly',
        'Draft Beer',
        'Sports TV',
        'Casual Dining'
      ]
    },
       {
      id: 7,
      name: 'Burger Haven',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      cuisine: 'American',
      rating: 4.3,
      reviews: '167 reviews',
      price: '$$',
      deliveryTime: '15-25 min',
      distance: '0.3 miles',
      location: 'University Row',
      isOpen: true,
      promotion: 'Buy 1 get 1 free',
      featured: ['Burgers', 'Fries', 'Craft Beer'],
      features: [
        'WiFi',
        'Delivery',
        'Takeout',
        'Dine-in',
        'Fast Service',
        'Outdoor Seating',
        'Pet Friendly',
        'Draft Beer',
        'Sports TV',
        'Casual Dining'
      ]
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
      featured: ['Burgers', 'Fries', 'Craft Beer'],
      features: [
        'WiFi',
        'Delivery',
        'Takeout',
        'Dine-in',
        'Fast Service',
        'Outdoor Seating',
        'Pet Friendly',
        'Draft Beer',
        'Sports TV',
        'Casual Dining'
      ]
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
      featured: ['Burgers', 'Fries', 'Craft Beer'],
      features: [
        'WiFi',
        'Delivery',
        'Takeout',
        'Dine-in',
        'Fast Service',
        'Outdoor Seating',
        'Pet Friendly',
        'Draft Beer',
        'Sports TV',
        'Casual Dining'
      ]
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
      featured: ['Burgers', 'Fries', 'Craft Beer'],
      features: [
        'WiFi',
        'Delivery',
        'Takeout',
        'Dine-in',
        'Fast Service',
        'Outdoor Seating',
        'Pet Friendly',
        'Draft Beer',
        'Sports TV',
        'Casual Dining'
      ]
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
      featured: ['Burgers', 'Fries', 'Craft Beer'],
      features: [
        'WiFi',
        'Delivery',
        'Takeout',
        'Dine-in',
        'Fast Service',
        'Outdoor Seating',
        'Pet Friendly',
        'Draft Beer',
        'Sports TV',
        'Casual Dining'
      ]
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

  
