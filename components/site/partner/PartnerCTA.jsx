"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PartnerCTA() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="relative bg-[#FF6B35] rounded-3xl p-12 md:px-24 md:py-32 overflow-hidden shadow-2xl text-center">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
                            Ready to transform your restaurant?
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed">
                            Join the world's fastest growing dining network. No setup fees, no long-term contracts. Just results.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button className="bg-white hover:bg-slate-100 text-[#FF6B35] h-16 px-12 font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 rounded-full">
                                Get Started Now
                                <ArrowRight className="ml-2" size={18} />
                            </Button>
                            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-16 px-12 font-black uppercase tracking-widest text-xs transition-all rounded-full bg-transparent">
                                Schedule Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
