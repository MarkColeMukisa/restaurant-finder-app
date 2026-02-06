"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export function PartnerTestimonials() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Trusted by Industry Leaders</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "Since joining DineDiscover, our off-peak bookings have increased by 45%. The yield management tools are a game changer.",
                            author: "Marcus Wareing",
                            role: "Chef Patron, London",
                            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=200"
                        },
                        {
                            quote: "The interface is incredibly intuitive. My staff learned how to use the dashboard in minutes. Best decision we made this year.",
                            author: "Elena Arzak",
                            role: "Owner, San Sebastian",
                            image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=200"
                        },
                        {
                            quote: "Finally a platform that understands what restaurants need. Lower commissions and higher quality bookings.",
                            author: "David Chang",
                            role: "Founder, Momofuku",
                            image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200"
                        }
                    ].map((testimonial, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                            <div className="flex gap-1 text-primary mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-slate-600 font-medium italic leading-relaxed mb-6 flex-1">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                                    <Image src={testimonial.image} alt={testimonial.author} fill className="object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 text-sm">{testimonial.author}</div>
                                    <div className="text-xs text-slate-500 font-medium">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
