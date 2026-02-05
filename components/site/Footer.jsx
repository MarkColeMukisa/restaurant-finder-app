"use client";

import React from "react";
import Link from "next/link";
import { Utensils, Instagram, Twitter, Facebook, Globe, MapPin, Mail, Phone, ChevronRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white pt-24 pb-12 transition-all border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-24 mb-24">
                    <div className="lg:col-span-4">
                        <Link href="/" className="flex items-center gap-2 mb-10 group shrink-0">
                            <div className="bg-primary text-white p-1.5 rounded-sm">
                                <Utensils size={20} />
                            </div>
                            <span className="text-xl font-black tracking-tighter uppercase text-foreground">
                                Dine<span className="text-primary font-bold">Discover</span>
                            </span>
                        </Link>
                        <p className="text-foreground/50 text-[13px] font-bold uppercase tracking-widest leading-loose max-w-sm mb-12">
                            Expertly curated culinary experiences for the modern explorer. We define the gold standard of global restaurant discovery.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <Instagram size={18} />, href: "#" },
                                { icon: <Twitter size={18} />, href: "#" },
                                { icon: <Facebook size={18} />, href: "#" }
                            ].map((social, i) => (
                                <Link key={i} href={social.href} className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-foreground/40 hover:bg-primary hover:text-white transition-all shadow-sm">
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
                        <div className="flex flex-col gap-8">
                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground">Discovery</h4>
                            <ul className="flex flex-col gap-5">
                                {["Home", "Restaurant Guide", "City Lists", "Search Nearby"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/50 hover:text-primary transition-all flex items-center gap-2 group">
                                            <ChevronRight size={10} className="text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-8">
                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground">Corporate</h4>
                            <ul className="flex flex-col gap-5">
                                {["About Professional", "Our Inspection", "Media Room", "Institutional"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/50 hover:text-primary transition-all flex items-center gap-2 group">
                                            <ChevronRight size={10} className="text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-8 lg:col-span-2">
                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground">Official Communications</h4>
                            <div className="flex flex-col gap-6">
                                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-4">Official Mailing</p>
                                    <Link href="mailto:official@dinediscover.com" className="text-sm font-black text-foreground hover:text-primary transition-all flex items-center gap-3">
                                        <Mail size={16} className="text-primary" />
                                        official@dinediscover.com
                                    </Link>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-4">International Line</p>
                                    <Link href="tel:+18003463347" className="text-sm font-black text-foreground hover:text-primary transition-all flex items-center gap-3">
                                        <Phone size={16} className="text-primary" />
                                        +1 (800) DINE-GOLD
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20">
                        &copy; {new Date().getFullYear()} DineDiscover International. All Rights Reserved.
                    </p>
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20">
                        <Link href="#" className="hover:text-primary transition-all">Privacy protocol</Link>
                        <Link href="#" className="hover:text-primary transition-all">Legal status</Link>
                        <Link href="#" className="hover:text-primary transition-all">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
