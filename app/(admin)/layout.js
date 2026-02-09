import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { MobileSidebar } from "@/components/admin/MobileSidebar";

export default async function AdminLayout({ children }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Simple RBAC: Redirect to home if not admin
    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-primary/20 selection:text-primary overflow-x-hidden">
            <AdminSidebar />

            <main className="md:ml-64 min-h-screen relative flex flex-col transition-all duration-300">
                {/* Standard Top Bar */}
                <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <MobileSidebar />
                        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500">
                            <span>Admin</span>
                            <span>/</span>
                            <span className="text-slate-900">Dashboard</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-xs font-bold text-slate-900 leading-none">{session.user.name}</p>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">{session.user.role}</p>
                        </div>
                        <div className="h-9 w-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                            {session.user.image ? (
                                <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-xs font-bold text-slate-400">{session.user.name?.charAt(0)}</span>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content Region */}
                <div className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
