"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
    return (
        <section className="py-12 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="relative bg-[#1A1A1A] rounded-xl p-12 md:px-24 md:py-32 overflow-hidden shadow-2xl">
                    {/* Subtle background industrial grid */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 mb-10"
                            >
                                <div className="w-12 h-[1px] bg-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Exclusive Membership</span>
                            </motion.div>

                            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter leading-none font-sans">
                                Join the Elite <span className="text-primary italic">Dining Network</span>
                            </h2>

                            <p className="text-lg md:text-xl text-white/50 font-medium leading-relaxed max-w-lg mb-16">
                                Gain priority access to the world's most significant culinary tables and stay informed with expert-verified guides.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button className="rounded-none bg-primary hover:bg-red-700 text-white h-16 px-12 font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/20 active:scale-95 flex gap-4">
                                    Request Invitation
                                    <ArrowRight size={18} />
                                </Button>
                                <Button variant="outline" className="rounded-none border-white/20 text-black hover:bg-white hover:text-[#1A1A1A] h-16 px-12 font-black uppercase tracking-widest text-xs transition-all">
                                    View Premium Benefits
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { label: "50+", sub: "Major Cities", icon: <MapPin size={24} /> },
                                { label: "12k+", sub: "Elite Spots", icon: <ShieldCheck size={24} /> },
                                { label: "5M+", sub: "Verified Users", icon: <Globe size={24} /> },
                                { label: "24/7", sub: "Concierge", icon: <ArrowRight size={24} /> }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 border border-white/10 bg-white/[0.02] rounded-lg text-center group hover:bg-white/[0.05] transition-all"
                                >
                                    <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                                    <div className="text-4xl font-black text-white mb-1 leading-none tracking-tighter">{stat.label}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/30">{stat.sub}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
