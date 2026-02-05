"use client";

import React, { useState, useEffect } from "react";
import { LayoutDashboard, Users, Store, TrendingUp, Loader2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export default function AdminDashboardPage() {
    const [statsData, setStatsData] = useState({
        totalUsers: 0,
        totalRestaurants: 0,
        pendingReviews: 0,
        systemStatus: "Operational"
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/admin/dashboard/stats");
                if (response.ok) {
                    const data = await response.json();
                    setStatsData(data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const stats = [
        {
            label: "Total Users",
            value: isLoading ? null : statsData.totalUsers.toLocaleString(),
            icon: Users,
            description: "Registered platform users"
        },
        {
            label: "Active Restaurants",
            value: isLoading ? null : statsData.totalRestaurants.toLocaleString(),
            icon: Store,
            description: "Live establishment listings"
        },
        {
            label: "Pending Reviews",
            value: isLoading ? null : statsData.pendingReviews,
            icon: TrendingUp,
            description: "Requires moderator approval"
        },
        {
            label: "System Status",
            value: isLoading ? null : statsData.systemStatus,
            icon: LayoutDashboard,
            description: "All infrastructure nodes active"
        },
    ];

    return (
        <div className="space-y-8">
            {/* Standard Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">Dashboard</h1>
                <p className="text-slate-500 mt-1 font-medium">Real-time platform overview and performance metrics.</p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} className="border-slate-200 shadow-sm bg-white overflow-hidden group hover:border-primary/20 transition-all">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                                    {stat.label}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-slate-900 tracking-tighter">
                                    {isLoading ? (
                                        <Loader2 className="h-6 w-6 animate-spin text-slate-200" />
                                    ) : (
                                        stat.value
                                    )}
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight italic">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Secondary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-slate-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-slate-50">
                        <CardTitle className="text-lg font-black text-slate-900 tracking-tight">Platform Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                        <div className="text-center space-y-2">
                            <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mx-auto">
                                <TrendingUp size={24} />
                            </div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-300">Advanced Analytics Hub Coming Soon</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-slate-50">
                        <CardTitle className="text-lg font-black text-slate-900 tracking-tight">Recent System Events</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {[
                                { title: "Restaurant Registry Sync", time: "Just now", status: "success" },
                                { title: "User Access Audit", time: "12m ago", status: "info" },
                                { title: "API Node Optimization", time: "45m ago", status: "warning" },
                            ].map((event, i) => (
                                <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors cursor-default">
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{event.title}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{event.time}</p>
                                    </div>
                                    <div className={`h-2 w-2 rounded-full shadow-sm ${event.status === 'success' ? 'bg-green-500 shadow-green-500/20' :
                                            event.status === 'info' ? 'bg-blue-500 shadow-blue-500/20' : 'bg-amber-500 shadow-amber-500/20'
                                        }`} />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
