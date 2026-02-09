"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Navigation, ArrowRight, Star, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
// Removed dummy data import
// import { cuisines } from "@/lib/dummy-data";

const carouselItems = [
    {
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200",
        name: "The Artisan Table",
        location: "London, UK",
        rating: 4.9
    },
    {
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
        name: "Lumière Gastronomy",
        location: "Paris, France",
        rating: 4.8
    },
    {
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200",
        name: "Sava Mediterranean",
        location: "Barcelona, Spain",
        rating: 4.7
    }
];

export function Hero({ cuisines = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCuisine, setSelectedCuisine] = useState("");
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        if (selectedCuisine) params.set("cuisine", selectedCuisine);

        router.push(`/restaurants?${params.toString()}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <section id="home" className="relative pt-32 pb-10 bg-white overflow-hidden">
            <div className="container mx-auto px-6">


                {/* Side-by-side Layout with Content */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-16"
                    >
                        {/* Text Content - Lower Z-Index */}
                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-[1.05] mb-2 tracking-tighter">
                                Exceptional <span className="text-primary italic">Flavor</span> <br /> and Expert Curation.
                            </h2>
                            <p className="text-lg md:text-xl text-foreground/50 leading-relaxed mb-10 font-medium max-w-lg">
                                Join thousands of food lovers discovering the world's most significant culinary institutions. Our platform engineered for trust and excellence.
                            </p>
                        </div>

                        {/* Search Filters - Higher Z-Index to prevent overlapping issues */}
                        <div className="relative z-20 w-full max-w-xl bg-slate-50 rounded-full p-1 flex items-center border border-slate-200 group transition-all focus-within:bg-white focus-within:border-primary/20">
                            <div className="flex-1 relative flex items-center pl-6">
                                <Search size={18} className="text-primary mr-3 shrink-0" />
                                <Input
                                    placeholder="Enter city or area..."
                                    className="w-full h-14 bg-transparent border-none rounded-full px-0 text-[15px] font-bold text-foreground placeholder:text-foreground/20 focus-visible:ring-0 focus-visible:ring-offset-0 leading-none shadow-none focus:outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className="w-[1px] h-8 bg-slate-200 hidden md:block mx-4" />
                            <div className="w-1/3 hidden md:block px-4">
                                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                                    <SelectTrigger className="w-full h-14 border-none bg-transparent rounded-full px-0 text-[14px] font-bold text-foreground focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 uppercase tracking-[0.15em] flex items-center justify-start gap-3 shadow-none group/select transition-colors hover:text-primary outline-none ring-0">
                                        <div className="flex items-center gap-3 w-full">
                                            <Utensils size={18} className="text-primary shrink-0 transition-transform group-hover/select:scale-110" />
                                            <div className="flex flex-col items-start leading-none gap-1">
                                                <span className="text-[10px] text-foreground/20 font-black tracking-widest uppercase">Search</span>
                                                <SelectValue placeholder="Cuisine" className="truncate" />
                                            </div>
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-[1.5rem] bg-white shadow-2xl border border-slate-100 p-3 translate-y-3 min-w-[220px] z-[100] font-sans h-60 overflow-y-auto">
                                        <div className="px-4 py-2 border-b border-slate-50 mb-2">
                                            <span className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em]">Available Flavors</span>
                                        </div>
                                        <SelectItem value="all_cuisines_clear_value" className="font-bold py-3.5 px-6 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-sm mb-1 text-primary/50">Any Cuisine</SelectItem>
                                        {cuisines.map((c) => (
                                            <SelectItem key={c} value={c} className="font-bold py-3.5 px-6 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-sm mb-1 last:mb-0 ">{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                onClick={handleSearch}
                                className="h-14 md:px-10 rounded-full bg-[#0d0c22] hover:bg-[#2d2c42] text-white shadow-none transition-all flex items-center justify-center shrink-0 group-hover:scale-[1.02] active:scale-95"
                            >
                                <span className="text-sm font-bold">Search</span>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Carousel Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-2xl border-[8px] border-white bg-slate-100 group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentSlide}
                                    src={carouselItems[currentSlide].image}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                <div>
                                    <div className="text-white font-bold text-3xl mb-2">{carouselItems[currentSlide].name}</div>
                                    <div className="flex items-center gap-2 text-white/70 font-semibold">
                                        <MapPin size={16} /> {carouselItems[currentSlide].location}
                                    </div>
                                </div>
                                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center text-primary shadow-xl">
                                    <Star size={24} fill="currentColor" />
                                </div>
                            </div>

                            {/* Slide Indicators */}
                            <div className="absolute top-10 left-10 flex gap-2">
                                {carouselItems.map((_, i) => (
                                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? "w-10 bg-white" : "w-4 bg-white/40"}`} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
