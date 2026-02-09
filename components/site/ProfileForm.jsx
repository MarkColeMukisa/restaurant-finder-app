"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, ShieldCheck, Loader2, Save, Lock, Shield, Settings, Heart, Bell } from "lucide-react";

export function ProfileForm({ user }) {
    const [activeTab, setActiveTab] = useState("general");
    const [isLoading, setIsLoading] = useState(false);

    // General Form State
    const [name, setName] = useState(user?.name || "");

    // Security Form State
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleUpdateName = async (e) => {
        e.preventDefault();
        if (name === user?.name) {
            toast.info("No changes to update.");
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await authClient.updateUser({
                name: name,
            });

            if (error) throw error;
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await authClient.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
                revokeOtherSessions: true,
            });

            if (error) throw error;
            toast.success("Password updated successfully!");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            toast.error(error.message || "Failed to update password");
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: "general", label: "General", icon: User },
        { id: "security", label: "Security", icon: Shield },
        { id: "preferences", label: "Preferences", icon: Settings },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 shrink-0 bg-white/50 backdrop-blur-xl rounded-[2rem] p-4 border border-white shadow-sm">
                <nav className="space-y-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-foreground/40 hover:bg-slate-50 hover:text-foreground"
                                    }`}
                            >
                                <Icon size={16} />
                                {tab.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 w-full min-h-[600px] bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.08)] border border-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] -ml-24 -mb-24" />

                <AnimatePresence mode="wait">
                    {activeTab === "general" && (
                        <motion.div
                            key="general"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="relative z-10"
                        >
                            <header className="mb-10">
                                <h2 className="text-3xl font-black tracking-tighter text-foreground mb-2">Account Profile</h2>
                                <p className="text-foreground/40 font-medium">This information will be displayed publicly.</p>
                            </header>

                            <form onSubmit={handleUpdateName} className="space-y-8">
                                <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100/50 group hover:bg-white hover:border-primary/20 transition-all duration-500">
                                    <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-black border-4 border-white shadow-xl overflow-hidden ring-1 ring-slate-100 transition-transform group-hover:scale-105">
                                        {user?.image ? (
                                            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            user?.name?.charAt(0)
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground mb-1">Upload New Photo</h3>
                                        <p className="text-sm text-foreground/40 font-medium">Avatar synced from {user?.image?.includes('google') ? 'Google' : 'Account'}.</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 font-urbanist">
                                    <div className="space-y-3">
                                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 ml-2">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/20" />
                                            <Input
                                                id="name"
                                                placeholder="Enter your full name"
                                                className="h-14 pl-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm shadow-sm"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 opacity-60">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 ml-2">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/20" />
                                            <Input
                                                value={user?.email}
                                                disabled
                                                className="h-14 pl-14 bg-slate-100 border-transparent rounded-2xl font-bold text-sm cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="flex items-center gap-1.5 ml-2 mt-1">
                                            <ShieldCheck size={12} className="text-green-500" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-green-600">Verified Identity</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-50 flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="h-14 px-10 bg-foreground hover:bg-[#0d0c22] text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] shadow-2xl shadow-foreground/10 transition-all active:scale-[0.98] group"
                                    >
                                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                        Update Profile
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === "security" && (
                        <motion.div
                            key="security"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="relative z-10"
                        >
                            <header className="mb-10">
                                <h2 className="text-3xl font-black tracking-tighter text-foreground mb-2">Security Settings</h2>
                                <p className="text-foreground/40 font-medium">Protect your account with a strong password.</p>
                            </header>

                            <form onSubmit={handleChangePassword} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 ml-2">Current Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/20" />
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                className="h-14 pl-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm shadow-sm"
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 ml-2">New Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/20" />
                                                <Input
                                                    type="password"
                                                    placeholder="Minimum 8 characters"
                                                    className="h-14 pl-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm shadow-sm"
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 ml-2">Confirm New Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/20" />
                                                <Input
                                                    type="password"
                                                    placeholder="Repeat new password"
                                                    className="h-14 pl-14 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm shadow-sm"
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-50 flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] group"
                                    >
                                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Shield size={16} className="mr-2" />}
                                        Change Password
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === "preferences" && (
                        <motion.div
                            key="preferences"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="relative z-10 flex flex-col items-center justify-center py-20 text-center"
                        >
                            <div className="bg-slate-50 h-24 w-24 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 ring-8 ring-slate-50/50">
                                <Bell size={40} />
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter text-foreground mb-2">Coming Soon</h2>
                            <p className="text-foreground/40 font-medium max-w-sm">
                                We are currently building preferences and notification settings tailored for your discovery experience.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
