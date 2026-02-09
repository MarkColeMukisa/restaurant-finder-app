"use client";

import React, { useState, useEffect } from "react";
import {
    LayoutDashboard,
    Users,
    Store,
    TrendingUp,
    Loader2,
    Heart,
    MessageSquare,
    Camera,
    Star
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend
} from "recharts";

const COLORS = ["#16a34a", "#2563eb", "#dc2626", "#ea580c", "#7c3aed", "#0891b2", "#ca8a04", "#be185d"];

export default function AdminDashboardPage() {
    const [statsData, setStatsData] = useState({
        totalUsers: 0,
        totalRestaurants: 0,
        totalReviews: 0,
        totalFavorites: 0,
        totalInquiries: 0,
        totalPhotos: 0,
        systemStatus: "Operational",
        cuisineDistribution: [],
        weeklyActivity: [],
        topRestaurants: []
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
            description: "Registered platform users",
            color: "text-blue-500"
        },
        {
            label: "Restaurants",
            value: isLoading ? null : statsData.totalRestaurants.toLocaleString(),
            icon: Store,
            description: "Active listings",
            color: "text-green-500"
        },
        {
            label: "Reviews",
            value: isLoading ? null : statsData.totalReviews.toLocaleString(),
            icon: Star,
            description: "User reviews submitted",
            color: "text-amber-500"
        },
        {
            label: "Favorites",
            value: isLoading ? null : statsData.totalFavorites.toLocaleString(),
            icon: Heart,
            description: "Saved by users",
            color: "text-red-500"
        },
        {
            label: "Inquiries",
            value: isLoading ? null : statsData.totalInquiries.toLocaleString(),
            icon: MessageSquare,
            description: "Contact requests",
            color: "text-purple-500"
        },
        {
            label: "Photos",
            value: isLoading ? null : statsData.totalPhotos.toLocaleString(),
            icon: Camera,
            description: "Traveler uploads",
            color: "text-cyan-500"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">Dashboard</h1>
                <p className="text-slate-500 mt-1 font-medium">Real-time platform overview and performance metrics.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} className="border-slate-200 shadow-sm bg-white overflow-hidden group hover:border-primary/20 transition-all">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                                <div className="text-2xl font-black text-slate-900 tracking-tighter">
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin text-slate-200" />
                                    ) : (
                                        stat.value
                                    )}
                                </div>
                                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tight">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Area Chart */}
                <Card className="lg:col-span-2 border-slate-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-slate-50 pb-4">
                        <CardTitle className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Platform Growth
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {isLoading ? (
                            <div className="h-[280px] flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-slate-200" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={statsData.weeklyActivity}>
                                    <defs>
                                        <linearGradient id="colorRestaurants" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            fontSize: '12px'
                                        }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                                    <Area
                                        type="monotone"
                                        dataKey="restaurants"
                                        stroke="#16a34a"
                                        fillOpacity={1}
                                        fill="url(#colorRestaurants)"
                                        strokeWidth={2}
                                        name="Restaurants"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#2563eb"
                                        fillOpacity={1}
                                        fill="url(#colorUsers)"
                                        strokeWidth={2}
                                        name="Users"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Cuisine Pie Chart */}
                <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-slate-50 pb-4">
                        <CardTitle className="text-lg font-black text-slate-900 tracking-tight">Cuisine Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        {isLoading ? (
                            <div className="h-[280px] flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-slate-200" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={statsData.cuisineDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {statsData.cuisineDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            fontSize: '12px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Top Restaurants & System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Restaurants */}
                <Card className="lg:col-span-2 border-slate-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-slate-50 pb-4">
                        <CardTitle className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <Star className="h-5 w-5 text-amber-500" />
                            Top Rated Restaurants
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                            <div className="h-[200px] flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-slate-200" />
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {statsData.topRestaurants.map((restaurant, i) => (
                                    <div key={restaurant.id} className="flex items-center gap-4 p-4 hover:bg-slate-50/50 transition-colors">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                                            #{i + 1}
                                        </div>
                                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                            {restaurant.imageUrl ? (
                                                <img src={restaurant.imageUrl} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <Store size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-900 truncate">{restaurant.name}</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                {restaurant.reviews || 0} reviews
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 rounded-full">
                                            <Star size={12} className="text-amber-500" fill="currentColor" />
                                            <span className="text-sm font-black text-amber-600">{restaurant.rating?.toFixed(1) || "N/A"}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* System Status */}
                <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-slate-50 pb-4">
                        <CardTitle className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <LayoutDashboard className="h-5 w-5 text-green-500" />
                            System Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {[
                                { title: "Database", status: "Operational", type: "success" },
                                { title: "API Gateway", status: "Operational", type: "success" },
                                { title: "Image CDN", status: "Operational", type: "success" },
                                { title: "Authentication", status: "Operational", type: "success" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4">
                                    <span className="text-sm font-bold text-slate-700">{item.title}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-green-600">{item.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
