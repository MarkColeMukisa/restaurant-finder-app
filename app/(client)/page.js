import React from "react";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { RestaurantGrid } from "@/components/site/RestaurantGrid";
import { PopularDestinations } from "@/components/site/PopularDestinations";
import { PopularRestaurants } from "@/components/site/PopularRestaurants";
import { NewAndNoteworthy } from "@/components/site/NewAndNoteworthy";
// import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import { RestaurantOwnerCTA } from "@/components/site/RestaurantOwnerCTA";
import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { desc, eq, gt } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  // Fetch all data in parallel for performance : SERVER ACTION
  let allRestaurants = [], popularRestaurants = [], newRestaurants = [], allLocations = [], allCuisinesRaw = [];
  try {
    [allRestaurants, popularRestaurants, newRestaurants, allLocations, allCuisinesRaw] = await Promise.all([
      db.select().from(restaurants).orderBy(desc(restaurants.createdAt)).limit(8),
      db.select().from(restaurants).where(eq(restaurants.isPopular, true)).limit(3),
      db.select().from(restaurants).orderBy(desc(restaurants.createdAt)).limit(4),
      db.select({ address: restaurants.address, imageUrl: restaurants.imageUrl }).from(restaurants),
      db.select({ cuisine: restaurants.cuisine }).from(restaurants)
    ]);
  } catch (error) {
    console.error("LandingPage Data Fetch Error:", error);
    // console.error("Error details:", JSON.stringify(error, null, 2)); // Use if needed
  }

  // Aggregate Destinations
  const locationStats = {};
  allLocations.forEach(loc => {
    // Simple heuristic: Take the last part of the address as the City
    const parts = (loc.address || "").split(',').map(s => s.trim());
    const city = parts.length > 1 ? parts[parts.length - 1] : parts[0]; // "Bugolobi, Kampala" -> "Kampala"

    if (city && city.length > 2) {
      if (!locationStats[city]) {
        locationStats[city] = { count: 0, image: loc.imageUrl, name: city };
      }
      locationStats[city].count++;
    }
  });

  const topDestinations = Object.values(locationStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map((dest, i) => ({
      id: i,
      name: dest.name,
      country: `${dest.count} Places`, // Using "Country" field for count availability
      image: dest.image
    }));

  // Aggregate Categories (Cuisines)
  const cuisineStats = {};
  allCuisinesRaw.forEach(r => {
    const list = Array.isArray(r.cuisine) ? r.cuisine : (r.cuisine ? [r.cuisine] : []);
    list.forEach(c => {
      cuisineStats[c] = (cuisineStats[c] || 0) + 1;
    });
  });

  const topCategories = Object.entries(cuisineStats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Show top 10 categories

  // Get all unique cuisines for Hero dropdown
  const allUniqueCuisines = Object.keys(cuisineStats).sort();

  return (
    <>
      <Hero cuisines={allUniqueCuisines} />
      <Categories categories={topCategories} />
      <RestaurantGrid restaurants={allRestaurants} />
      <PopularDestinations destinations={topDestinations} />
      <PopularRestaurants eliteSpots={popularRestaurants} />
      <NewAndNoteworthy newSpots={newRestaurants} />
      {/* <Features /> */}
      <HowItWorks />
      <Testimonials />
      <CTA />
      <RestaurantOwnerCTA />
    </>
  );
}
