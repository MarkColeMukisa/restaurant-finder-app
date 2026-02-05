"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Utensils, Menu, X, ChevronDown, User, LogOut, Heart, LayoutDashboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthDialog } from "@/components/auth/AuthDialog";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Restaurants", href: "/restaurants" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Header() {
    const { data: session, isPending } = authClient.useSession();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authView, setAuthView] = useState("login");

    const openAuth = (view) => {
        setAuthView(view);
        setIsAuthOpen(true);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const logout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.reload();
                }
            }
        });
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 rotate-0 group-hover:rotate-12 transition-transform duration-300">
                        <Utensils size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        DineDiscover
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[15px] font-semibold text-foreground/60 hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    {isPending ? (
                        <div className="h-10 w-24 bg-slate-100 animate-pulse rounded-xl" />
                    ) : session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                                        <AvatarImage src={session.user.image} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            {session.user.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-left hidden xl:block">
                                        <p className="text-xs font-bold text-foreground leading-none">{session.user.name}</p>
                                        <p className="text-[10px] text-foreground/40 font-medium">Verified Finder</p>
                                    </div>
                                    <ChevronDown size={14} className="text-foreground/20" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-200 bg-white shadow-2xl shadow-slate-200/50 opacity-100 z-[100]">
                                <DropdownMenuLabel className="px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 block mb-1">My Account</span>
                                        {session.user.role === "admin" && (
                                            <Badge className="h-4 px-1 text-[8px] bg-blue-500 text-white rounded-md border-none font-black -mt-1">ADMIN</Badge>
                                        )}
                                    </div>
                                    <span className="text-sm font-bold text-foreground truncate block">{session.user.email}</span>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-slate-50 my-2" />
                                {session.user.role === "admin" && (
                                    <Link href="/admin">
                                        <DropdownMenuItem className="rounded-xl cursor-pointer py-3 px-3 hover:bg-blue-50 text-blue-600 transition-colors group">
                                            <Shield size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                                            <span className="font-black text-[11px] uppercase tracking-widest">Admin Dashboard</span>
                                        </DropdownMenuItem>
                                    </Link>
                                )}
                                <Link href="/profile">
                                    <DropdownMenuItem className="rounded-xl cursor-pointer py-3 px-3 hover:bg-slate-50 transition-colors group">
                                        <User size={16} className="mr-3 text-primary group-hover:scale-110 transition-transform" />
                                        <span className="font-bold text-[11px] uppercase tracking-widest text-foreground/80">Profile</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="rounded-xl cursor-pointer py-3 px-3 hover:bg-slate-50 transition-colors group">
                                    <Heart size={16} className="mr-3 text-red-500 group-hover:scale-110 transition-transform" />
                                    <span className="font-bold text-[11px] uppercase tracking-widest text-foreground/80">Favourites</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-slate-50 my-2" />
                                <DropdownMenuItem
                                    className="rounded-xl cursor-pointer py-3 px-3 text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 transition-colors group"
                                    onClick={logout}
                                >
                                    <LogOut size={16} className="mr-3 group-hover:-translate-x-0.5 transition-transform" />
                                    <span className="font-bold text-[11px] uppercase tracking-widest">Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                className="text-[15px] font-semibold text-foreground/60 hover:text-foreground rounded-full px-6"
                                onClick={() => openAuth("signup")}
                            >
                                Sign Up
                            </Button>
                            <Button
                                className="bg-[#0d0c22] hover:bg-[#0d0c22]/90 text-white rounded-full px-8 h-12 text-[15px] font-bold shadow-lg shadow-black/10 transition-all active:scale-95"
                                onClick={() => openAuth("login")}
                            >
                                Log in
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 bg-white z-[60] pt-24 px-6 lg:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-2xl font-bold text-foreground"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-8 flex flex-col gap-4 border-t border-slate-100">
                                {session ? (
                                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full h-14 font-bold text-lg" onClick={logout}>
                                        Sign Out
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-full h-14 font-bold text-lg"
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                openAuth("signup");
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                        <Button
                                            className="w-full bg-[#0d0c22] rounded-full h-14 font-bold text-lg"
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                openAuth("login");
                                            }}
                                        >
                                            Log in
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} initialView={authView} />
        </nav>
    );
}
