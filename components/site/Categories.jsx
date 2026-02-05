"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Pizza,
    Coffee,
    UtensilsCrossed,
    Beef,
    IceCream,
    Wine,
    Flame,
    Globe
} from "lucide-react";

const categories = [
    { name: "Fine Dining", icon: <UtensilsCrossed />, count: "240+ Places" },
    { name: "Casual Eatery", icon: <Pizza />, count: "580+ Places" },
    { name: "Steakhouse", icon: <Beef />, count: "120+ Places" },
    { name: "Wine & Dine", icon: <Wine />, count: "95+ Places" },
    { name: "Dessert & Cafe", icon: <IceCream />, count: "320+ Places" },
    { name: "Breakfast", icon: <Coffee />, count: "410+ Places" },
    { name: "Grill & BBQ", icon: <Flame />, count: "180+ Places" },
    { name: "International", icon: <Globe />, count: "650+ Places" },
];

export function Categories() {
    return (
        <section id="categories" className="py-10 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Selection by Vibe</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tighter leading-none font-sans">
                            Discover by <span className="text-primary">Culinary Passion</span>
                        </h2>
                    </div>
                    <p className="text-foreground/40 font-bold text-xs uppercase tracking-widest lg:mb-2">
                        Standardized Quality Across All Geographies
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="group cursor-pointer"
                        >
                            <div className="bg-white p-7 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 text-slate-50 group-hover:text-primary/5 transition-colors translate-x-4 -translate-y-4">
                                    {React.cloneElement(category.icon, { size: 80, strokeWidth: 1 })}
                                </div>

                                <div className="relative z-10">
                                    <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-foreground/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-6 border border-slate-100 group-hover:border-primary">
                                        {React.cloneElement(category.icon, { size: 22 })}
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground mb-1 tracking-tight">{category.name}</h3>
                                    <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-[0.2em]">{category.count}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
