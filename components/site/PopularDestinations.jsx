"use client";

"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
// import { destinations } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PopularDestinations({ destinations = [] }) {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320; // Card width + gap
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">World-Class Guides</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                            Culinary <span className="text-primary">Destinations</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-lg">
                            Explore our hand-picked city guides and edible itineraries.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 hidden md:flex">
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
                    {destinations.map((dest, idx) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="group cursor-pointer min-w-[260px] md:min-w-[320px] snap-start"
                        >
                            <Link href={`/restaurants?search=${encodeURIComponent(dest.name)}`}>
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 border border-slate-100 shadow-sm group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <div className="flex items-center gap-2 mb-2 text-primary-foreground/80">
                                            <MapPin size={12} className="text-primary" />
                                            <span className="text-[10px] uppercase font-black tracking-widest">{dest.country}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-1 tracking-tight">{dest.name}</h3>
                                        <div className="h-0 group-hover:h-6 overflow-hidden transition-all duration-300">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 pt-2">
                                                <span>Explore Guide</span>
                                                <ArrowRight size={12} className="text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
