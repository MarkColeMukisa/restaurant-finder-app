"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { ProfileForm } from "@/components/site/ProfileForm";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) {
        redirect("/");
    }

    return (
        <main className="min-h-screen bg-[#fafafa]">
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-5xl mx-auto space-y-16"
                    >
                        {/* Page Header */}
                        <div className="text-center space-y-4">
                            <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.25em]">
                                My Workspace
                            </span>
                            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-foreground leading-tight">
                                Manage <span className="text-primary font-serif italic font-medium">Account.</span>
                            </h1>
                        </div>

                        <ProfileForm user={session.user} />
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
