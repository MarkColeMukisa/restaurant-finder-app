"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/dummy-data";

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-10 bg-white border-y border-slate-100 relative overflow-hidden">
            {/* Background institutional mark */}
            <div className="absolute top-0 right-10 text-[600px] font-black text-slate-50 select-none leading-none pointer-events-none uppercase tracking-tighter">
                D
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/3">
                        <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Global Commendations</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tighter leading-none font-sans">
                            Authorized <span className="text-primary italic">Perspectives</span>
                        </h2>
                        <p className="text-foreground/40 text-sm font-bold uppercase tracking-widest leading-relaxed mb-12">
                            Real-world insights from verified culinary professionals and frequent travelers.
                        </p>
                        <div className="flex gap-4">
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-14 w-14 rounded-lg border-slate-200 text-foreground/40 hover:text-primary hover:border-primary transition-all shadow-sm"
                                onClick={prevSlide}
                            >
                                <ChevronLeft size={24} />
                            </Button>
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-14 w-14 rounded-lg border-slate-200 text-foreground/40 hover:text-primary hover:border-primary transition-all shadow-sm"
                                onClick={nextSlide}
                            >
                                <ChevronRight size={24} />
                            </Button>
                        </div>
                    </div>

                    <div className="lg:w-2/3 bg-slate-50 p-12 md:p-20 rounded-xl relative border border-slate-100 shadow-sm">
                        <Quote className="absolute top-10 right-10 text-primary/10 w-24 h-24" />

                        <div className="relative h-[450px] md:h-[300px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0 flex flex-col md:flex-row items-center gap-12"
                                >
                                    <div className="shrink-0 relative">
                                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden border-8 border-white shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
                                            <img
                                                src={testimonials[currentIndex].photoUrl}
                                                alt={testimonials[currentIndex].name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg border border-slate-100 flex items-center justify-center">
                                            <span className="text-2xl">{testimonials[currentIndex].flag}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 text-center md:text-left pt-6">
                                        <div className="flex items-center justify-center md:justify-start gap-1 text-primary mb-8">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill={i < testimonials[currentIndex].rating ? "currentColor" : "none"} stroke={i < testimonials[currentIndex].rating ? "none" : "#DEE2E6"} />
                                            ))}
                                        </div>

                                        <p className="text-2xl md:text-3xl font-black text-foreground tracking-tighter italic leading-snug mb-10">
                                            "{testimonials[currentIndex].quote}"
                                        </p>

                                        <div>
                                            <h4 className="text-lg font-black text-foreground uppercase tracking-tighter">{testimonials[currentIndex].name}</h4>
                                            <p className="text-foreground/30 text-[10px] font-black uppercase tracking-widest mt-1 tracking-[0.2em]">{testimonials[currentIndex].country}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
