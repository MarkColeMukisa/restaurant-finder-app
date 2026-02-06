"use client";

import React from "react";

export function PartnerStats() {
    return (
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                    {[
                        { label: "Restaurants", value: "12,000+" },
                        { label: "Diners / Month", value: "5M+" },
                        { label: "Bookings", value: "150M+" },
                        { label: "Countries", value: "12" },
                    ].map((stat, i) => (
                        <div key={i} className="px-4">
                            <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 mb-2 tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
