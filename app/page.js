import CallToAction from "@/components/CallToAction";
import Categories from "@/components/Categories";
import ExclusiveOffers from "@/components/ExclusiveOffers";
import HeroSection from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PopularRestaurants from "@/components/PopularRestaurants";
import RestaurantsNearYou from "@/components/RestaurantsNearYou";
import Testimonials from "@/components/Testimonials";
import TopRelatedRestaurants from "@/components/TopRelatedRestaurants";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
   
   <> 

    <HeroSection />

    <Categories />

    <PopularRestaurants />

    <RestaurantsNearYou />

    <ExclusiveOffers />

    <TopRelatedRestaurants />

    <HowItWorks />

    <Testimonials />

    <CallToAction />



   </>
  );
}
