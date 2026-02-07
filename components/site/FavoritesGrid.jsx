"use client";

import React from "react";
import { Star, MapPin, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";

export function FavoritesGrid({ restaurants = [] }) {
    const { isFavorite, toggleFavorite } = useFavorites();

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {restaurants.map((restaurant, idx) => (
                <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
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
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleFavorite(restaurant.id);
                                }}
                                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/95 flex items-center justify-center text-red-500 hover:text-red-600 transition-colors shadow-sm z-10"
                            >
                                <Heart
                                    size={18}
                                    fill="currentColor"
                                />
                            </button>
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
            ))}
        </div>
    );
}
