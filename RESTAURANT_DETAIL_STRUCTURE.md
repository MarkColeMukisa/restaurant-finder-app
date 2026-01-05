# Restaurant Detail Page Structure

## Overview
A restaurant detail page that displays complete information about a single restaurant with a professional, user-focused layout.

## Folder Structure
```
app/
├── restaurants/
│   ├── page.jsx (Existing - Restaurant Listing)
│   └── [id]/
│       └── page.jsx (NEW - Restaurant Detail Page)
│
components/
├── RestaurantDetail/ (NEW Folder)
│   ├── HeroSection.jsx - Restaurant image carousel with rating
│   ├── QuickInfoSection.jsx - Hours, Phone, Address, Services
│   ├── MenuSection.jsx - Food menu with categories
│   ├── ReviewsSection.jsx - Customer reviews & ratings
│   ├── GallerySection.jsx - Photo gallery
│   ├── LocationSection.jsx - Map & directions
│   ├── AboutSection.jsx - Restaurant description
│   └── SimilarRestaurantsSection.jsx - Recommendations
```

## Page Sections (Top to Bottom)

### 1. **HeroSection** (Hero Banner)
**Purpose:** First impression with visual impact
**Content:**
- Restaurant main image with carousel (swipe through photos)
- Restaurant name, cuisines, price range
- Large star rating (4.5/5.0)
- Review count
- Status badge (Open/Closed)
- Quick action buttons (Reserve, Call, Order)
- Favorite/Save button

**Styling:** 
- Full width, height 300-400px
- Gradient overlay on image
- Badges positioned in corners
- Smooth image transitions

---

### 2. **QuickInfoSection** (Quick Facts)
**Purpose:** Essential information at a glance
**Content:**
- Hours (Today's hours + status)
- Phone number (Clickable to call)
- Address (Clickable to map)
- Services (Dine-in, Takeaway, Delivery, WiFi, etc.)

**Layout:** 
- 4 cards in a responsive grid
- Icons with colors
- Hover effects
- Mobile-friendly (stacks on small screens)

---

### 3. **ReviewsSection** (Ratings & Reviews)
**Purpose:** Build trust through customer feedback
**Content:**
- Overall rating (large)
- Review count
- Rating distribution (5★, 4★, 3★, etc. breakdown)
- Top reviews list (sorted by helpful)
- "Write Review" button
- Review sorting options (Recent, Helpful, Highest Rated)

**Features:**
- Display 3-5 top reviews initially
- Load more button for pagination
- Review author, rating, date, text
- Helpful/Unhelpful voting

---

### 4. **MenuSection** (Food & Drinks)
**Purpose:** Show what they serve
**Content:**
- Categories (Appetizers, Main Courses, Desserts, etc.)
- Menu items with:
  - Item name
  - Description
  - Price
  - Photo (optional)
  - Dietary info (Vegan, Gluten-free, etc.)

**Features:**
- Category tabs/navigation
- Search function
- Filter by dietary restrictions
- Add to cart (if needed)

---

### 5. **GallerySection** (Photo Gallery)
**Purpose:** Visual showcase
**Content:**
- Grid of restaurant photos
- Lightbox/modal for full-screen viewing
- Photo count badge
- Swipe navigation

**Features:**
- Responsive grid (2/3/4 columns)
- Click to zoom
- Prev/Next navigation
- Close button
- Thumbnail navigation

---

### 6. **LocationSection** (Map & Address)
**Purpose:** Help customers find the restaurant
**Content:**
- Embedded Google Map
- Address with directions button
- Full operating hours (all 7 days)
- Parking info
- Public transit info

**Features:**
- Interactive map
- "Get Directions" button (Google Maps/Apple Maps)
- Copy address button
- Delivery zone info

---

### 7. **AboutSection** (Description)
**Purpose:** Story & brand info
**Content:**
- Restaurant description
- Specialties/Highlights
- Awards/Certifications
- Website link
- Social media links

**Features:**
- Expandable text (Read more/less)
- Highlight badges
- Professional formatting

---

### 8. **SimilarRestaurantsSection** (Recommendations)
**Purpose:** Keep users exploring
**Content:**
- 4-6 similar restaurants carousel
- Each card shows:
  - Image
  - Name
  - Cuisines
  - Rating
  - Distance
  - Price range

**Features:**
- Horizontal scroll on mobile
- Arrow navigation buttons
- Dot indicators
- Link to other detail pages

---

## Data Model (Mock Data Example)

```javascript
const restaurant = {
  id: "1",
  name: "Delicious Pasta House",
  description: "Authentic Italian cuisine...",
  image: "url",
  additionalImages: ["url1", "url2"],
  
  // Basic Info
  rating: 4.6,
  reviewCount: 245,
  cuisines: ["Italian", "Pasta", "Vegetarian"],
  priceRange: 2, // 1-4 ($-$$$$)
  
  // Contact & Hours
  phone: "+1 (555) 123-4567",
  address: "123 Main St, City, State 12345",
  coordinates: { lat: 40.7128, lng: -74.0060 },
  website: "https://example.com",
  
  hours: {
    monday: { open: "11:00", close: "23:00" },
    tuesday: { open: "11:00", close: "23:00" },
    // ... rest of week
  },
  
  // Services
  services: ["Dine-in", "Takeaway", "Delivery"],
  amenities: ["WiFi", "Parking", "Wheelchair Accessible", "Outdoor Seating"],
  
  // Menu
  menu: {
    categories: [
      {
        id: "1",
        name: "Appetizers",
        items: [
          {
            id: "item1",
            name: "Bruschetta",
            description: "Toasted bread...",
            price: 8.99,
            image: "url",
            dietary: ["Vegetarian"]
          }
        ]
      }
    ]
  },
  
  // Reviews
  reviews: [
    {
      id: "r1",
      author: "John Doe",
      rating: 5,
      title: "Amazing Experience!",
      text: "Food was delicious...",
      date: "2025-12-28",
      helpful: 12,
      unhelpful: 0
    }
  ],
  
  // Gallery
  gallery: ["url1", "url2", "url3"],
  
  // Ratings Breakdown
  ratingDistribution: {
    5: 150,
    4: 60,
    3: 25,
    2: 8,
    1: 2
  }
}
```

---

## Responsive Breakpoints

### Mobile (320px - 640px)
- Single column layout
- Full-width sections
- Carousel for images
- Stacked cards
- Touch-friendly buttons (48px min height)
- Simplified menu (categories as tabs)

### Tablet (641px - 1024px)
- 2-column sections where appropriate
- Grid adjustments
- Better spacing
- 3-column item grids

### Desktop (1025px+)
- Full 2-3 column layouts
- Optimized spacing
- Sidebar options
- 4-column grids

---

## Technical Implementation Steps

1. **Create folder structure**
   ```
   mkdir app/restaurants/[id]
   mkdir components/RestaurantDetail
   ```

2. **Create individual components** (one at a time)
   - Start with HeroSection
   - Build QuickInfoSection
   - Add MenuSection
   - Continue with others

3. **Create main page file** `app/restaurants/[id]/page.jsx`
   - Import all components
   - Fetch restaurant data by [id]
   - Render sections in order

4. **Add navigation**
   - From listing page: Link to `/restaurants/[id]`
   - Back button on detail page

5. **Style & Polish**
   - Consistent colors (orange/red theme)
   - Smooth animations
   - Loading states
   - Error boundaries

---

## Recommended Implementation Order

1. ✅ Create folder & basic page structure
2. ✅ Build HeroSection (most important first impression)
3. ✅ Build QuickInfoSection (essential quick facts)
4. ✅ Build ReviewsSection (builds trust)
5. ✅ Build MenuSection (shows offerings)
6. ✅ Build GallerySection (visual appeal)
7. ✅ Build LocationSection (practical info)
8. ✅ Build AboutSection (brand story)
9. ✅ Build SimilarRestaurantsSection (engagement)
10. ✅ Polish and optimize

---

## Key Features to Include

- ✅ Responsive design (mobile-first)
- ✅ Image optimization
- ✅ Loading states
- ✅ Error handling
- ✅ Smooth animations
- ✅ Accessibility (alt text, keyboard nav)
- ✅ Meta tags (for SEO)
- ✅ Share functionality
- ✅ Dynamic data binding
- ✅ Real-time availability checking

---

This structure provides a professional, complete restaurant detail experience that rivals platforms like OpenTable, Yelp, and DoorDash!

Would you like me to start implementing any of these sections?
