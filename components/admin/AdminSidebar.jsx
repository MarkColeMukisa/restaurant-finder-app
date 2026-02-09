"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Utensils,
    LayoutDashboard,
    Users,
    Store,
    Settings,
    LogOut,
    MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AdminSidebar({ mobile = false }) {
    const pathname = usePathname();

    const navItems = [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Users", href: "/admin/users", icon: Users },
        { label: "Restaurants", href: "/admin/restaurants", icon: Store },
        { label: "Messages", href: "/admin/inquiries", icon: MessageSquare },
        { label: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <aside className={`${mobile ? 'flex w-full h-full' : 'hidden md:flex w-64 h-screen fixed left-0 top-0'} bg-white border-r border-slate-200 flex-col z-50`}>
            {/* Logo Section */}
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
                    <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
                        <Utensils size={18} />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-900">
                        Admin<span className="text-primary">Panel</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-4">Main Menu</p>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive
                                ? "bg-primary/5 text-primary border border-primary/10"
                                : "text-slate-600 hover:bg-slate-50/50 hover:text-slate-900"
                                }`}>
                                <Icon size={18} className={isActive ? "text-primary" : "text-slate-400"} />
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav-pill"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100">
                <Link href="/" className="block">
                    <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 text-sm font-medium transition-all">
                        <LogOut size={16} />
                        Exit Dashboard
                    </Button>
                </Link>
            </div>
        </aside>
    );
}
