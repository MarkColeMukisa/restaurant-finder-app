"use client";

import React from "react";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { RestaurantGrid } from "@/components/site/RestaurantGrid";
import { PopularDestinations } from "@/components/site/PopularDestinations";
import { PopularRestaurants } from "@/components/site/PopularRestaurants";
import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Categories />
      <RestaurantGrid />
      <PopularDestinations />
      <PopularRestaurants />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}
