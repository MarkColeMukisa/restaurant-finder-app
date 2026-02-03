import CallToAction from "@/components/client/CallToAction";
import Categories from "@/components/client/Categories";
import ExclusiveOffers from "@/components/client/ExclusiveOffers";
import HeroSection from "@/components/client/Hero";
import HowItWorks from "@/components/client/HowItWorks";
import PopularRestaurants from "@/components/client/PopularRestaurants";
import RestaurantsNearYou from "@/components/client/RestaurantsNearYou";
import Testimonials from "@/components/client/Testimonials";
import TopRelatedRestaurants from "@/components/client/TopRelatedRestaurants";
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
