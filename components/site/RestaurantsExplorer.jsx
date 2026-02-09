"use client";

import React, { useState, useMemo } from "react";
import {
    Search,
    Filter,
    Star,
    MapPin,
    Heart,
    ChevronDown,
    LayoutGrid,
    List,
    SlidersHorizontal,
    X,
    ArrowRight
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function getAveragePrice(range) {
    if (!range) return 0;
    const matches = range.match(/\d+/g);
    if (!matches || matches.length === 0) return 0;
    return matches.reduce((a, b) => parseInt(a) + parseInt(b), 0) / matches.length;
}

export function RestaurantsExplorer({ initialRestaurants = [], allCuisines = [], allLocations = [] }) {
    const searchParams = useSearchParams();
    const { isFavorite, toggleFavorite } = useFavorites();
    const router = useRouter();
    const pathname = usePathname();
    const initialSearch = searchParams.get("search") || "";

    const [restaurants, setRestaurants] = useState(initialRestaurants);
    const [hasMore, setHasMore] = useState(initialRestaurants.length >= 12);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    const [selectedCuisines, setSelectedCuisines] = useState([]);

    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [sortBy, setSortBy] = useState("Rating");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Sync state with server-side updates (e.g. navigation)
    React.useEffect(() => {
        setRestaurants(initialRestaurants);
        setHasMore(initialRestaurants.length >= 12);

        // Sync Search
        if (initialSearch !== searchQuery) {
            setSearchQuery(initialSearch);
        }

        // Sync Cuisine param
        const cuisineParam = searchParams.get("cuisine");
        if (cuisineParam) {
            setSelectedCuisines([cuisineParam]);
        } else {
            // Optional: clear if not present, or keep existing if logical (usually sync means replace)
            // But we want to allow persistent navigation. 
            // If we navigate to /restaurants, we expect clear filters usually?
            // For now, let's only set if present to avoid clearing user's manual selection on shallow routing if any.
            // Actually, if we navigate from Landing Page, it's a fresh mount or prop update.
        }

    }, [initialRestaurants, initialSearch, searchParams]);

    // Update URL when search query changes (Debounced)
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== initialSearch) {
                const params = new URLSearchParams(searchParams);
                if (searchQuery) {
                    params.set("search", searchQuery);
                } else {
                    params.delete("search");
                }
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, router, pathname, searchParams, initialSearch]);

    // Helper functions
    const getCityFromAddress = (address) => {
        if (!address) return "Other";
        const parts = address.split(',').map(s => s.trim());
        let city = parts.length > 1 ? parts[parts.length - 1] : parts[0];
        if (/\d/.test(city) && parts.length > 1) {
            city = parts[parts.length - 2];
        }
        return city.replace(/[\d-]/g, '').trim() || "Other";
    };

    // Calculate counts for each filter
    const cuisineCounts = useMemo(() => {
        const counts = {};
        restaurants.forEach(r => {
            if (Array.isArray(r.cuisine)) {
                r.cuisine.forEach(c => {
                    counts[c] = (counts[c] || 0) + 1;
                });
            }
        });
        return counts;
    }, [restaurants]);

    const priceCounts = useMemo(() => {
        const counts = {};
        restaurants.forEach(r => {
            const range = r.priceRange || "Unknown";
            counts[range] = (counts[range] || 0) + 1;
        });
        return counts;
    }, [restaurants]);

    const destinationCounts = useMemo(() => {
        const counts = {};
        restaurants.forEach(r => {
            const city = getCityFromAddress(r.address);
            counts[city] = (counts[city] || 0) + 1;
        });
        return counts;
    }, [restaurants]);

    // Derive available options from data
    const availableCuisines = useMemo(() => {
        const unique = new Set(["All"]);
        restaurants.forEach(r => {
            if (Array.isArray(r.cuisine)) {
                r.cuisine.forEach(c => unique.add(c));
            }
        });
        return Array.from(unique).sort();
    }, [restaurants]);

    const availablePrices = useMemo(() => {
        const unique = new Set(["All"]);
        restaurants.forEach(r => {
            if (r.priceRange) {
                unique.add(r.priceRange);
            }
        });
        return Array.from(unique).sort((a, b) => {
            if (a === "All") return -1;
            if (b === "All") return 1;
            return getAveragePrice(a) - getAveragePrice(b);
        });
    }, [restaurants]);

    const availableDestinations = useMemo(() => {
        const unique = new Set();
        restaurants.forEach(r => {
            const city = getCityFromAddress(r.address);
            if (city) unique.add(city);
        });
        return Array.from(unique).sort();
    }, [restaurants]);

    // Selection Handlers
    const toggleCuisine = (cuisine) => {
        setSelectedCuisines(prev =>
            prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
        );
    };

    const togglePrice = (price) => {
        setSelectedPrices(prev =>
            prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
        );
    };

    const toggleDestination = (destination) => {
        setSelectedDestinations(prev =>
            prev.includes(destination) ? prev.filter(d => d !== destination) : [...prev, destination]
        );
    };

    const handleLoadMore = async () => {
        console.log("Load More Clicked. Current count:", restaurants.length);
        setIsLoadingMore(true);
        try {
            const offset = restaurants.length;
            const queryParams = new URLSearchParams({
                limit: "12",
                offset: offset.toString(),
                ...(searchQuery && { search: searchQuery })
            });
            console.log("Fetching:", `/api/restaurants/list?${queryParams.toString()}`);

            const response = await fetch(`/api/restaurants/list?${queryParams.toString()}`);
            if (response.ok) {
                const newRestaurants = await response.json();
                console.log("Fetched new restaurants:", newRestaurants.length);

                if (newRestaurants.length < 12) {
                    setHasMore(false);
                }
                setRestaurants(prev => [...prev, ...newRestaurants]);
            } else {
                console.error("Fetch failed:", response.status);
            }
        } catch (error) {
            console.error("Failed to load more restaurants", error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    // Filtering Logic
    const filteredRestaurants = useMemo(() => {
        return restaurants
            .filter(r => {
                const restaurantCuisines = Array.isArray(r.cuisine) ? r.cuisine : [];
                const restaurantCity = getCityFromAddress(r.address);

                const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (r.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (r.address || "").toLowerCase().includes(searchQuery.toLowerCase());

                const matchesCuisine = selectedCuisines.length === 0 ||
                    restaurantCuisines.some(c => selectedCuisines.includes(c));

                const matchesPrice = selectedPrices.length === 0 || (r.priceRange && selectedPrices.includes(r.priceRange));

                const matchesDestination = selectedDestinations.length === 0 || selectedDestinations.includes(restaurantCity);

                return matchesSearch && matchesCuisine && matchesPrice && matchesDestination;
            })
            .sort((a, b) => {
                if (sortBy === "Rating") return b.rating - a.rating;

                const priceA = getAveragePrice(a.priceRange);
                const priceB = getAveragePrice(b.priceRange);

                if (sortBy === "Price (Low-High)") return priceA - priceB;
                if (sortBy === "Price (High-Low)") return priceB - priceA;
                return 0;
            });
    }, [restaurants, searchQuery, selectedCuisines, selectedPrices, selectedDestinations, sortBy]);

    return (
        <section className="bg-slate-50 min-h-screen py-20 pb-32">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <div className="mb-12">
                    <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Comprehensive Directory</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tighter leading-tight mb-4">
                        Discover Elite <span className="text-primary italic">Dining</span>
                    </h1>
                </div>

                {/* Mobile Filter Trigger */}
                <div className="lg:hidden mb-8">
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <SheetTrigger asChild>
                            <Button className="w-full bg-white text-foreground border border-slate-200 shadow-sm hover:bg-slate-50 h-12 rounded-xl font-bold flex items-center justify-between px-6">
                                <span className="flex items-center gap-2">
                                    <Filter size={16} className="text-primary" />
                                    Filters
                                </span>
                                {(selectedCuisines.length > 0 || selectedPrices.length > 0 || selectedDestinations.length > 0) && (
                                    <Badge className="bg-primary text-white hover:bg-primary border-none h-6 w-6 rounded-full p-0 flex items-center justify-center text-[10px]">
                                        {selectedCuisines.length + selectedPrices.length + selectedDestinations.length}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                            <SheetHeader className="text-left mb-6">
                                <SheetTitle className="text-lg font-bold">Filters</SheetTitle>
                                <SheetDescription>Refine your dining search.</SheetDescription>
                            </SheetHeader>

                            <div className="space-y-8 pb-8 pl-4">
                                {/* Search removed as per request */}

                                {/* Destinations Filter in Sheet */}
                                <div>
                                    <h4 className="text-base font-bold text-foreground mb-4">Destinations</h4>
                                    <div className="space-y-4">
                                        {availableDestinations.map(d => (
                                            <div
                                                key={d}
                                                role="button"
                                                tabIndex={0}
                                                className="flex items-center justify-between group cursor-pointer w-full text-left outline-none focus:ring-2 focus:ring-primary rounded-md p-1 -ml-1 border-none bg-transparent"
                                                onClick={() => toggleDestination(d)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        toggleDestination(d);
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center space-x-4 pointer-events-none">
                                                    <Checkbox
                                                        id={`mobile-dest-${d}`}
                                                        checked={selectedDestinations.includes(d)}
                                                        tabIndex={-1}
                                                        className="h-5 w-5 rounded-[6px] border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                    />
                                                    <Label
                                                        htmlFor={`mobile-dest-${d}`}
                                                        className={`text-[13px] font-medium transition-colors ${selectedDestinations.includes(d) ? "text-primary" : "text-foreground/70"}`}
                                                    >
                                                        {d}
                                                    </Label>
                                                </div>
                                                <span className="text-[12px] font-medium text-foreground/25 tabular-nums">
                                                    {destinationCounts[d] || 0}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Cuisine Filter in Sheet */}
                                <div>
                                    <h4 className="text-base font-bold text-foreground mb-4">Cuisine Style</h4>
                                    <div className="space-y-4">
                                        {availableCuisines.filter(c => c !== "All").map(c => (
                                            <div
                                                key={c}
                                                role="button"
                                                tabIndex={0}
                                                className="flex items-center justify-between group cursor-pointer w-full text-left outline-none focus:ring-2 focus:ring-primary rounded-md p-1 -ml-1 border-none bg-transparent"
                                                onClick={() => toggleCuisine(c)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        toggleCuisine(c);
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center space-x-4 pointer-events-none">
                                                    <Checkbox
                                                        id={`mobile-cuisine-${c}`}
                                                        checked={selectedCuisines.includes(c)}
                                                        tabIndex={-1}
                                                        className="h-5 w-5 rounded-[6px] border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                    />
                                                    <Label
                                                        htmlFor={`mobile-cuisine-${c}`}
                                                        className={`text-[13px] font-medium transition-colors ${selectedCuisines.includes(c) ? "text-primary" : "text-foreground/70"}`}
                                                    >
                                                        {c}
                                                    </Label>
                                                </div>
                                                <span className="text-[12px] font-medium text-foreground/25 tabular-nums">
                                                    {cuisineCounts[c] || 0}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Filter in Sheet */}
                                <div>
                                    <h4 className="text-base font-bold text-foreground mb-4">Price Level</h4>
                                    <div className="space-y-4">
                                        {availablePrices.filter(p => p !== "All").map(p => (
                                            <div
                                                key={p}
                                                role="button"
                                                tabIndex={0}
                                                className="flex items-center justify-between group cursor-pointer w-full text-left outline-none focus:ring-2 focus:ring-primary rounded-md p-1 -ml-1 border-none bg-transparent"
                                                onClick={() => togglePrice(p)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        togglePrice(p);
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center space-x-4 pointer-events-none">
                                                    <Checkbox
                                                        id={`mobile-price-${p}`}
                                                        checked={selectedPrices.includes(p)}
                                                        tabIndex={-1}
                                                        className="h-5 w-5 rounded-[6px] border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                    />
                                                    <Label
                                                        htmlFor={`mobile-price-${p}`}
                                                        className={`text-[13px] font-medium transition-colors ${selectedPrices.includes(p) ? "text-primary" : "text-foreground/70"}`}
                                                    >
                                                        {p === "All" ? "All Prices" : p}
                                                    </Label>
                                                </div>
                                                <span className="text-[12px] font-medium text-foreground/25 tabular-nums">
                                                    {priceCounts[p] || 0}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full bg-primary font-bold rounded-xl" onClick={() => setIsFilterOpen(false)}>
                                    Show Results
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters - Sticky on Desktop */}
                    <aside className="hidden lg:block lg:w-1/4">
                        <div className="space-y-10">


                            {/* Destinations Filter - Sticky/Sidebar */}
                            <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100">
                                <h4 className="text-base font-bold text-foreground mb-6">Destinations</h4>
                                <div className="space-y-4">
                                    {availableDestinations.map(d => (
                                        <div
                                            key={d}
                                            role="button"
                                            tabIndex={0}
                                            className="flex items-center justify-between group cursor-pointer w-full text-left outline-none focus:ring-2 focus:ring-primary rounded-md p-1 -ml-1 border-none bg-transparent"
                                            onClick={() => toggleDestination(d)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    toggleDestination(d);
                                                }
                                            }}
                                        >
                                            <div className="flex items-center space-x-4 pointer-events-none">
                                                <Checkbox
                                                    id={`dest-${d}`}
                                                    checked={selectedDestinations.includes(d)}
                                                    tabIndex={-1}
                                                    className="h-5 w-5 rounded-[6px] border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                />
                                                <Label
                                                    htmlFor={`dest-${d}`}
                                                    className={`text-[13px] font-medium transition-colors ${selectedDestinations.includes(d) ? "text-primary" : "text-foreground/70"}`}
                                                >
                                                    {d}
                                                </Label>
                                            </div>
                                            <span className="text-[12px] font-medium text-foreground/25 tabular-nums">
                                                {destinationCounts[d] || 0}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cuisine Filter - Multi-select Checkboxes */}
                            <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100">
                                <h4 className="text-base font-bold text-foreground mb-6">Cuisine Style</h4>
                                <div className="space-y-4">
                                    {availableCuisines.filter(c => c !== "All").map(c => (
                                        <div
                                            key={c}
                                            role="button"
                                            tabIndex={0}
                                            className="flex items-center justify-between group cursor-pointer w-full text-left outline-none focus:ring-2 focus:ring-primary rounded-md p-1 -ml-1 border-none bg-transparent"
                                            onClick={() => toggleCuisine(c)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    toggleCuisine(c);
                                                }
                                            }}
                                        >
                                            <div className="flex items-center space-x-4 pointer-events-none">
                                                <Checkbox
                                                    id={`cuisine-${c}`}
                                                    checked={selectedCuisines.includes(c)}
                                                    tabIndex={-1}
                                                    className="h-5 w-5 rounded-[6px] border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                />
                                                <Label
                                                    htmlFor={`cuisine-${c}`}
                                                    className={`text-[13px] font-medium transition-colors ${selectedCuisines.includes(c) ? "text-primary" : "text-foreground/70"}`}
                                                >
                                                    {c}
                                                </Label>
                                            </div>
                                            <span className="text-[12px] font-medium text-foreground/25 tabular-nums">
                                                {cuisineCounts[c] || 0}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range Filter - Checkboxes */}
                            <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100">
                                <h4 className="text-base font-bold text-foreground mb-6">Price Level</h4>
                                <div className="space-y-4">
                                    {availablePrices.filter(p => p !== "All").map(p => (
                                        <div
                                            key={p}
                                            role="button"
                                            tabIndex={0}
                                            className="flex items-center justify-between group cursor-pointer w-full text-left outline-none focus:ring-2 focus:ring-primary rounded-md p-1 -ml-1 border-none bg-transparent"
                                            onClick={() => togglePrice(p)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    togglePrice(p);
                                                }
                                            }}
                                        >
                                            <div className="flex items-center space-x-4 pointer-events-none">
                                                <Checkbox
                                                    id={`price-${p}`}
                                                    checked={selectedPrices.includes(p)}
                                                    tabIndex={-1}
                                                    className="h-5 w-5 rounded-[6px] border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                />
                                                <Label
                                                    htmlFor={`price-${p}`}
                                                    className={`text-[13px] font-medium transition-colors ${selectedPrices.includes(p) ? "text-primary" : "text-foreground/70"}`}
                                                >
                                                    {p === "All" ? "All Prices" : p}
                                                </Label>
                                            </div>
                                            <span className="text-[12px] font-medium text-foreground/25 tabular-nums">
                                                {priceCounts[p] || 0}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:w-3/4">
                        {/* Top Utility Bar */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex-1 relative w-full">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/20" size={20} />
                                <Input
                                    placeholder="Search by restaurant name, vibe, or location..."
                                    className="pl-16 h-14 bg-slate-50 border-none rounded-xl text-sm font-bold placeholder:text-foreground/20 focus-visible:ring-0"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="h-14 w-full sm:w-[180px] border-none bg-slate-50 rounded-xl text-[11px] font-black uppercase tracking-widest focus:ring-0">
                                        <div className="flex items-center gap-2">
                                            <List size={14} className="text-primary" />
                                            <SelectValue placeholder="Sort By" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-100">
                                        <SelectItem value="Rating" className="text-[11px] font-bold uppercase">Rating: Highest</SelectItem>
                                        <SelectItem value="Price (Low-High)" className="text-[11px] font-bold uppercase">Price: Low to High</SelectItem>
                                        <SelectItem value="Price (High-Low)" className="text-[11px] font-bold uppercase">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Active Filters Summary */}
                        <div className="flex items-center justify-between mb-8 px-2">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                                    Results Found: <span className="text-primary">{filteredRestaurants.length}</span>
                                </span>
                            </div>
                            {(selectedCuisines.length > 0 || selectedPrices.length > 0 || selectedDestinations.length > 0 || searchQuery !== "") && (
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setSelectedCuisines([]);
                                        setSelectedPrices([]);
                                        setSelectedDestinations([]);
                                        setSearchQuery("");
                                    }}
                                    className="h-auto p-0 hover:bg-transparent flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 hover:text-primary transition-colors"
                                >
                                    Clear Selection <X size={12} />
                                </Button>
                            )}
                        </div>

                        {/* Restaurant Grid */}
                        {isLoading ? (
                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                                {[1, 2, 3, 4, 5, 6].map((n) => (
                                    <div key={n} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-96 animate-pulse">
                                        <div className="h-48 bg-slate-200" />
                                        <div className="p-6 space-y-4">
                                            <div className="h-6 bg-slate-200 rounded w-3/4" />
                                            <div className="h-4 bg-slate-200 rounded w-1/2" />
                                            <div className="h-4 bg-slate-200 rounded w-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredRestaurants.length > 0 ? (
                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                                {filteredRestaurants.map((restaurant) => (
                                    <div
                                        key={restaurant.id}
                                        className="group cursor-pointer"
                                    >
                                        <Link href={`/restaurants/${restaurant.id}`} className="block h-full">
                                            <div className="bg-white rounded-2xl shadow-sm group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden h-full flex flex-col border border-slate-100">
                                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                                    <img
                                                        src={restaurant.imageUrl}
                                                        alt={restaurant.name}
                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute top-4 right-4 z-10">
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                toggleFavorite(restaurant.id);
                                                            }}
                                                            className="h-10 w-10 rounded-full bg-white/95 flex items-center justify-center text-foreground/20 hover:text-red-500 transition-colors shadow-sm"
                                                        >
                                                            <Heart
                                                                size={18}
                                                                fill={isFavorite(restaurant.id) ? "currentColor" : "none"}
                                                                className={isFavorite(restaurant.id) ? "text-red-500" : ""}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="p-6 flex-1 flex flex-col gap-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex flex-col gap-1">
                                                            <h3 className="font-bold text-[17px] text-foreground group-hover:text-primary transition-colors leading-tight tracking-tight">{restaurant.name}</h3>
                                                            <div className="flex items-center gap-2 text-foreground/30 text-[10px] font-bold uppercase tracking-widest">
                                                                <MapPin size={10} className="text-primary" />
                                                                {restaurant.distance || 'Nearby'}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/5 text-primary rounded-md shrink-0">
                                                            <Star size={12} fill="currentColor" />
                                                            <span className="font-bold text-xs">{restaurant.rating || 0}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between group/action">
                                                        <span className="text-xs font-bold text-foreground/40">{restaurant.priceRange}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] group-hover/action:text-primary transition-all">View Profile</span>
                                                            <div className="h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center text-primary/40 group-hover/action:bg-primary group-hover/action:text-white transition-all">
                                                                <ArrowRight size={10} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-foreground/10 mb-6">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">Perfect matches are rare</h3>
                                <p className="text-foreground/40 text-[11px] font-bold uppercase tracking-widest max-w-xs">
                                    Try expanding your filters to discover other hidden culinary stars.
                                </p>
                            </div>
                        )}

                        {hasMore && !isLoading && (
                            <div className="flex justify-center pt-12">
                                <Button
                                    variant="outline"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="bg-white hover:bg-slate-50 text-foreground border border-slate-200 h-12 px-8 rounded-xl font-bold tracking-tight shadow-sm"
                                >
                                    {isLoadingMore ? "Loading..." : "Load More Restaurants"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
