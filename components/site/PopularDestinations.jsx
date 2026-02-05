"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { destinations } from "@/lib/dummy-data";

export function PopularDestinations() {
    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">World-Class Guides</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tighter leading-none font-sans">
                            Essential Destinations for the <span className="text-primary italic">Global Gourmet</span>
                        </h2>
                        <p className="text-foreground/50 text-base font-medium leading-relaxed max-w-lg">
                            Explore our hand-picked city guides, featuring the most significant culinary institutions and rising stars.
                        </p>
                    </div>
                    <button className="text-[11px] font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-1 hover:text-red-700 hover:border-red-700 transition-all">
                        Explore All Cities
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {destinations.slice(0, 3).map((dest, idx) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 mb-8 border border-slate-200 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />

                                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white drop-shadow-md">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-primary" />
                                        <span className="text-[10px] uppercase font-black tracking-widest">{dest.country}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
