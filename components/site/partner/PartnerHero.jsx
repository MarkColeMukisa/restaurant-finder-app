"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function PartnerHero() {
    const [step, setStep] = React.useState(1);

    const handleNext = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        <section className="relative py-20 lg:py-24 overflow-hidden bg-white">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Copy + Image */}
                    <div className="flex flex-col h-full">
                        <div className="mb-10">
                            <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 mb-6">
                                Fill your tables, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">every night.</span>
                            </h1>

                            <div className="flex flex-col gap-4 mb-8">
                                {[
                                    "Join the #1 booking platform for elite dining.",
                                    "Become bookable everywhere: Google, Instagram, TripAdvisor.",
                                    "Reach new diners with smart, data-driven offers."
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-lg font-medium text-slate-600">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inline Image similar to reference */}
                        <div className="relative w-full h-[300px] lg:h-[400px] rounded-3xl overflow-hidden mt-auto shadow-2xl">
                            <Image
                                src="/images/restaurant-owner-2.png"
                                alt="Restaurant Owner"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Decorative Element */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                        </div>
                    </div>

                    {/* Right: Lead Form (Dark Theme to match reference high contrast) */}
                    <div className="bg-primary rounded-[2rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
                        {/* Stepper Header */}
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all ${step === 1 ? 'bg-white/20 border-white/30' : 'bg-transparent border-white/10 opacity-50'}`}>
                                <span className="text-xs font-bold text-white uppercase tracking-widest">1. Contact Details</span>
                            </div>
                            <div className="w-12 h-[1px] bg-white/20" />
                            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all ${step === 2 ? 'bg-white/20 border-white/30' : 'bg-transparent border-white/10 opacity-50'}`}>
                                <span className="text-xs font-bold text-white uppercase tracking-widest">2. Restaurant Info</span>
                            </div>
                        </div>

                        <form className="space-y-6" onSubmit={step === 1 ? handleNext : handleSubmit}>
                            {step === 1 && (
                                <div className="space-y-6 animate-in slide-in-from-left duration-500">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase font-bold text-white tracking-widest">First Name *</label>
                                            <Input placeholder="Obwanag" className="h-12 bg-white/10 border-white text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white focus:ring-white/20" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase font-bold text-white tracking-widest">Last Name *</label>
                                            <Input placeholder="Semei" className="h-12 bg-white/10 border-white text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white focus:ring-white/20" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase font-bold text-white tracking-widest">Email *</label>
                                        <Input placeholder="example@restaurant.com" type="email" className="h-12 bg-white/10 border-white text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white focus:ring-white/20" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase font-bold text-white tracking-widest">Phone *</label>
                                        <div className="flex gap-2">
                                            <div className="flex items-center justify-center px-4 h-12 bg-white/10 border border-white rounded-md text-white font-medium text-sm">
                                                +256
                                            </div>
                                            <Input placeholder="(752) 199-564" type="tel" className="flex-1 h-12 bg-white/10 border-white text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white focus:ring-white/20" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase font-bold text-white tracking-widest">Why are you contacting us? *</label>
                                        <Select>
                                            <SelectTrigger className="w-full h-12 bg-white/10 border-white text-white focus:bg-white/20 focus:ring-white/20">
                                                <SelectValue placeholder="Select a reason..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="learn">I want to learn about DineDiscover</SelectItem>
                                                <SelectItem value="register">I want to register my restaurant</SelectItem>
                                                <SelectItem value="support">I need support</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase font-bold text-white tracking-widest">Restaurant Name *</label>
                                        <Input placeholder="La Grande Table" className="h-12 bg-white/10 border-white text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white focus:ring-white/20" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase font-bold text-white tracking-widest">Full Address *</label>
                                        <Input placeholder="123 Culinary Ave, Food City" className="h-12 bg-white/10 border-white text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white focus:ring-white/20" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase font-bold text-white tracking-widest">Average Customer Spend *</label>
                                        <Select>
                                            <SelectTrigger className="w-full h-12 bg-white/10 border-white text-white focus:bg-white/20 focus:ring-white/20">
                                                <SelectValue placeholder="Select average spend..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Less than $20</SelectItem>
                                                <SelectItem value="medium">$20 - $50</SelectItem>
                                                <SelectItem value="high">$50 - $100</SelectItem>
                                                <SelectItem value="fine_dining">Above $100</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-start space-x-3 pt-2">
                                        <Checkbox id="terms" className="border-white data-[state=checked]:bg-white data-[state=checked]:text-primary" />
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none text-white/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                I wish to receive communications from DineDiscover.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Button className="w-full h-14 bg-white hover:bg-slate-100 text-primary font-black uppercase tracking-widest text-sm rounded-xl transition-all mt-4 shadow-xl">
                                {step === 1 ? "Next" : "Request a Call Back"}
                            </Button>

                            <p className="text-xs text-center text-white/60 italic mt-4">
                                By selecting '{step === 1 ? "Next" : "Request a Call Back"}' I agree to DineDiscover's Privacy Policy
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
