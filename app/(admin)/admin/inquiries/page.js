"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { MessageSquare, Calendar, Mail, CheckCircle, Circle, RefreshCw, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [inquiryToDelete, setInquiryToDelete] = useState(null);

    const fetchInquiries = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            const res = await fetch("/api/admin/inquiries");
            if (!res.ok) throw new Error("Failed to fetch inquiries");
            const data = await res.json();
            setInquiries(data);
        } catch (error) {
            console.error(error);
            toast.error("Error loading messages");
        } finally {
            setLoading(false);
            if (isRefresh) setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "read" ? "unread" : "read";

        // Optimistic update
        setInquiries(inquiries.map(inq =>
            inq.id === id ? { ...inq, status: newStatus } : inq
        ));

        try {
            const res = await fetch("/api/admin/inquiries", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            toast.success(`Marked as ${newStatus}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
            // Revert optimistic update
            setInquiries(inquiries.map(inq =>
                inq.id === id ? { ...inq, status: currentStatus } : inq
            ));
        }
    };

    const confirmDelete = async () => {
        if (!inquiryToDelete) return;
        const id = inquiryToDelete.id;

        // Optimistic Remove
        setInquiries(inquiries.filter(inq => inq.id !== id));
        setInquiryToDelete(null); // Close modal immediately

        try {
            const res = await fetch(`/api/admin/inquiries?id=${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete message");

            toast.success("Message deleted");
            // Close view modal if it was the same message
            if (selectedInquiry && selectedInquiry.id === id) {
                setSelectedInquiry(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete message");
            // Revert by refetching
            fetchInquiries();
        }
    }

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Messages</h1>
                    <p className="text-slate-500 mt-1">Manage customer inquiries and partnership requests.</p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchInquiries(true)}
                    disabled={refreshing}
                    className="gap-2"
                >
                    <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                    Refresh
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Sender</th>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4">Message</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {inquiries.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                                        <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                        <p>No messages found</p>
                                    </td>
                                </tr>
                            ) : (
                                inquiries.map((inq) => (
                                    <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            {inq.status === "unread" ? (
                                                <Badge variant="default" className="bg-green-500 hover:bg-green-600">Unread</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-500">Read</Badge>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{inq.name}</div>
                                            <div className="text-slate-500 flex items-center gap-1.5 text-xs mt-0.5">
                                                <Mail size={12} /> {inq.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-700">
                                            {inq.subject}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 max-w-sm cursor-pointer" onClick={() => setSelectedInquiry(inq)}>
                                            <p className="truncate hover:text-primary transition-colors" title="Click to view full message">
                                                {inq.message}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} />
                                                {inq.createdAt ? format(new Date(inq.createdAt), "MMM d, yyyy") : "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedInquiry(inq)}
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setInquiryToDelete(inq)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Inquiry Modal */}
            <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <MessageSquare className="text-primary" size={20} />
                            {selectedInquiry?.subject || "No Subject"}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Sent by <span className="font-semibold text-slate-700">{selectedInquiry?.name}</span> ({selectedInquiry?.email}) on {selectedInquiry?.createdAt && format(new Date(selectedInquiry.createdAt), "PPPP p")}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed max-h-[60vh] overflow-y-auto whitespace-pre-wrap">
                        {selectedInquiry?.message}
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <Button variant="outline" onClick={() => setSelectedInquiry(null)}>
                            Close
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                setInquiryToDelete(selectedInquiry);
                                // Note: We don't close this modal here, the Delete dialog will open on top or replace z-index.
                                // But better UX might be to strictly separate them, or ensure Dialog stacking works.
                                // For simplicity/clarity, likely sticking to one open dialog is safer, but shadcn handles stacking.
                                // Let's just trigger the delete dialog state.
                            }}
                            className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
                        >
                            <Trash2 size={16} className="mr-2" /> Delete
                        </Button>
                        {selectedInquiry?.status === "unread" && (
                            <Button onClick={() => {
                                toggleStatus(selectedInquiry.id, "unread");
                                setSelectedInquiry(null);
                            }}>
                                Mark as Read
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!inquiryToDelete} onOpenChange={(open) => !open && setInquiryToDelete(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Message?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the message from <span className="font-bold">{inquiryToDelete?.name}</span>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3 mt-4">
                        <Button variant="outline" onClick={() => setInquiryToDelete(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            className="bg-red-600 text-white hover:bg-red-700 border-none"
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
