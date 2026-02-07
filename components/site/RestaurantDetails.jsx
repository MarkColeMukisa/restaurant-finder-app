"use client";

import React from "react";
import {
    Star,
    MapPin,
    Clock,
    Globe,
    ShieldCheck,
    Heart,
    Share2,
    ChevronLeft,
    UtensilsCrossed,
    Phone,
    Mail,
    PenLine,
    ArrowRight,
    Users
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useFavorites } from "@/hooks/useFavorites";

export function RestaurantDetails({ restaurant, initialReviews = [], initialRelated = [], travelerPhotos = [] }) {
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [activeImage, setActiveImage] = useState(null);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    // Initialize with server-fetched data
    const [reviewsData, setReviewsData] = useState(initialReviews);
    const [hasMore, setHasMore] = useState(initialReviews.length >= 6);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    // relatedRestaurants doesn't need state if it doesn't change, but consistent variable naming helps
    const relatedRestaurants = initialRelated;

    React.useEffect(() => {
        if (restaurant) {
            setActiveImage(restaurant.imageUrl);
        }
    }, [restaurant]);

    const hasGallery = restaurant?.images && restaurant.images.length > 0;

    const [authOpen, setAuthOpen] = useState(false);
    const [authView, setAuthView] = useState("login");
    const { data: session } = authClient.useSession();

    const { isFavorite, toggleFavorite } = useFavorites();

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        try {
            const offset = reviewsData.length;
            const response = await fetch(`/api/reviews/list?restaurantId=${restaurant.id}&limit=6&offset=${offset}`);
            if (response.ok) {
                const newReviews = await response.json();
                if (newReviews.length < 6) {
                    setHasMore(false);
                }
                setReviewsData([...reviewsData, ...newReviews]);
            }
        } catch (error) {
            console.error("Failed to load more reviews", error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const handleReviewClick = () => {
        if (!session) {
            setAuthView("signup");
            setAuthOpen(true);
            return;
        }
        setIsReviewOpen(true);
    };

    const handleSubmitReview = async () => {
        if (selectedRating === 0 || !reviewTitle.trim() || !reviewContent.trim() || !session) {
            return;
        }

        try {
            const payload = {
                restaurantId: restaurant.id,
                rating: selectedRating,
                title: reviewTitle,
                content: reviewContent,
                userName: session.user.name,
                userId: session.user.id,
                userImage: session.user.image,
            };

            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const newReview = await response.json();
                setReviewsData([newReview, ...reviewsData]);
                setIsReviewOpen(false);
                setSelectedRating(0);
                setReviewTitle("");
                setReviewContent("");
            }
        } catch (error) {
            console.error("Failed to submit review", error);
        }
    };

    if (!restaurant) return null;

    return (
        <section className="bg-slate-50 min-h-screen pt-12">
            {/* Header Content - Above Image */}
            <div className="container mx-auto px-6 mb-12 ">
                <Link href="/restaurants">
                    <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-foreground/40 hover:text-primary mb-6">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Back to Discover</span>
                    </Button>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-4"
                >
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tighter leading-none">
                            {restaurant.name}
                        </h1>
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                            <span>{(Array.isArray(restaurant.cuisine) && restaurant.cuisine.length > 0) ? restaurant.cuisine[0] : "Cuisine"}</span>
                            <span className="text-foreground/10">•</span>
                            <span className="text-foreground/40">{restaurant.isTouristFavorite ? "Elite Selection" : "Local Gem"}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 lg:pb-2 ">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-primary rounded-xl border border-primary/10">
                                <Star size={14} className="fill-current" />
                                <span className="font-bold text-sm">{restaurant.rating}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 leading-none mb-1">Elite Rating</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/20">Verified Reviews</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 border border-slate-100 rounded-xl flex items-center justify-center text-primary/40">
                                <Globe size={18} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 leading-none mb-1">Languages</span>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/20">{(Array.isArray(restaurant.languages) ? restaurant.languages.join(", ") : "English")}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 border border-slate-100 rounded-xl flex items-center justify-center text-primary/40">
                                <MapPin size={18} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 leading-none mb-1">Official Address</span>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/20">{restaurant.address}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Hero Image Section - Discovery Gallery */}
            <div className="relative h-[65vh] min-h-[450px] w-full container mx-auto px-6 mb-10">
                <div className="flex gap-4 h-full">
                    {/* Main Image */}
                    <div className="relative flex-1 h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5 border border-slate-100 group">
                        <img
                            src={activeImage || restaurant.imageUrl}
                            alt={restaurant.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Floating Actions */}
                        <div className="absolute top-8 right-8 flex gap-3 z-10">
                            <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white text-foreground rounded-full backdrop-blur-md shadow-sm border border-white/20">
                                <Share2 size={18} />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className={`rounded-full backdrop-blur-md shadow-sm border border-white/20 ${isFavorite(restaurant.id) ? "bg-white text-red-500 hover:bg-white hover:text-red-500" : "bg-white/80 hover:bg-white text-foreground"}`}
                                onClick={() => toggleFavorite(restaurant.id)}
                            >
                                <Heart size={18} fill={isFavorite(restaurant.id) ? "currentColor" : "none"} />
                            </Button>
                        </div>
                    </div>

                    {/* Right Thumbnails Column */}
                    {hasGallery && (
                        <div className="hidden md:flex flex-col gap-4 w-[120px] h-full">
                            {restaurant.images.slice(0, 3).map((img, idx) => (
                                <button
                                    type="button"
                                    key={img}
                                    onClick={() => setActiveImage(img)}
                                    aria-label={`View image ${idx + 1}`}
                                    aria-current={activeImage === img ? "true" : undefined}
                                    className={`relative flex-1 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all p-0 ${activeImage === img ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"}`}
                                >
                                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                            {restaurant.images.length > 3 && (
                                <button
                                    type="button"
                                    onClick={() => setIsGalleryOpen(true)}
                                    aria-label={`View ${restaurant.images.length - 3} more photos`}
                                    className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent bg-slate-100 flex items-center justify-center text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-colors w-full p-0"
                                >
                                    +{restaurant.images.length - 3}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Gallery Modal */}
            <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
                <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-white/95 backdrop-blur-xl border-none">
                    <DialogHeader className="p-6 pb-2 shrink-0">
                        <DialogTitle className="text-xl font-bold tracking-tight">Gallery</DialogTitle>
                        <DialogDescription>
                            Explore {restaurant.images?.length || 0} photos of {restaurant.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto p-6 pt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {restaurant.images?.map((img, idx) => (
                            <button
                                type="button"
                                key={idx}
                                onClick={() => {
                                    setActiveImage(img);
                                    setIsGalleryOpen(false);
                                }}
                                aria-label={`View gallery image ${idx + 1}`}
                                className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group relative p-0 border-none outline-none focus:ring-2 focus:ring-primary w-full"
                            >
                                <img
                                    src={img}
                                    alt={`${restaurant.name} gallery ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-bold uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">View</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Content Grid */}
            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column - Details */}
                    <div className="lg:w-2/3 space-y-16">

                        {/* At a Glance Section */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-foreground tracking-tight">At a glance</h2>

                            <div className="space-y-5">
                                {/* Status & Hours Link */}
                                <div className="flex items-center gap-3 text-[15px] font-medium">
                                    <span className="text-foreground/80 font-bold flex items-center gap-2">
                                        <Clock size={16} className="text-primary" />
                                        {restaurant.openHours}
                                    </span>
                                    <span className="text-foreground/20">|</span>
                                    <Button variant="link" className="p-0 h-auto text-foreground/60 hover:text-primary transition-colors hover:underline underline-offset-4 font-normal">See all hours</Button>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-4 text-[15px] group cursor-pointer">
                                    <div className="mt-0.5 text-foreground/40 group-hover:text-primary transition-colors">
                                        <MapPin size={20} />
                                    </div>
                                    <span className="text-foreground border-b border-foreground/20 group-hover:border-primary pb-0.5 transition-all">
                                        {restaurant.address}
                                    </span>
                                </div>

                                {/* Action Buttons Grid */}
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
                                    {restaurant.websiteUrl && (
                                        <Button
                                            variant="ghost"
                                            onClick={() => window.open(restaurant.websiteUrl, "_blank", "noopener,noreferrer")}
                                            aria-label={`Visit ${restaurant.name} website`}
                                            className="h-auto p-0 hover:bg-transparent flex items-center gap-2.5 text-sm font-bold text-foreground hover:text-primary transition-colors group"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-foreground/60 group-hover:text-primary group-hover:border-primary/30 transition-all">
                                                <Globe size={14} />
                                            </div>
                                            Website
                                        </Button>
                                    )}
                                    {restaurant.menuUrl && (
                                        <Button
                                            variant="ghost"
                                            onClick={() => window.open(restaurant.menuUrl, "_blank", "noopener,noreferrer")}
                                            aria-label={`View menu for ${restaurant.name}`}
                                            className="h-auto p-0 hover:bg-transparent flex items-center gap-2.5 text-sm font-bold text-foreground hover:text-primary transition-colors group"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-foreground/60 group-hover:text-primary group-hover:border-primary/30 transition-all">
                                                <UtensilsCrossed size={14} />
                                            </div>
                                            Menu
                                        </Button>
                                    )}
                                    {restaurant.phoneNumber && (
                                        <a
                                            href={`tel:${restaurant.phoneNumber}`}
                                            aria-label={`Call ${restaurant.name}`}
                                            className="flex items-center gap-2.5 text-sm font-bold text-foreground hover:text-primary transition-colors group"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-foreground/60 group-hover:text-primary group-hover:border-primary/30 transition-all">
                                                <Phone size={14} />
                                            </div>
                                            Call
                                        </a>
                                    )}
                                    {restaurant.email && (
                                        <a
                                            href={`mailto:${restaurant.email}`}
                                            aria-label={`Email ${restaurant.name}`}
                                            className="flex items-center gap-2.5 text-sm font-bold text-foreground hover:text-primary transition-colors group"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-foreground/60 group-hover:text-primary group-hover:border-primary/30 transition-all">
                                                <Mail size={14} />
                                            </div>
                                            Email
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100 w-full" />

                        {/* Description Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-1.5 bg-primary rounded-full" />
                                <h2 className="text-2xl font-bold text-foreground tracking-tight">About</h2>
                            </div>
                            <p className="text-lg text-foreground/70 leading-relaxed font-medium">
                                {restaurant.description}
                            </p>
                        </div>

                        {/* Features & Amenities Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-1.5 bg-primary rounded-full" />
                                <h2 className="text-2xl font-bold text-foreground tracking-tight">Features & Amenities</h2>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {[
                                    { icon: <MapPin size={20} />, label: "Outdoor Seating" },
                                    { icon: <Globe size={20} />, label: "Free Wi-Fi" },
                                    { icon: <Clock size={20} />, label: "Late Night Menu" }, // Using generic icons for now since I can't import new ones easily without seeing imports
                                    { icon: <Users size={20} />, label: "Good for Groups" },
                                    { icon: <Star size={20} />, label: "Reservations" },
                                    { icon: <ShieldCheck size={20} />, label: "Clean & Safe" },
                                ].map((feature) => (
                                    <div key={feature.label} className="flex items-center gap-4 text-foreground/80 font-medium p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-colors">
                                        <div className="text-primary/60">{feature.icon}</div>
                                        <span>{feature.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location Details section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-1.5 bg-primary rounded-full" />
                                <h2 className="text-2xl font-bold text-foreground tracking-tight">Location & Contact</h2>
                            </div>
                            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                                <div className="h-[350px] w-full bg-slate-200 relative overflow-hidden group">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        id="gmap_canvas"
                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(restaurant.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight="0"
                                        marginWidth="0"
                                        className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                        title="Restaurant Location"
                                    />

                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-auto min-w-[180px] text-center pointer-events-none">
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pointer-events-auto"
                                        >
                                            <Button className="bg-[#0d0c22] hover:bg-[#0d0c22]/90 text-white rounded-xl font-bold shadow-lg shadow-black/20 text-xs tracking-wide h-10 px-6 w-full flex items-center gap-2">
                                                <MapPin size={14} />
                                                Get Directions
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                                <div className="p-8 grid sm:grid-cols-2 gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 border border-slate-200 rounded-xl flex items-center justify-center text-primary">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Phone Number</p>
                                            <p className="font-bold text-foreground">{restaurant.phoneNumber || "Not available"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 border border-slate-200 rounded-xl flex items-center justify-center text-primary">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Official Email</p>
                                            <p className="font-bold text-foreground">{restaurant.email || "Not available"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Booking Card */}
                    <aside className="lg:w-1/3">
                        <div>
                            <Card className="border-none shadow-[0_30px_60px_rgba(0,0,0,0.08)] rounded-[2rem] overflow-hidden">
                                <CardContent className="p-5 space-y-8">

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-bold text-foreground">Opening Hours</h3>
                                            {/* <span className="text-xs font-bold text-green-600 px-2 py-1 bg-green-50 rounded-lg">Open Now</span> */}
                                        </div>

                                        <div className="space-y-3">
                                            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => {
                                                const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;
                                                return (
                                                    <div key={day} className={`flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0 ${isToday ? "font-bold text-foreground" : "text-foreground/60"}`}>
                                                        <span>{day}</span>
                                                        <span>{restaurant.openHours}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <p className="text-[10px] text-center text-foreground/30 font-bold uppercase tracking-widest ">
                                            Times may vary on holidays
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Trust Signals Side Card */}
                            <div className="mt-8 p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                                <h4 className="text-[11px] font-black uppercase tracking-widest text-foreground/40">Tourist Reassurance</h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                                            <ShieldCheck size={12} fill="currentColor" />
                                        </div>
                                        <p className="text-xs font-semibold text-foreground/60 leading-snug">
                                            English-speaking staff guaranteed for a stress-free experience.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mt-0.5">
                                            <ShieldCheck size={12} fill="currentColor" />
                                        </div>
                                        <p className="text-xs font-semibold text-foreground/60 leading-snug">
                                            Full compliance with international hygiene standards.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Reviews Section - Full Width */}
            <div className="bg-white py-16 border-t border-slate-100">
                <div className="container mx-auto px-6 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1.5 bg-primary rounded-full" />
                            <h2 className="text-2xl font-bold text-foreground tracking-tight">Reviews & Ratings</h2>
                        </div>
                        <Button
                            onClick={handleReviewClick}
                            className="bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center gap-2"
                        >
                            <PenLine size={16} />
                            Write a Review
                        </Button>

                        <AuthDialog open={authOpen} onOpenChange={setAuthOpen} initialView={authView} />

                        <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Write a Review</DialogTitle>
                                    <DialogDescription>
                                        Share your experience at {restaurant.name}. Your feedback helps others discover great places.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="rating">Rating</Label>
                                        <div className="flex gap-1 text-yellow-400">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setSelectedRating(star)}
                                                    aria-label={`Set rating ${star} stars`}
                                                    aria-pressed={star <= selectedRating}
                                                    className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-0.5"
                                                >
                                                    <Star
                                                        size={24}
                                                        fill={star <= selectedRating ? "currentColor" : "none"}
                                                        className="cursor-pointer hover:scale-110 transition-transform"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Summarize your visit"
                                            value={reviewTitle}
                                            onChange={(e) => setReviewTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="review">Review</Label>
                                        <Textarea
                                            id="review"
                                            placeholder="Tell us more about the food, service, and atmosphere..."
                                            value={reviewContent}
                                            onChange={(e) => setReviewContent(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        disabled={selectedRating === 0 || !reviewTitle.trim() || !reviewContent.trim()}
                                        onClick={handleSubmitReview}>Submit Review</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="space-y-6">
                        {reviewsData.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {reviewsData.map((review) => (
                                    <div key={review.id} className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                            <AvatarImage src={review.userImage} alt={review.userName} />
                                            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-2 w-full">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-foreground">{review.userName}</h4>
                                                    <p className="text-xs text-foreground/40 font-medium">{new Date(review.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex gap-0.5 text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-200"} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-foreground/70 leading-relaxed text-sm">
                                                "{review.content}"
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-foreground/40 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <p>No reviews yet. Be the first to share your experience!</p>
                            </div>
                        )}

                        {hasMore && reviewsData.length > 0 && (
                            <div className="flex justify-center pt-4">
                                <Button
                                    variant="outline"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="rounded-xl border-slate-200 text-foreground font-bold"
                                >
                                    {isLoadingMore ? "Loading..." : "Load More Reviews"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Traveller Photos Section - Full Width */}
            <div className="bg-slate-50 py-16 border-t border-slate-100">
                <div className="container mx-auto px-6 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-1.5 bg-primary rounded-full" />
                        <h2 className="text-2xl font-bold text-foreground tracking-tight">Traveller Photos</h2>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-6 snap-x scrollbar-hide -mx-6 px-6">
                        {travelerPhotos.length > 0 ? (
                            travelerPhotos.map((photo) => (
                                <div key={photo.id} className="group relative min-w-[260px] md:min-w-[300px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer snap-center shrink-0 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <img
                                        src={photo.imageUrl}
                                        alt={photo.caption}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                        <p className="text-white font-bold text-lg leading-tight mb-1">{photo.caption}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[10px] uppercase font-bold text-white">
                                                {photo.user?.charAt(0) || "T"}
                                            </div>
                                            <p className="text-white/90 text-xs font-medium uppercase tracking-wide">by {photo.user || "Traveler"}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
                                <Users size={40} className="text-slate-200 mb-4" />
                                <p className="text-slate-400 font-medium">No traveler photos yet.</p>
                                <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-1">Be the first to share an expert capture</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Restaurants Section - Full Width */}
            <div className="bg-white py-16 border-t border-slate-100">
                <div className="container mx-auto px-6 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1.5 bg-primary rounded-full" />
                            <h2 className="text-2xl font-bold text-foreground tracking-tight">You Might Also Like</h2>
                        </div>
                        <Link href="/restaurants" className="group flex items-center gap-2 text-sm font-bold text-primary hover:text-foreground transition-colors">
                            View All
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedRestaurants.map((related) => (
                            <Link key={related.id} href={`/restaurants/${related.id}`} className="group block space-y-4">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 border border-slate-100 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
                                    <img
                                        src={related.imageUrl}
                                        alt={related.name}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleFavorite(related.id);
                                        }}
                                        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/95 flex items-center justify-center text-foreground/20 hover:text-red-500 transition-colors shadow-sm z-10"
                                    >
                                        <Heart
                                            size={14}
                                            fill={isFavorite(related.id) ? "currentColor" : "none"}
                                            className={isFavorite(related.id) ? "text-red-500" : ""}
                                        />
                                    </button>
                                    {related.rating >= 4.8 && (
                                        <div className="absolute bottom-3 left-3">
                                            <Badge className="bg-primary text-white rounded-full border-none font-bold text-[8px] uppercase tracking-widest px-3 py-1">
                                                Top Rated
                                            </Badge>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-1">{related.name}</h3>
                                        <div className="flex items-center gap-1 shrink-0 text-foreground font-bold text-xs bg-slate-100 px-1.5 py-0.5 rounded">
                                            <span>{related.rating}</span>
                                            <Star size={10} fill="currentColor" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100/60 mt-3">
                                        <div className="flex items-center gap-3 text-[11px] font-bold text-foreground/40 uppercase tracking-widest divide-x divide-slate-200">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={10} className="text-primary" />
                                                <span className="line-clamp-1">{related.distance}</span>
                                            </div>
                                            <div className="pl-3">
                                                <span>{related.priceRange}</span>
                                            </div>
                                        </div>
                                        <div className="h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <ArrowRight size={10} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
}
