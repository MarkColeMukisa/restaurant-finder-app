"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
    Users,
    Search,
    Shield,
    UserMinus,
    UserCheck,
    Mail,
    Calendar,
    Loader2,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    AlertCircle
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function UserManagementPage() {
    const { data: session } = authClient.useSession();
    const currentUser = session?.user;

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal states
    const [selectedUser, setSelectedUser] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Edit form state
    const [editRole, setEditRole] = useState("");

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await authClient.admin.listUsers({
                query: { limit: 50 }
            });
            if (error) throw error;
            setUsers(data.users || []);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            toast.error("Failed to retrieve user directory.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleBanUser = async () => {
        if (!selectedUser) return;

        if (selectedUser.id === currentUser?.id) {
            toast.error("Security Override: You cannot deactivate your own administrative account.");
            return;
        }

        setIsUpdating(true);
        try {
            const { error } = selectedUser.banned
                ? await authClient.admin.unbanUser({ userId: selectedUser.id })
                : await authClient.admin.banUser({
                    userId: selectedUser.id,
                    banReason: "Administrative action"
                });

            if (error) throw error;
            toast.success(`User account ${selectedUser.banned ? 'fully restored' : 'deactivated'} successfully.`);
            setIsDeactivateOpen(false);
            fetchUsers();
        } catch (error) {
            toast.error("Failed to update user status.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSetRole = async () => {
        if (!selectedUser) return;

        if (selectedUser.id === currentUser?.id) {
            toast.error("Security Override: You cannot modify your own administrative security tier.");
            return;
        }

        setIsUpdating(true);
        try {
            const { error } = await authClient.admin.setRole({
                userId: selectedUser.id,
                role: editRole
            });
            if (error) throw error;
            toast.success(`User role updated to ${editRole}.`);
            setIsEditOpen(false);
            fetchUsers();
        } catch (error) {
            toast.error("Failed to update user role.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;

        if (selectedUser.id === currentUser?.id) {
            toast.error("Security Override: You cannot terminate your own administrative session.");
            return;
        }

        setIsUpdating(true);
        try {
            const { error } = await authClient.admin.removeUser({
                userId: selectedUser.id
            });
            if (error) throw error;
            toast.success("User account deleted permanently.");
            setIsDeleteOpen(false);
            fetchUsers();
        } catch (error) {
            toast.error("Failed to delete user.");
        } finally {
            setIsUpdating(false);
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditRole(user.role);
        setIsEditOpen(true);
    };

    const openViewModal = (user) => {
        setSelectedUser(user);
        setIsViewOpen(true);
    };

    const openDeactivateModal = (user) => {
        setSelectedUser(user);
        setIsDeactivateOpen(true);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setIsDeleteOpen(true);
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header section with branding and search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">User Management</h1>
                    <p className="text-slate-500 mt-1 font-medium">Platform identity control and access oversight.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-10 w-80 bg-white border-slate-200 shadow-sm focus:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* User Directory Table */}
            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold text-slate-900">User Identification</th>
                                <th className="px-6 py-4 font-semibold text-slate-900">Security Tier</th>
                                <th className="px-6 py-4 font-semibold text-slate-900">Onboarding Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-900">Account Status</th>
                                <th className="px-6 py-4 text-right font-semibold text-slate-900 truncate">System Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                            <span className="font-medium">Syncing user directory...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-slate-500 italic">
                                        No matching records found in the database.
                                    </td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 shadow-inner overflow-hidden">
                                                {user.image ? (
                                                    <img src={user.image} alt="" className="w-full h-full object-cover" />
                                                ) : user.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-slate-900">{user.name}</p>
                                                    {user.id === currentUser?.id && (
                                                        <Badge variant="secondary" className="bg-slate-100 text-slate-500 hover:bg-slate-100 border-none px-1.5 py-0 text-[9px] font-black h-4 rounded-sm tracking-tight">YOU</Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="outline" className={`rounded-md font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 ${user.role === 'admin'
                                            ? 'border-primary/30 text-primary bg-primary/5 shadow-sm'
                                            : 'text-slate-500 border-slate-200'
                                            }`}>
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                        {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={`rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${user.banned
                                            ? 'bg-red-50 text-red-600 border border-red-100 shadow-sm'
                                            : 'bg-green-50 text-green-600 border border-green-100 shadow-sm'
                                            }`}>
                                            {user.banned ? 'Deactivated' : 'Active'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full">
                                                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border-slate-200 shadow-xl bg-white">
                                                <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">Control Panel</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => openViewModal(user)} className="rounded-lg cursor-pointer focus:bg-slate-100">
                                                    <Eye className="mr-3 h-4 w-4 text-slate-400" /> View Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => openEditModal(user)}
                                                    disabled={user.id === currentUser?.id}
                                                    className={`rounded-lg cursor-pointer focus:bg-slate-100 ${user.id === currentUser?.id ? 'opacity-50 grayscale' : ''}`}
                                                >
                                                    <Pencil className="mr-3 h-4 w-4 text-slate-400" /> Edit Permissions
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="my-1 border-slate-100" />
                                                <DropdownMenuItem
                                                    onClick={() => openDeactivateModal(user)}
                                                    disabled={user.id === currentUser?.id}
                                                    className={`rounded-lg cursor-pointer font-medium focus:bg-slate-100 ${user.id === currentUser?.id ? 'opacity-50 grayscale' : ''}`}
                                                >
                                                    {user.banned ? (
                                                        <><UserCheck className="mr-3 h-4 w-4 text-green-500" /> Restore Access</>
                                                    ) : (
                                                        <><UserMinus className="mr-3 h-4 w-4 text-amber-500" /> Deactivate Account</>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className={`rounded-lg cursor-pointer text-red-600 font-bold focus:bg-red-50 ${user.id === currentUser?.id ? 'opacity-50 grayscale' : ''}`}
                                                    onClick={() => openDeleteModal(user)}
                                                    disabled={user.id === currentUser?.id}
                                                >
                                                    <Trash2 className="mr-3 h-4 w-4" /> Terminate Account
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Enhanced View User Modal */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-md rounded-2xl border border-slate-200 shadow-2xl bg-white p-0 overflow-hidden">
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-slate-900 leading-none">User Metadata</DialogTitle>
                            <DialogDescription className="text-slate-500 mt-2">Comprehensive profile information for administrative review.</DialogDescription>
                        </DialogHeader>
                    </div>
                    {selectedUser && (
                        <div className="space-y-6 p-6 pt-0">
                            <div className="flex items-center gap-5 p-5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-2xl font-black border border-slate-200 shadow-sm overflow-hidden shrink-0">
                                    {selectedUser.image ? (
                                        <img src={selectedUser.image} alt="" className="w-full h-full object-cover" />
                                    ) : selectedUser.name?.charAt(0)}
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                    <h3 className="font-black text-lg text-slate-900 tracking-tight truncate">{selectedUser.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium truncate">{selectedUser.email}</p>
                                    <Badge variant="outline" className="mt-1 rounded-full px-3 py-0 scale-90 origin-left border-primary/20 text-primary uppercase font-black text-[9px] tracking-widest whitespace-nowrap">
                                        {selectedUser.role}
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-6 gap-x-6">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Status</Label>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-2 w-2 rounded-full ${selectedUser.banned ? 'bg-red-500' : 'bg-green-500'} shadow-[0_0_8px_rgba(34,197,94,0.3)]`} />
                                        <p className={`font-bold text-sm ${selectedUser.banned ? 'text-red-600' : 'text-green-600'}`}>
                                            {selectedUser.banned ? 'Deactivated' : 'Active Account'}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Onboarding</Label>
                                    <p className="text-sm font-bold text-slate-700">{new Date(selectedUser.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                                </div>
                                <div className="space-y-1.5 col-span-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Identifier (UUID)</Label>
                                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] font-mono text-slate-500 break-all leading-tight">{selectedUser.id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="bg-slate-50/50 p-6 border-t border-slate-100 sm:justify-start">
                        <Button variant="outline" onClick={() => setIsViewOpen(false)} className="w-full sm:w-auto font-bold rounded-lg border-slate-200">Close Overview</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Refined Edit User Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-sm rounded-2xl border border-slate-200 shadow-2xl bg-white p-0 overflow-hidden">
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-slate-900 leading-none">Adjust Permissions</DialogTitle>
                            <DialogDescription className="text-slate-500 mt-2 tracking-tight">Modify the user's access privileges within the system.</DialogDescription>
                        </DialogHeader>
                    </div>
                    {selectedUser && (
                        <div className="px-6 py-6 border-y border-slate-100 bg-slate-50/30">
                            <div className="space-y-3">
                                <Label htmlFor="role" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Role</Label>
                                <Select value={editRole} onValueChange={setEditRole}>
                                    <SelectTrigger id="role" className="h-11 border-slate-200 rounded-lg focus:ring-primary/10 shadow-sm font-bold bg-white">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl p-2 border-slate-200 bg-white shadow-xl">
                                        <SelectItem value="user" className="rounded-lg py-3 focus:bg-transparent focus:text-inherit data-[highlighted]:bg-transparent data-[highlighted]:text-inherit transition-none">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">Standard User</span>
                                                <span className="text-[10px] text-slate-500">Limited to restaurant browsing and reviews.</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="admin" className="rounded-lg py-3 focus:bg-transparent focus:text-inherit data-[highlighted]:bg-transparent data-[highlighted]:text-inherit transition-none">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-primary">System Admin</span>
                                                <span className="text-[10px] text-slate-500">Full control over all platform data.</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="p-6 gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsEditOpen(false)} className="flex-1 font-bold rounded-lg text-slate-500">Cancel</Button>
                        <Button
                            onClick={handleSetRole}
                            disabled={isUpdating}
                            className="flex-1 bg-primary text-white font-bold rounded-lg px-8 shadow-sm shadow-primary/20"
                        >
                            {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Authorise"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirmation Modal for Deactivation */}
            <Dialog open={isDeactivateOpen} onOpenChange={setIsDeactivateOpen}>
                <DialogContent className="max-w-sm rounded-2xl border border-slate-200 shadow-2xl bg-white p-0 overflow-hidden">
                    <div className="p-6 pt-8">
                        <DialogHeader className="space-y-3">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center border mx-auto sm:mx-0 ${selectedUser?.banned ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                                {selectedUser?.banned ? <UserCheck className="h-6 w-6 text-green-500" /> : <AlertCircle className="h-6 w-6 text-amber-500" />}
                            </div>
                            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                                {selectedUser?.banned ? 'Restore Access?' : 'Deactivate Account?'}
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium">
                                {selectedUser?.banned
                                    ? "This will re-enable all platform features for this user immediately."
                                    : "This user will be barred from signing in until an administrator manually restores access."}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    {selectedUser && (
                        <div className="px-6 py-5 bg-slate-50 border-y border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600 shadow-sm shrink-0">
                                    {selectedUser.name?.charAt(0)}
                                </div>
                                <div className="space-y-0.5 overflow-hidden">
                                    <p className="text-sm font-black text-slate-900 truncate">{selectedUser.name}</p>
                                    <p className="text-[11px] font-medium text-slate-400 truncate">{selectedUser.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="p-6 gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsDeactivateOpen(false)} className="flex-1 font-bold rounded-lg text-slate-500 hover:bg-slate-50/30">Abort</Button>
                        <Button
                            onClick={handleBanUser}
                            disabled={isUpdating || selectedUser?.id === currentUser?.id}
                            className={`flex-1 font-bold rounded-lg px-8 shadow-sm ${selectedUser?.banned ? 'bg-green-600 text-white shadow-green-500/10' : 'bg-amber-500 text-white shadow-amber-500/10'} ${selectedUser?.id === currentUser?.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (selectedUser?.banned ? "Confirm Restoration" : "Confirm Deactivation")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Destructive Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="max-w-sm rounded-2xl border border-slate-200 shadow-2xl bg-white p-0 overflow-hidden">
                    <div className="p-6 pt-8">
                        <DialogHeader className="space-y-3">
                            <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center border border-red-100 mx-auto sm:mx-0">
                                <Trash2 className="h-6 w-6 text-red-500" />
                            </div>
                            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tighter leading-none">Terminate Account?</DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium">
                                This action is **irreversible**. All session data, preferences, and contributions will be purged from the core database.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    {selectedUser && (
                        <div className="px-6 py-5 bg-red-50/50 border-y border-red-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">Subject for deletion</p>
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-white border border-red-100 flex items-center justify-center font-bold text-xs text-red-600 shadow-sm shrink-0">
                                    {selectedUser.name?.charAt(0)}
                                </div>
                                <div className="space-y-0.5 overflow-hidden">
                                    <p className="text-sm font-black text-slate-900 truncate">{selectedUser.name}</p>
                                    <p className="text-[11px] font-medium text-slate-400 truncate">{selectedUser.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="p-6 gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsDeleteOpen(false)} className="flex-1 font-bold rounded-lg text-slate-500 hover:bg-slate-50/30">Abort</Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteUser}
                            disabled={isUpdating || selectedUser?.id === currentUser?.id}
                            className={`flex-1 font-bold rounded-lg px-8 shadow-sm shadow-red-500/20 ${selectedUser?.id === currentUser?.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Terminate"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
