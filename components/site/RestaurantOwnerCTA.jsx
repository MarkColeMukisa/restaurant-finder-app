"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function RestaurantOwnerCTA() {
    return (
        <section className="py-20 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Image */}
                    <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px]">
                        <Image
                            src="/images/restaurant-owner-2.png"
                            alt="Restaurant Owner"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col space-y-10">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            Are you a restaurant owner?
                        </h2>

                        <div className="space-y-8">
                            {/* Block 1 */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Register your Restaurant</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        Tell us more about you and we will contact you as soon as possible
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    className="rounded-none border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 font-bold uppercase tracking-widest text-[11px] transition-all"
                                    asChild
                                >
                                    <a href="/partner">See More Information</a>
                                </Button>
                            </div>

                            {/* Divider line for mobile/visual separation if needed, but spacing is good */}

                            {/* Block 2 */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Already a Client</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        Log in to DineDiscover and contact us by Chat.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    className="rounded-none border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 font-bold uppercase tracking-widest text-[11px] transition-all"
                                >
                                    Log in to DineDiscover
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
