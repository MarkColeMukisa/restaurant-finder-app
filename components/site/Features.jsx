"use client";

import React from "react";
import { MapPin, Filter, Languages, Star, ShieldCheck, Globe2, Landmark, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Elite Verification",
        description: "Every restaurant in our guide undergo constant, anonymous audits by experts.",
        icon: <ShieldCheck size={28} className="text-primary" />,
    },
    {
        title: "Global Intelligence",
        description: "Access curated lists across 50+ countries and thousands of culinary stars.",
        icon: <Globe2 size={28} className="text-primary" />,
    },
    {
        title: "Heritage Mapping",
        description: "Discover the history and lineage of the world's most significant dining spots.",
        icon: <Landmark size={28} className="text-primary" />,
    },
    {
        title: "Premium Utility",
        description: "Advanced filtering for diet, budget, and specific culinary techniques.",
        icon: <UtensilsCrossed size={28} className="text-primary" />,
    }
];

export function Features() {
    return (
        <section id="features" className="py-10 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2">
                        <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-6 block">Platform Integrity</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tighter leading-none font-sans">
                            The World's Most <span className="text-primary italic">Reliable</span> Resource
                        </h2>
                        <p className="text-foreground/50 text-lg leading-relaxed mb-10 font-medium">
                            At DineDiscover, we don't just aggregate data; we engineer trust. Our platform is built upon a foundation of expert knowledge and rigorous verification.
                        </p>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-foreground">
                                <Star size={16} fill="#E81F26" stroke="none" />
                                Industry Certified Inspectors
                            </div>
                            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-foreground">
                                <Star size={16} fill="#E81F26" stroke="none" />
                                No Crowd-sourced Manipulation
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-10 border border-slate-100 bg-slate-50 rounded-xl group hover:bg-white hover:shadow-xl transition-all duration-300"
                            >
                                <div className="mb-8 transform group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-black text-foreground mb-4 active:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-foreground/40 text-sm leading-relaxed font-medium capitalize">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
