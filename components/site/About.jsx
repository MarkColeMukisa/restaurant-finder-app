"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Users, Trophy, TrendingUp, Heart, ChefHat, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function About() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 text-primary bg-primary/5 uppercase tracking-widest text-[11px] font-bold rounded-full">
                            Our Story
                        </Badge>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter col-span-2 leading-[0.9] mb-8">
                            Revolutionizing <br />
                            <span className="text-primary">Dining Discovery</span>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto">
                            We're on a mission to connect food lovers with exceptional culinary experiences, one reservation at a time.
                        </p>
                    </motion.div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-200/20 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/3" />
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y border-slate-100 bg-slate-50/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Restaurants", value: "500+", icon: Utensils },
                            { label: "Happy Diners", value: "50k+", icon: Users },
                            { label: "Cuisines", value: "40+", icon: ChefHat },
                            { label: "Cities", value: "12", icon: Trophy },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4 text-primary/20">
                                    <stat.icon size={32} />
                                </div>
                                <div className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-2">{stat.value}</div>
                                <div className="text-sm font-bold uppercase tracking-widest text-foreground/40">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 relative group">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10">
                                <img
                                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000"
                                    alt="Our Mission"
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 text-white">
                                    <p className="font-bold text-lg">Curating Excellence</p>
                                    <p className="text-white/80 text-sm">Since 2023</p>
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
                        </div>

                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tighter">
                                More Than Just a <br />
                                <span className="text-primary">Reservation Platform</span>
                            </h2>
                            <p className="text-lg text-foreground/60 leading-relaxed">
                                DineDiscover was born from a simple frustration: the difficulty of finding truly authentic dining experiences in a sea of generic options.
                            </p>
                            <p className="text-lg text-foreground/60 leading-relaxed">
                                We believe that dining matches are personal. It's not just about the food; it's about the ambiance, the service, and the story behind the plate. Our platform bridges the gap between passionate chefs and discerning diners.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                {[
                                    "Curated Selection",
                                    "verified Reviews",
                                    "Direct Booking",
                                    "Exclusive Perks"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <span className="font-bold text-foreground/80">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tighter mb-6">
                            Meet the <span className="text-primary">Visionaries</span>
                        </h2>
                        <p className="text-lg text-foreground/60">
                            A diverse team of foodies, tech enthusiasts, and creatives working together to redefine how you dine.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Elena Rodriguez", role: "Founder & CEO", img: "https://i.pravatar.cc/300?u=elena" },
                            { name: "David Chen", role: "Head of Product", img: "https://i.pravatar.cc/300?u=david" },
                            { name: "Sarah Johnson", role: "Lead Curator", img: "https://i.pravatar.cc/300?u=sarah" },
                            { name: "Michael Chang", role: "CTO", img: "https://i.pravatar.cc/300?u=michael" },
                        ].map((member, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-100">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-xl text-foreground mb-1">{member.name}</h3>
                                    <p className="text-sm font-bold uppercase tracking-widest text-primary/80">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "Authenticity", desc: "We prioritize genuine culinary experiences over trends.", icon: Heart },
                            { title: "Quality First", desc: "Every restaurant on our platform is hand-picked and verified.", icon: Trophy },
                            { title: "Community", desc: "Building a network of food lovers who share honest feedback.", icon: Users },
                        ].map((value, idx) => (
                            <div key={idx} className="bg-slate-50 rounded-3xl p-10 border border-slate-100 hover:border-primary/20 transition-colors">
                                <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6">
                                    <value.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                                <p className="text-foreground/60 leading-relaxed">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
