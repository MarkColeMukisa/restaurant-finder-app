"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Mail, Lock, User, Loader2, ArrowRight, Github, Chrome } from "lucide-react";

export function AuthDialog({ open, onOpenChange, initialView = "login" }) {
    const [view, setView] = useState(initialView);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const handleAuth = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (view === "login") {
                const { data, error } = await authClient.signIn.email({
                    email: formData.email,
                    password: formData.password,
                    callbackURL: "/",
                });
                if (error) throw error;
                toast.success("Welcome back!");
            } else {
                const { data, error } = await authClient.signUp.email({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                    callbackURL: "/",
                });
                if (error) throw error;
                toast.success("Account created successfully!");
            }
            onOpenChange(false);
        } catch (error) {
            toast.error(error.message || "Authentication failed");
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setIsLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error("Google login failed");
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-none rounded-3xl bg-white shadow-2xl max-h-[95vh] flex flex-col">
                <div className="relative flex flex-col py-6 px-6 sm:px-8 overflow-hidden">
                    {/* Background Accent */}
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                    <div className="w-full relative z-10">
                        <div className="flex flex-col items-center text-center space-y-3 mb-5">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 rotate-6"
                            >
                                <Utensils size={20} />
                            </motion.div>
                            <div className="space-y-0.5">
                                <DialogTitle className="text-2xl font-black tracking-tighter text-foreground leading-none">
                                    {view === "login" ? "Welcome Back" : "Create Account"}
                                </DialogTitle>
                                <DialogDescription className="text-xs font-semibold text-foreground/30">
                                    {view === "login" ? "Sign in to your account" : "Join our community"}
                                </DialogDescription>
                            </div>
                        </div>

                        {/* Social Login Section */}
                        <div className="flex gap-2 mb-5">
                            <Button
                                variant="outline"
                                className="w-full h-10 border-slate-100 bg-white hover:bg-slate-50 rounded-lg gap-2 text-[10px] uppercase font-black tracking-widest text-foreground/40 transition-all border group"
                                onClick={signInWithGoogle}
                                disabled={isLoading}
                            >
                                <Chrome size={14} className="text-primary group-hover:scale-110 transition-transform" />
                                Continue with Google
                            </Button>
                        </div>

                        <form onSubmit={handleAuth} className="space-y-3.5">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={view}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.15 }}
                                    className="space-y-3"
                                >
                                    {view === "signup" && (
                                        <div className="space-y-1">
                                            <Label htmlFor="name" className="text-[9px] font-black uppercase tracking-widest text-foreground/20 ml-1">Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20" />
                                                <Input
                                                    id="name"
                                                    placeholder="John Doe"
                                                    required
                                                    className="h-10 pl-10 bg-slate-50/50 border-transparent rounded-lg focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all font-bold text-xs"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <Label htmlFor="email" className="text-[9px] font-black uppercase tracking-widest text-foreground/20 ml-1">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="email@example.com"
                                                required
                                                className="h-10 pl-10 bg-slate-50/50 border-transparent rounded-lg focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all font-bold text-xs"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between ml-1">
                                            <Label htmlFor="password" className="text-[9px] font-black uppercase tracking-widest text-foreground/20">Password</Label>
                                            {view === "login" && (
                                                <button type="button" className="text-[8px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">Forgot?</button>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20" />
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                required
                                                className="h-10 pl-10 bg-slate-50/50 border-transparent rounded-lg focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all font-bold text-xs"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 rounded-lg bg-foreground hover:bg-[#0d0c22] text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-foreground/5 transition-all active:scale-[0.98] group/btn"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    view === "login" ? "Sign In" : "Register Now"
                                )}
                                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em] hover:text-primary transition-colors"
                                onClick={() => setView(view === "login" ? "signup" : "login")}
                            >
                                {view === "login" ? "New here? Create account" : "Member? Sign in here"}
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
