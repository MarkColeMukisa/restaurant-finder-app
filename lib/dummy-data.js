export const restaurants = [
    {
        id: 1,
        name: "The Golden Olive",
        cuisine: ["Italian", "Mediterranean"],
        rating: 4.8,
        priceRange: "$40 - $80",
        distance: "0.5 km",
        description: "Authentic Italian pasta and wood-fired pizza in the heart of the city. Known for its extensive wine list and cozy atmosphere.",
        address: "123 Piazza St, City Center",
        openHours: "12:00 PM - 11:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
        websiteUrl: "https://golden-olive-demo.com",
        menuUrl: "https://golden-olive-demo.com/menu",
        phoneNumber: "+256 700 123456",
        email: "reservations@goldenolive.com",
        isVegetarianFriendly: true,
        isTouristFavorite: true,
        languages: ["English", "Italian", "Spanish"],
        images: [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517248135467-4c7ed9d42339?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800"
        ]
    },
    {
        id: 2,
        name: "Sakura Zen",
        cuisine: ["Japanese", "Sushi"],
        rating: 4.9,
        priceRange: "$80 - $150",
        distance: "1.2 km",
        description: "Experience the art of Omakase in a serene, minimalist setting. Fresh fish flown in daily from Tokyo.",
        address: "45 Blossom Ave, Uptown",
        openHours: "5:00 PM - 10:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
        isVegetarianFriendly: true,
        isTouristFavorite: false,
        languages: ["English", "Japanese"]
    },
    {
        id: 3,
        name: "El Toro Loco",
        cuisine: ["Mexican", "Tacos"],
        rating: 4.5,
        priceRange: "$15 - $30",
        distance: "0.8 km",
        description: "Vibrant Mexican street food with a modern twist. Famous for their spicy margaritas and taco Tuesdays.",
        address: "88 Fiesta Rd, Downtown",
        openHours: "11:00 AM - 1:00 AM",
        imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800",
        isVegetarianFriendly: true,
        isTouristFavorite: true,
        languages: ["English", "Spanish"]
    },
    {
        id: 4,
        name: "Le Petit Bistro",
        cuisine: ["French", "Breakfast"],
        rating: 4.7,
        priceRange: "$30 - $60",
        distance: "2.1 km",
        description: "A charming slice of Paris. Perfect for brunch with fluffy croissants, quiches, and cafe au lait.",
        address: "10 Rue de Cafe, Old Town",
        openHours: "8:00 AM - 4:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=800",
        isVegetarianFriendly: true,
        isTouristFavorite: false,
        languages: ["English", "French"]
    },
    {
        id: 5,
        name: "Curry House",
        cuisine: ["Indian", "Curry"],
        rating: 4.6,
        priceRange: "$20 - $40",
        distance: "1.5 km",
        description: "Aromatic spices and bold flavors. Offers a wide variety of vegetarian and vegan options.",
        address: "55 Spice Lane, Eastside",
        openHours: "11:30 AM - 10:30 PM",
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&q=80&w=800",
        isVegetarianFriendly: true,
        isTouristFavorite: true,
        languages: ["English", "Hindi"]
    },
    {
        id: 6,
        name: "Burger Joint",
        cuisine: ["American", "Burgers"],
        rating: 4.4,
        priceRange: "$15 - $30",
        distance: "3.0 km",
        description: "Classic American smash burgers, hand-spun shakes, and loaded fries. A local favorite for comfort food.",
        address: "90 Main St, Suburbs",
        openHours: "11:00 AM - 11:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
        isVegetarianFriendly: false,
        isTouristFavorite: false,
        languages: ["English"]
    },
    {
        id: 7,
        name: "Mediterranean Breeze",
        cuisine: ["Greek", "Seafood"],
        rating: 4.7,
        priceRange: "$40 - $70",
        distance: "0.3 km",
        description: "Fresh seafood and vibrant salads inspired by the Greek islands. Al fresco dining available.",
        address: "22 Coastal Hwy, Harbor",
        openHours: "12:00 PM - 10:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800",
        isVegetarianFriendly: true,
        isTouristFavorite: true,
        languages: ["English", "Greek"]
    },
    {
        id: 8,
        name: "Noodle Bar",
        cuisine: ["Asian", "Ramen"],
        rating: 4.5,
        priceRange: "$15 - $30",
        distance: "1.0 km",
        description: "Hand-pulled noodles and rich broths. Quick service and authentic flavors.",
        address: "7 Ramen Row, China Town",
        openHours: "11:00 AM - 9:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800",
        isVegetarianFriendly: true,
        isTouristFavorite: true,
        languages: ["English", "Chinese", "Japanese"]
    }
];

export const testimonials = [
    {
        id: 1,
        name: "Sarah Miller",
        country: "USA",
        flag: "🇺🇸",
        quote: "DineDiscover made finding amazing local spots so easy! I didn't feel like a tourist at all. The interface is super intuitive.",
        rating: 5,
        photoUrl: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        id: 2,
        name: "Hans Schmidt",
        country: "Germany",
        flag: "🇩🇪",
        quote: "The multi-language feature is a lifesaver. Being able to see menus in German while traveling in Japan was fantastic.",
        rating: 5,
        photoUrl: "https://i.pravatar.cc/150?u=hans"
    },
    {
        id: 3,
        name: "Elena Rossi",
        country: "Italy",
        flag: "🇮🇹",
        quote: "I love the 'Tourist Favorite' filter. It helped me find high-quality restaurants that are welcoming to travelers from abroad.",
        rating: 4,
        photoUrl: "https://i.pravatar.cc/150?u=elena"
    }
];

export const categories = [
    { id: 1, name: "Romantic", icon: "❤️", image: "https://images.unsplash.com/photo-1517248135467-4c7ed9d42339?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Family Friendly", icon: "👪", image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Local Vibes", icon: "🏢", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400" },
    { id: 4, name: "Quick Bite", icon: "⚡", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=400" },
    { id: 5, name: "Fine Dining", icon: "🍷", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400" },
    { id: 6, name: "Hidden Gems", icon: "💎", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400" },
];

export const destinations = [
    { id: 1, country: "Kampala", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=400" },
    { id: 2, country: "Jinja", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400" },
    { id: 3, country: "Fort Portal", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=400" },
    { id: 4, country: "Mbarara", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400" },
];

export const cuisines = ["All", "Italian", "Japanese", "Mexican", "French", "Indian", "Seafood", "American", "Korean"];
export const priceRanges = ["All", "$", "$$", "$$$", "$$$$"];

export const reviews = [
    {
        id: 1,
        restaurantId: 1,
        userName: "James Wilson",
        date: "2 days ago",
        rating: 5,
        comment: "Absolutely incredible experience. The pasta was handmade and cooked to perfection. The wine recommendation was spot on!",
        userImage: "https://i.pravatar.cc/150?u=james"
    },
    {
        id: 2,
        restaurantId: 1,
        userName: "Maria Garcia",
        date: "1 week ago",
        rating: 4,
        comment: "Great atmosphere and lovely service. The pizza was a bit too salty for my taste, but everything else was wonderful.",
        userImage: "https://i.pravatar.cc/150?u=maria"
    },
    {
        id: 3,
        restaurantId: 1,
        userName: "Alex Chen",
        date: "2 weeks ago",
        rating: 5,
        comment: "Best Italian food in the city, hands down. You have to try the Tiramisu!",
        userImage: "https://i.pravatar.cc/150?u=alex"
    },
    {
        id: 4,
        restaurantId: 2,
        userName: "Sophie Martin",
        date: "3 days ago",
        rating: 5,
        comment: "The sushi freshness is unmatched. A true culinary journey.",
        userImage: "https://i.pravatar.cc/150?u=sophie"
    },
    {
        id: 5,
        restaurantId: 3,
        userName: "David Smith",
        date: "5 days ago",
        rating: 4,
        comment: "Fun vibes and great tacos. A bit loud, but perfect for a night out with friends.",
        userImage: "https://i.pravatar.cc/150?u=david"
    }
];

export const travellerPhotos = [
    {
        id: 1,
        restaurantId: 1,
        imageUrl: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400",
        caption: "Amazing pasta!",
        user: "James W."
    },
    {
        id: 2,
        restaurantId: 1,
        imageUrl: "https://images.unsplash.com/photo-1574868233972-1e6c03050811?auto=format&fit=crop&q=80&w=400",
        caption: "Great atmosphere",
        user: "Maria G."
    },
    {
        id: 3,
        restaurantId: 1,
        imageUrl: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=400",
        caption: "Date night perfection",
        user: "Sara L."
    },
    {
        id: 4,
        restaurantId: 1,
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7ed9d42339?auto=format&fit=crop&q=80&w=400",
        caption: "Lovely interiors",
        user: "Tom H."
    },
    {
        id: 5,
        restaurantId: 1,
        imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400",
        caption: "Best pizza",
        user: "Alex C."
    }
];
