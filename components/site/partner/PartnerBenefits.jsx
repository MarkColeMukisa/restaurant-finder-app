"use client";

import React from "react";
import { TrendingUp, ShieldCheck, Calendar, Users } from "lucide-react";

const benefits = [
    {
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
        title: "Boost Your Revenue",
        description: "Increase your average daily bookings by 30% with our smart yield management tools."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        title: "Reduce No-Shows",
        description: "Our reliability scoring and deposit system reduces no-shows to near zero."
    },
    {
        icon: <Calendar className="w-8 h-8 text-primary" />,
        title: "Smart Reservations",
        description: "Optimize your floor plan and table turnover with our AI-powered booking engine."
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Reach New Diners",
        description: "Get discovered by millions of verified foodies and international tourists."
    }
];

export function PartnerBenefits() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 block">Why Join Us?</span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Everything you need to grow</h2>
                    <p className="text-slate-500 font-medium">Powering the world's best restaurants with tools that actually work.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
