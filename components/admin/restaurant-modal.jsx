"use client";

import { useEffect, useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dropzone } from "@/components/ui/dropzone";
import { Textarea } from "@/components/ui/textarea";

export function RestaurantModal({ isOpen, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: "",
        cuisine: "",
        location: "",
        status: "Active",
        image: null,
        description: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                cuisine: initialData.cuisine || "",
                location: initialData.location || "",
                status: initialData.status || "Active",
                image: initialData.image || null,
                description: initialData.description || "",
                phone: initialData.phone || "",
                email: initialData.email || "",
            });
        } else {
            setFormData({
                name: "",
                cuisine: "",
                location: "",
                status: "Active",
                image: null,
                description: "",
                phone: "",
                email: "",
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleFilesChange = (files) => {
        // Dropzone returns an array of file objects
        const uploadedFile = files[0];
        const newImageUrl = uploadedFile?.publicUrl || null;

        if (formData.image !== newImageUrl) {
            setFormData((prev) => ({ ...prev, image: newImageUrl }));
        }
    };

    const initialFiles = useMemo(() => formData.image ? [formData.image] : [], [formData.image]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {initialData ? "Edit Restaurant" : "Add New Restaurant"}
                    </DialogTitle>
                    <DialogDescription>
                        {initialData ? "Update the details of your restaurant below." : "Fill in the information to list a new restaurant on the platform."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="grid gap-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</Label>
                                <Input
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Bella Italia"
                                    className="h-10"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cuisine" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cuisine</Label>
                                <Input
                                    id="cuisine"
                                    value={formData.cuisine}
                                    onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                                    placeholder="e.g. Italian, Indian"
                                    className="h-10"
                                />
                            </div>
                        </div>

                        {/* Contact & Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Neighborhood or city"
                                    className="h-10"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                                >
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+1 (555) 000-0000"
                                    className="h-10"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="contact@restaurant.com"
                                    className="h-10"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Tell us about the restaurant..."
                                className="min-h-[100px] resize-none"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="grid gap-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Restaurant Image</Label>
                            <Dropzone
                                onFilesChange={handleFilesChange}
                                maxFiles={1}
                                variant="compact"
                                helperText="Upload a high-quality cover image"
                                initialFiles={initialFiles}
                            />
                            {formData.image && (
                                <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-md border bg-muted">
                                    <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-black/5 flex items-end p-2 text-white">
                                        <span className="text-[10px] bg-black/50 px-2 py-0.5 rounded">Current Image</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="pt-4 border-t">
                        <Button type="button" variant="outline" onClick={onClose} className="px-6">
                            Cancel
                        </Button>
                        <Button type="submit" className="px-8 bg-primary hover:bg-primary/90">
                            {initialData ? "Save Changes" : "Create Restaurant"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
