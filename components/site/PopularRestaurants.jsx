"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

const FEATURE_BADGES = [
    { key: 'isTouristFavorite', label: 'Elite Choice', color: 'bg-primary' },
    { key: 'isVegetarianFriendly', label: 'Veg Friendly', color: 'bg-green-600' }
];

export function PopularRestaurants({ eliteSpots = [] }) {

    return (
        <section className="py-10 bg-[#F8F9FA] relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div className="text-left w-full md:w-auto">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Popular <span className="text-primary">Restaurants</span></h2>
                        <p className="text-slate-500 text-lg max-w-xl">Curated selection of our most loved dining destinations.</p>
                    </div>
                    <Link
                        href="/restaurants"
                        className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:text-foreground transition-all group/view-more shrink-0 lg:mb-2"
                    >
                        View More
                        <ArrowRight size={14} className="transition-transform group-hover/view-more:translate-x-1" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {eliteSpots.map((restaurant, idx) => (
                        <motion.div
                            key={restaurant.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group"
                        >
                            <Link href={`/restaurants/${restaurant.id}`} className="block h-full">
                                <Card className="border-none bg-white rounded-2xl shadow-sm group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden h-full flex flex-col p-0 gap-0">
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                        <img
                                            src={restaurant.imageUrl}
                                            alt={restaurant.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            {FEATURE_BADGES.map((badge) => restaurant[badge.key] && (
                                                <Badge
                                                    key={badge.key}
                                                    className={`${badge.color} text-white border-none rounded-full font-bold text-[8px] uppercase tracking-widest px-3 py-1 shadow-md w-fit`}
                                                >
                                                    {badge.label}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <CardContent className="p-7 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 text-primary mb-4">
                                            <div className="flex items-center gap-1 px-2 py-1 bg-primary/5 rounded-md">
                                                <Star size={14} fill="currentColor" />
                                                <span className="font-bold text-sm tracking-tight">{restaurant.rating}</span>
                                            </div>
                                            <span className="text-foreground/30 text-[10px] font-bold uppercase tracking-widest ml-1">5K+ Verified Reviews</span>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors tracking-tight">{restaurant.name}</h3>

                                        <p className="text-foreground/50 text-sm leading-relaxed font-medium italic opacity-80">
                                            "{(restaurant.description || "No description available").substring(0, 85)}..."
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-slate-100/60">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] uppercase font-black text-foreground/20 tracking-widest mb-1">Price Range</span>
                                                    <span className="text-sm font-bold text-foreground/70 tracking-tight leading-none">{restaurant.priceRange}</span>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[9px] uppercase font-black text-foreground/20 tracking-widest mb-1">Cuisine Style</span>
                                                    <span className="text-sm font-bold text-foreground/70 tracking-tight leading-none">
                                                        {(restaurant.cuisine && restaurant.cuisine.length > 0) ? restaurant.cuisine[0] : "Unknown"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl group/btn transition-all hover:bg-primary/5">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 group-hover/btn:text-primary transition-colors">View Details</span>
                                                <ArrowRight size={14} className="text-primary transition-transform group-hover/btn:translate-x-1" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
