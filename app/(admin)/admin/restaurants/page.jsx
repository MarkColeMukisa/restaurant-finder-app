"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
    Store,
    Search,
    MapPin,
    Star,
    MoreVertical,
    Eye,
    Edit3,
    Trash2,
    CheckCircle2,
    Clock,
    DollarSign,
    Loader2,
    Plus,
    X,
    Globe,
    Phone,
    Mail,
    UtensilsCrossed,
    Info,
    Image as ImageIcon,
    ExternalLink,
    Map as MapIcon,
    ShieldCheck
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
import { Checkbox } from "@/components/ui/checkbox";
import { Dropzone } from "@/components/ui/dropzone";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";

const CUISINES = ["Italian", "Japanese", "Mexican", "French", "Indian", "Seafood", "American", "Korean", "Mediterranean", "Thai", "Greek"];
const PRICE_RANGES = ["$", "$$", "$$$", "$$$$"];
const AMENITIES_LIST = [
    "Outdoor Seating",
    "Free Wi-Fi",
    "Reservations",
    "Good for Groups",
    "Clean & Safe",
    "Late Night Menu",
    "Vegetarian Options",
    "Vegan Options",
    "Parking Available",
    "Live Music"
];
const LANGUAGES_LIST = ["English", "Italian", "Spanish", "Japanese", "French", "Greek", "Chinese", "Hindi", "German", "Korean"];

export default function RestaurantManagementPage() {
    const [dbRestaurants, setDbRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    // Modal States
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        latitude: "",
        longitude: "",
        cuisine: [],
        priceRange: "$$",
        distance: "0.5 km",
        openHours: "9:00 AM - 10:00 PM",
        imageUrl: "",
        images: [],
        amenities: [],
        isVegetarianFriendly: false,
        isTouristFavorite: false,
        languages: ["English"],
        websiteUrl: "",
        menuUrl: "",
        phoneNumber: "",
        email: "",
        rating: "0",
        reviews: "0",
        isPopular: false,
        travelerPhotos: []
    });

    const fetchRestaurants = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/restaurants");
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            setDbRestaurants(data);
        } catch (error) {
            console.error(error);
            toast.error("Cloud Error: Unable to sync with restaurant registry.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);

    const filteredRestaurants = dbRestaurants.filter(res =>
        res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.cuisine?.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const toggleListItem = (listName, item) => {
        setFormData(prev => ({
            ...prev,
            [listName]: prev[listName].includes(item)
                ? prev[listName].filter(i => i !== item)
                : [...prev[listName], item]
        }));
    };

    const addTravelerPhoto = () => {
        setFormData(prev => ({
            ...prev,
            travelerPhotos: [
                ...prev.travelerPhotos,
                { imageUrl: "", caption: "", user: "" }
            ]
        }));
    };

    const removeTravelerPhoto = (index) => {
        setFormData(prev => ({
            ...prev,
            travelerPhotos: prev.travelerPhotos.filter((_, i) => i !== index)
        }));
    };

    const handleTravelerPhotoChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            travelerPhotos: prev.travelerPhotos.map((photo, i) =>
                i === index ? { ...photo, [field]: value } : photo
            )
        }));
    };

    const openAddModal = () => {
        setFormData({
            name: "",
            description: "",
            address: "",
            latitude: "",
            longitude: "",
            cuisine: [],
            priceRange: "",
            distance: "0.5 km",
            openHours: "9:00 AM - 10:00 PM",
            imageUrl: "",
            images: [],
            amenities: [],
            isVegetarianFriendly: false,
            isTouristFavorite: false,
            languages: ["English"],
            websiteUrl: "",
            menuUrl: "",
            phoneNumber: "",
            email: "",
            rating: "0",
            reviews: "0",
            isPopular: false,
            travelerPhotos: []
        });
        setIsAddOpen(true);
    };

    const openEditModal = async (restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsUpdating(true);
        try {
            const response = await fetch(`/api/admin/restaurants/${restaurant.id}`);
            if (!response.ok) throw new Error("Failed to fetch details");
            const data = await response.json();

            setFormData({
                ...data,
                name: data.name || "",
                description: data.description || "",
                address: data.address || "",
                priceRange: data.priceRange || "",
                distance: data.distance || "",
                openHours: data.openHours || "",
                imageUrl: data.imageUrl || "",
                websiteUrl: data.websiteUrl || "",
                menuUrl: data.menuUrl || "",
                phoneNumber: data.phoneNumber || "",
                email: data.email || "",
                latitude: data.latitude?.toString() || "",
                longitude: data.longitude?.toString() || "",
                rating: data.rating?.toString() || "0",
                reviews: data.reviews?.toString() || "0",
                cuisine: data.cuisine || [],
                images: data.images || [],
                amenities: data.amenities || [],
                languages: data.languages || ["English"],
                travelerPhotos: (data.travelerPhotos || []).map(p => ({
                    ...p,
                    user: p.user || "",
                    caption: p.caption || ""
                }))
            });
            setIsEditOpen(true);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load restaurant details");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCreate = async () => {
        setIsUpdating(true);
        try {
            const response = await fetch("/api/admin/restaurants", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    latitude: formData.latitude ? parseFloat(formData.latitude) : null,
                    longitude: formData.longitude ? parseFloat(formData.longitude) : null,
                    rating: formData.rating ? parseFloat(formData.rating) : 0,
                    reviews: formData.reviews ? parseInt(formData.reviews) : 0
                })
            });
            if (!response.ok) throw new Error("Failed to create");
            toast.success("Establishment registered successfully.");
            setIsAddOpen(false);
            fetchRestaurants();
        } catch (error) {
            toast.error("Provisioning Error: Could not save restaurant record.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleUpdate = async () => {
        if (!selectedRestaurant) return;
        setIsUpdating(true);
        try {
            const response = await fetch(`/api/admin/restaurants/${selectedRestaurant.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    latitude: formData.latitude ? parseFloat(formData.latitude) : null,
                    longitude: formData.longitude ? parseFloat(formData.longitude) : null,
                    rating: formData.rating ? parseFloat(formData.rating) : 0,
                    reviews: formData.reviews ? parseInt(formData.reviews) : 0
                })
            });
            if (!response.ok) throw new Error("Failed to update");
            toast.success("Establishment profile updated.");
            setIsEditOpen(false);
            fetchRestaurants();
        } catch (error) {
            toast.error("Registry Error: Could not sync updates.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedRestaurant) return;
        setIsUpdating(true);
        try {
            const response = await fetch(`/api/admin/restaurants/${selectedRestaurant.id}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Failed to delete");
            toast.success("Establishment record decommissioned.");
            setIsDeleteOpen(false);
            fetchRestaurants();
        } catch (error) {
            toast.error("Decommissioning Error: Could not remove record.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Standard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">Restaurant Inventory</h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage and verify restaurant listings and metadata.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search listings..."
                            className="pl-10 w-64 bg-white border-slate-200 shadow-sm focus:ring-primary/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button onClick={openAddModal} className="bg-primary text-white hover:bg-primary/90 font-bold px-6 rounded-lg shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Add Listing
                    </Button>
                </div>
            </div>

            {/* Standard Data Grid */}
            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold text-slate-900">Establishment</th>
                                <th className="px-6 py-4 font-semibold text-slate-900">Categories</th>
                                <th className="px-6 py-4 font-semibold text-slate-900 text-center">Popular Site</th>
                                <th className="px-6 py-4 font-semibold text-slate-900 text-center">Stats</th>
                                <th className="px-6 py-4 font-semibold text-slate-900">Status</th>
                                <th className="px-6 py-4 text-right font-semibold text-slate-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                            <span className="text-slate-400 font-medium">Syncing inventory...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredRestaurants.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-24 text-center text-slate-500 italic">
                                        No restaurant records found in the registry.
                                    </td>
                                </tr>
                            ) : filteredRestaurants.map((res) => (
                                <tr key={res.id} className="hover:bg-slate-50/40 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shadow-inner group-hover:border-primary/20 transition-colors">
                                                {res.imageUrl ? (
                                                    <img src={res.imageUrl} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                        <Store size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 leading-tight">{res.name}</p>
                                                <div className="flex flex-col gap-0.5 mt-1">
                                                    <div className="flex items-center gap-1 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                                                        <MapPin size={9} className="text-primary/70" />
                                                        <span className="truncate max-w-[140px]">{res.address}</span>
                                                    </div>
                                                    {res.phoneNumber && (
                                                        <div className="flex items-center gap-1 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                                                            <Phone size={9} className="text-primary/70" />
                                                            <span>{res.phoneNumber}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {res.cuisine?.slice(0, 3).map((c, i) => (
                                                <Badge key={i} variant="outline" className="text-[9px] font-black uppercase tracking-tighter px-1.5 py-0 border-slate-200 text-slate-500 bg-slate-50">
                                                    {c}
                                                </Badge>
                                            ))}
                                            {res.cuisine?.length > 3 && <span className="text-[9px] text-slate-300 font-bold">+{res.cuisine.length - 3}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center">
                                            <div
                                                onClick={async () => {
                                                    const newStatus = !res.isPopular;
                                                    try {
                                                        const response = await fetch(`/api/admin/restaurants/${res.id}`, {
                                                            method: "PATCH",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({ isPopular: newStatus })
                                                        });
                                                        if (response.ok) {
                                                            toast.success(`${res.name} ${newStatus ? 'is now marked as Popular' : 'is no longer marked as Popular'}`);
                                                            fetchRestaurants();
                                                        }
                                                    } catch (e) {
                                                        toast.error("Failed to update status");
                                                    }
                                                }}
                                                className={`h-6 w-11 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${res.isPopular ? 'bg-primary' : 'bg-slate-200'}`}
                                            >
                                                <div className={`h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${res.isPopular ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex items-center gap-1 text-slate-900 font-bold">
                                                <Star size={12} className="text-amber-400 fill-amber-400" />
                                                <span className="text-[13px] tracking-tight">{res.rating || "0.0"}</span>
                                            </div>
                                            <span className="text-slate-400 font-medium text-[10px] tabular-nums tracking-tighter uppercase">{res.reviews || 0} Reviews</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <Badge variant="secondary" className="bg-slate-50 text-slate-600 border-slate-100 font-bold px-2 py-0.5 text-[10px]">
                                                {res.priceRange || "N/A"}
                                            </Badge>
                                            <div className="flex flex-wrap gap-1 justify-center">
                                                {res.isTouristFavorite && (
                                                    <Badge className="bg-primary/5 text-primary hover:bg-primary/5 rounded-md px-1.5 py-0 text-[8px] font-black uppercase tracking-[0.1em] border border-primary/10 shadow-sm">
                                                        Elite
                                                    </Badge>
                                                )}
                                                <Badge className="bg-green-50 text-green-700 hover:bg-green-50 rounded-md px-1.5 py-0 text-[8px] font-black uppercase tracking-[0.1em] border border-green-200 shadow-sm">
                                                    LIVE
                                                </Badge>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-slate-400">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditModal(res)}
                                                className="h-9 w-9 hover:text-slate-900 hover:bg-slate-100 rounded-lg group-hover:bg-slate-50 transition-colors"
                                            >
                                                <Edit3 size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedRestaurant(res);
                                                    setIsDeleteOpen(true);
                                                }}
                                                className="h-9 w-9 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Comprehensive Add/Edit Sheet */}
            <Sheet open={isAddOpen || isEditOpen} onOpenChange={(open) => {
                if (!open) {
                    setIsAddOpen(false);
                    setIsEditOpen(false);
                }
            }}>
                <SheetContent className="sm:max-w-xl w-full p-0 border-none shadow-2xl bg-white flex flex-col h-full">
                    <SheetHeader className="p-8 pb-4 bg-slate-50/50 border-b border-slate-100">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-primary border border-slate-100 shadow-sm">
                                <Store size={24} />
                            </div>
                            <div>
                                <SheetTitle className="text-3xl font-black text-slate-900 tracking-tighter">
                                    {isAddOpen ? "Register Establishment" : "Modify Profile"}
                                </SheetTitle>
                                <SheetDescription className="font-medium text-slate-500">
                                    {isAddOpen ? "Onboard a new restaurant listing." : "Update establishment metadata."}
                                </SheetDescription>
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-8 space-y-12 pb-24 custom-scrollbar">
                        <style jsx global>{`
                            .custom-scrollbar::-webkit-scrollbar {
                                width: 6px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                                background: transparent;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: #e2e8f0;
                                border-radius: 10px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: #cbd5e1;
                            }
                        `}</style>

                        {/* Section 1: General Identity */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Identity & Branding</span>
                                <div className="h-px bg-slate-100 flex-1" />
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2.5">
                                    <Label htmlFor="name" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Official Name</Label>
                                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. The Golden Olive" className="rounded-xl border-slate-200 h-12 font-bold px-4 bg-slate-50/30" />
                                </div>

                                <div className="space-y-2.5">
                                    <Label htmlFor="priceRange" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Price Range</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                        <Input id="priceRange" name="priceRange" value={formData.priceRange} onChange={handleInputChange} placeholder="e.g. $40 - $80" className="pl-11 rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium">Input the typical cost range per person.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2.5">
                                        <Label htmlFor="rating" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Manual Rating</Label>
                                        <div className="relative">
                                            <Star className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400" />
                                            <Input id="rating" name="rating" type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={handleInputChange} placeholder="0.0" className="pl-11 rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <Label htmlFor="reviews" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Review Count</Label>
                                        <Input id="reviews" name="reviews" type="number" min="0" value={formData.reviews} onChange={handleInputChange} placeholder="0" className="rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="description" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Professional Description</Label>
                                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Detailed establishment narrative..." className="rounded-xl border-slate-200 min-h-[120px] font-medium leading-relaxed bg-slate-50/30" />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Cuisine Expertise</Label>
                                <div className="flex flex-wrap gap-2">
                                    {CUISINES.map(c => (
                                        <Badge
                                            key={c}
                                            onClick={() => toggleListItem("cuisine", c)}
                                            className={`rounded-lg px-3 py-2 cursor-pointer border transition-all ${formData.cuisine.includes(c) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-slate-500 border-slate-100 hover:border-primary/20 hover:bg-slate-50'}`}
                                        >
                                            {c}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Global Positioning */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Location Intelligence</span>
                                <div className="h-px bg-slate-100 flex-1" />
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2.5">
                                    <Label htmlFor="address" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Physical Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                        <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street, City, Country" className="pl-11 rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2.5">
                                        <Label htmlFor="latitude" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Latitude</Label>
                                        <Input id="latitude" name="latitude" type="number" step="any" value={formData.latitude} onChange={handleInputChange} placeholder="0.0000" className="rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <Label htmlFor="longitude" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Longitude</Label>
                                        <Input id="longitude" name="longitude" type="number" step="any" value={formData.longitude} onChange={handleInputChange} placeholder="0.0000" className="rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                    </div>
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="distance" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Reference Distance</Label>
                                    <Input id="distance" name="distance" value={formData.distance} onChange={handleInputChange} placeholder="0.5 km" className="rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Digital Channels */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Digital & Communications</span>
                                <div className="h-px bg-slate-100 flex-1" />
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2.5">
                                    <Label htmlFor="websiteUrl" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Official Website</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                        <Input id="websiteUrl" name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} placeholder="https://..." className="pl-11 rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                    </div>
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="menuUrl" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Direct Menu Link</Label>
                                    <div className="relative">
                                        <UtensilsCrossed className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                        <Input id="menuUrl" name="menuUrl" value={formData.menuUrl} onChange={handleInputChange} placeholder="https://..." className="pl-11 rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2.5">
                                        <Label htmlFor="phoneNumber" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Contact Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                            <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+256..." className="pl-11 rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Inquiry Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="info@..." className="pl-11 rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Operational Attributes */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Strategic Features</span>
                                <div className="h-px bg-slate-100 flex-1" />
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex items-center space-x-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all cursor-pointer shadow-sm" onClick={() => setFormData(prev => ({ ...prev, isVegetarianFriendly: !prev.isVegetarianFriendly }))}>
                                        <Checkbox id="isVegetarianFriendly" checked={formData.isVegetarianFriendly} onCheckedChange={(val) => setFormData(p => ({ ...p, isVegetarianFriendly: !!val }))} className="h-6 w-6 rounded-lg data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                        <Label htmlFor="isVegetarianFriendly" className="text-sm font-bold text-slate-700 cursor-pointer pointer-events-none">Vegetarian Friendly</Label>
                                    </div>
                                    <div className="flex items-center space-x-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all cursor-pointer shadow-sm" onClick={() => setFormData(prev => ({ ...prev, isTouristFavorite: !prev.isTouristFavorite }))}>
                                        <Checkbox id="isTouristFavorite" checked={formData.isTouristFavorite} onCheckedChange={(val) => setFormData(p => ({ ...p, isTouristFavorite: !!val }))} className="h-6 w-6 rounded-lg data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                        <Label htmlFor="isTouristFavorite" className="text-sm font-bold text-slate-700 cursor-pointer pointer-events-none">Elite Selection (Tourist Favorite)</Label>
                                    </div>
                                    <div className="flex items-center space-x-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100 border-dashed hover:border-primary/20 transition-all cursor-pointer shadow-sm" onClick={() => setFormData(prev => ({ ...prev, isPopular: !prev.isPopular }))}>
                                        <div className={`h-6 w-11 rounded-full p-1 transition-colors ${formData.isPopular ? 'bg-primary' : 'bg-slate-200'}`}>
                                            <div className={`h-4 w-4 rounded-full bg-white transform transition-transform ${formData.isPopular ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <Label htmlFor="isPopular" className="text-sm font-bold text-slate-700 cursor-pointer pointer-events-none">Promote to Landing Page</Label>
                                            <p className="text-[10px] text-slate-400 font-medium">Mark this as a "Popular" establishment.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="openHours" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Standard Office Hours</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                        <Input id="openHours" name="openHours" value={formData.openHours} onChange={handleInputChange} placeholder="9:00 AM - 10:00 PM" className="pl-11 rounded-xl border-slate-200 h-12 font-bold bg-slate-50/30" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Amenities & Features</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {AMENITIES_LIST.map(amenity => (
                                            <div
                                                key={amenity}
                                                onClick={() => toggleListItem("amenities", amenity)}
                                                className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer shadow-sm ${formData.amenities.includes(amenity) ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                                            >
                                                <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${formData.amenities.includes(amenity) ? 'border-primary bg-primary' : 'border-slate-200'}`}>
                                                    {formData.amenities.includes(amenity) && <CheckCircle2 size={12} className="text-white" />}
                                                </div>
                                                <span className="text-xs font-bold truncate">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 5: Media Assets */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Media & Visual Assets</span>
                                <div className="h-px bg-slate-100 flex-1" />
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Brand Gallery (First = Card Image)</Label>
                                    <Dropzone
                                        provider="cloudinary"
                                        maxFiles={10}
                                        onFilesChange={(files) => {
                                            const urls = files.map(f => f.publicUrl).filter(Boolean);
                                            setFormData(prev => ({
                                                ...prev,
                                                imageUrl: urls[0] || "",
                                                images: urls
                                            }));
                                        }}
                                        initialFiles={formData.images?.length > 0 ? formData.images : (formData.imageUrl ? [formData.imageUrl] : [])}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 6: Traveler Photos (Backend Migration) */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Traveler Community Photos</span>
                                <div className="h-px bg-slate-100 flex-1" />
                            </div>

                            <div className="space-y-6">
                                <p className="text-[11px] text-slate-400 font-medium">Manage authentic traveler photos. These are stored in a dedicated database table for performance.</p>

                                <div className="space-y-4">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Upload Community Photos</Label>
                                    <Dropzone
                                        provider="cloudinary"
                                        maxFiles={10}
                                        onFilesChange={(files) => {
                                            const newPhotos = files
                                                .filter(f => f.publicUrl)
                                                .map(f => {
                                                    // Try to find existing photo by URL to preserve caption/user
                                                    const existing = formData.travelerPhotos.find(p => p.imageUrl === f.publicUrl);
                                                    return {
                                                        imageUrl: f.publicUrl,
                                                        caption: existing?.caption || "",
                                                        user: existing?.user || ""
                                                    };
                                                });
                                            setFormData(prev => ({ ...prev, travelerPhotos: newPhotos }));
                                        }}
                                        initialFiles={formData.travelerPhotos.map(p => p.imageUrl)}
                                    />

                                    {formData.travelerPhotos.length > 0 && (
                                        <div className="space-y-4 mt-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Photo Details</span>
                                            {formData.travelerPhotos.map((photo, index) => (
                                                <div key={index} className="p-4 rounded-2xl bg-white border border-slate-100 flex gap-4 shadow-sm items-center">
                                                    <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                                                        <img src={photo.imageUrl} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 flex-1">
                                                        <Input
                                                            value={photo.user || ""}
                                                            onChange={(e) => handleTravelerPhotoChange(index, "user", e.target.value)}
                                                            placeholder="Photographer..."
                                                            className="rounded-lg h-9 text-xs"
                                                        />
                                                        <Input
                                                            value={photo.caption || ""}
                                                            onChange={(e) => handleTravelerPhotoChange(index, "caption", e.target.value)}
                                                            placeholder="Caption..."
                                                            className="rounded-lg h-9 text-xs"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <SheetFooter className="p-8 bg-white border-t border-slate-100 flex gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                        <Button variant="ghost" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }} className="flex-1 font-bold rounded-xl h-14 text-slate-400 hover:bg-slate-50">Abort</Button>
                        <Button
                            onClick={isAddOpen ? handleCreate : handleUpdate}
                            disabled={isUpdating || !formData.name || !formData.address}
                            className="flex-1 font-bold rounded-xl h-14 bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            {isUpdating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : (isAddOpen ? "Finalize Registration" : "Apply Modifications")}
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            {/* Decommission Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="max-w-md bg-white p-0 rounded-2xl border-none shadow-2xl overflow-hidden">
                    <div className="p-10 text-center space-y-6">
                        <div className="h-16 w-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mx-auto shadow-sm">
                            <Trash2 size={28} />
                        </div>
                        <div className="space-y-2">
                            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tighter">Decommission Entity?</DialogTitle>
                            <DialogDescription className="font-medium text-slate-500 leading-relaxed">
                                This action will permanently remove <span className="text-slate-900 font-bold">{selectedRestaurant?.name}</span> and all associated metadata from the platform registry. This cannot be reversed.
                            </DialogDescription>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <Button variant="ghost" onClick={() => setIsDeleteOpen(false)} className="flex-1 font-bold rounded-xl h-12 text-slate-400">Abort</Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isUpdating}
                                className="flex-1 font-bold rounded-xl h-12 shadow-lg shadow-red-500/20 bg-red-600 text-white hover:bg-red-700 border-none"
                            >
                                {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
