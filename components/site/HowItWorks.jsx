"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, CalendarCheck, Globe2, Filter } from "lucide-react";

const steps = [
    {
        title: "Global Selection",
        description: "Choose your destination from thousands of verified global cities.",
        icon: <Globe2 size={24} />,
        color: "bg-primary"
    },
    {
        title: "Expert Filtering",
        description: "Refine by Michelin status, cuisine rarity, and price guide.",
        icon: <Filter size={24} />,
        color: "bg-primary"
    },
    {
        title: "Instant Verification",
        description: "View real-time table availability and authentic elite reviews.",
        icon: <Search size={24} />,
        color: "bg-primary"
    },
    {
        title: "Guaranteed Booking",
        description: "Secure your reservation through our direct platform partnership.",
        icon: <CalendarCheck size={24} />,
        color: "bg-primary"
    }
];



export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-10 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
                    <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-6 block">The Service Protocol</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tighter leading-none font-sans">
                        From Discovery to <span className="text-primary italic">Exceptional Dining</span>
                    </h2>
                    <div className="w-16 h-[2px] bg-slate-100" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                    <div className="absolute top-1/4 left-10 right-10 h-[1px] bg-slate-100 hidden lg:block -z-10" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-primary mb-8 shadow-sm group-hover:border-primary group-hover:shadow-lg transition-all relative z-10">
                                {step.icon}
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white font-black text-xs flex items-center justify-center border-4 border-white">
                                    {idx + 1}
                                </div>
                            </div>
                            <h3 className="text-lg font-black text-foreground mb-4 uppercase tracking-tighter">{step.title}</h3>
                            <p className="text-foreground/40 text-xs font-bold leading-relaxed px-6 tracking-wide uppercase">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
