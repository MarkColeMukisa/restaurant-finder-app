"use client";

import React from "react";
import {
    Star,
    MapPin,
    Heart,
    ArrowRight,
    Navigation,
    CalendarCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

export function RestaurantGrid({ restaurants = [] }) {
    // Display a limited selection for the home page highlight
    const displayRestaurants = restaurants.slice(0, 8);

    return (
        <section id="restaurants" className="py-10 bg-[#F8F9FA]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
                    <div className="max-w-xl">
                        <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Hand-Picked Selection</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tighter leading-none font-sans">
                            Elite Dining <span className="text-primary">Near You</span>
                        </h2>
                    </div>

                    <Link
                        href="/restaurants"
                        className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:text-foreground transition-all group/view-more shrink-0 lg:mb-2"
                    >
                        View More
                        <ArrowRight size={14} className="transition-transform group-hover/view-more:translate-x-1" />
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 mb-16">
                    {displayRestaurants.length > 0 ? (
                        displayRestaurants.map((restaurant, idx) => (
                            <motion.div
                                key={restaurant.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Link href={`/restaurants/${restaurant.id}`} className="group block">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 mb-5 border border-slate-100 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
                                        {restaurant.imageUrl ? (
                                            <img
                                                src={restaurant.imageUrl}
                                                alt={restaurant.name}
                                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                                                <MapPin size={24} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/95 flex items-center justify-center text-foreground/20 hover:text-primary transition-colors shadow-sm">
                                            <Heart size={18} fill={restaurant.isTouristFavorite ? "currentColor" : "none"} className={restaurant.isTouristFavorite ? "text-primary" : ""} />
                                        </div>
                                        {restaurant.rating >= 4.8 && (
                                            <div className="absolute bottom-4 left-4">
                                                <Badge className="bg-primary text-white rounded-full border-none font-bold text-[9px] uppercase tracking-widest px-4 py-1">
                                                    Exceptional
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2 px-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-[17px] text-foreground group-hover:text-primary transition-colors leading-tight pr-4">{restaurant.name}</h3>
                                            <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 bg-orange-50 text-orange-600 rounded-md text-[11px] font-bold">
                                                <span>{restaurant.rating || "New"}</span>
                                                <Star size={10} fill="currentColor" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100/60 mt-2">
                                            <div className="flex items-center gap-4 text-xs font-bold text-foreground/40 uppercase tracking-widest divide-x divide-slate-200">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin size={12} className="text-primary" />
                                                    <span className="truncate max-w-[80px]">{restaurant.distance || "N/A"}</span>
                                                </div>
                                                <div className="pl-4">
                                                    <span>{restaurant.priceRange || "$$"}</span>
                                                </div>
                                            </div>
                                            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-slate-500">
                            <p>No restaurants found nearby at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
