"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Heart, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NewAndNoteworthy({ newSpots = [] }) {

    return (
        <section className="py-20 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div className="text-left w-full md:w-auto">
                        <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Just Added</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">New & <span className="text-primary">Noteworthy</span></h2>
                        <p className="text-slate-500 text-lg max-w-xl">Fresh additions to our curated list of elite dining experiences.</p>
                    </div>
                    <Link
                        href="/restaurants"
                        className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:text-foreground transition-all group/view-more shrink-0 lg:mb-2"
                    >
                        View More
                        <ArrowRight size={14} className="transition-transform group-hover/view-more:translate-x-1" />
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {newSpots.map((restaurant, idx) => (
                        <motion.div
                            key={restaurant.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Link href={`/restaurants/${restaurant.id}`} className="group block">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 mb-5 border border-slate-100 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
                                    <img
                                        src={restaurant.imageUrl}
                                        alt={restaurant.name}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/95 flex items-center justify-center text-foreground/20 hover:text-primary transition-colors shadow-sm">
                                        <Heart size={18} fill={restaurant.isTouristFavorite ? "currentColor" : "none"} className={restaurant.isTouristFavorite ? "text-primary" : ""} />
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <Badge className="bg-primary text-white rounded-full border-none font-bold text-[9px] uppercase tracking-widest px-4 py-1">
                                            New Arrival
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-2 px-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-[17px] text-foreground group-hover:text-primary transition-colors leading-tight pr-4">{restaurant.name}</h3>
                                        <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 bg-orange-50 text-orange-600 rounded-md text-[11px] font-bold">
                                            <span>{restaurant.rating}</span>
                                            <Star size={10} fill="currentColor" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100/60 mt-2">
                                        <div className="flex items-center gap-4 text-xs font-bold text-foreground/40 uppercase tracking-widest divide-x divide-slate-200">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={12} className="text-primary" />
                                                <span>{restaurant.distance}</span>
                                            </div>
                                            <div className="pl-4">
                                                <span>{restaurant.priceRange}</span>
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

                <div className="mt-10 md:hidden text-center">
                    <Link href="/restaurants">
                        <Button variant="outline" className="rounded-full w-full border-slate-200">
                            View All New Arrivals
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
