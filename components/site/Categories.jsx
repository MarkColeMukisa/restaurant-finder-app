"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
    Pizza,
    Coffee,
    UtensilsCrossed,
    Beef,
    IceCream,
    Wine,
    Flame,
    Globe,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
// ... icons imports remains

const iconMap = {
    "Fine Dining": <UtensilsCrossed />,
    "Casual": <Pizza />,
    "Casual Eatery": <Pizza />,
    "Pizza": <Pizza />,
    "Steakhouse": <Beef />,
    "Burger": <Beef />,
    "Wine & Dine": <Wine />,
    "Bar": <Wine />,
    "Dessert": <IceCream />,
    "Cafe": <Coffee />,
    "Coffee": <Coffee />,
    "Breakfast": <Coffee />,
    "Grill": <Flame />,
    "BBQ": <Flame />,
    "International": <Globe />,
    "Asian": <UtensilsCrossed />, // Fallback
    "Mexican": <Flame />, // Fallback
    "Italian": <Pizza />
};

export function Categories({ categories = [] }) {
    const scrollContainerRef = useRef(null);

    // If no categories passed, use fallback or return empty
    // But ideally page.js should pass them. 
    // For now, let's allow it to render nothing or skeletal if needed, but we will pass data.

    const displayCategories = categories.length > 0 ? categories : [
        // Fallback static data if fetch fails (optional, or just render nothing)
        // Keeping static data structure for reference matches what we had:
        // { name: "Fine Dining", count: 240 }
    ];

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="categories" className="py-10 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center lg:text-left">
                {/* Header ... */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Selection by Vibe</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tighter leading-none font-sans">
                            Discover by <span className="text-primary">Culinary Passion</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 hidden md:flex">
                        {/* Scroll Buttons */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-10 w-10 border-slate-200 hover:border-primary hover:text-primary transition-colors bg-white shadow-sm"
                            onClick={() => scroll('left')}
                        >
                            <ChevronLeft size={20} />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-10 w-10 border-slate-200 hover:border-primary hover:text-primary transition-colors bg-white shadow-sm"
                            onClick={() => scroll('right')}
                        >
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 pb-8 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {displayCategories.map((category, idx) => {
                        const icon = iconMap[category.name] || iconMap[Object.keys(iconMap).find(k => category.name.includes(k))] || <UtensilsCrossed />;

                        return (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group cursor-pointer min-w-[260px] md:min-w-[280px] snap-start"
                            >
                                <Link href={`/restaurants?cuisine=${encodeURIComponent(category.name)}`} className="block h-full">
                                    <div className="bg-white p-7 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative h-full">
                                        <div className="absolute top-0 right-0 p-4 text-slate-50 group-hover:text-primary/5 transition-colors translate-x-4 -translate-y-4">
                                            {React.cloneElement(icon, { size: 80, strokeWidth: 1 })}
                                        </div>

                                        <div className="relative z-10">
                                            <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-foreground/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-6 border border-slate-100 group-hover:border-primary">
                                                {React.cloneElement(icon, { size: 22 })}
                                            </div>
                                            <h3 className="font-bold text-lg text-foreground mb-1 tracking-tight">{category.name}</h3>
                                            <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-[0.2em]">{category.count} Places</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
