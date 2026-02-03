"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ArrowLeft, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RestaurantModal } from "@/components/admin/restaurant-modal";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STORAGE_KEY = "admin_restaurants";

const initialRestaurants = [
  {
    id: 1,
    name: "Bella Italia",
    cuisine: "Italian",
    location: "Downtown",
    status: "Active",
    phone: "+1 (555) 123-4567",
    email: "info@bellaitalia.com",
    description: "Authentic Italian cuisine in the heart of downtown.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Spice Route",
    cuisine: "Indian",
    location: "City Center",
    status: "Active",
    phone: "+1 (555) 987-6543",
    email: "contact@spiceroute.com",
    description: "Experience the vibrant flavors of India.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=60"
  },
];

const RestaurantManagementPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load restaurants from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setRestaurants(JSON.parse(stored));
        } catch (e) {
          setRestaurants(initialRestaurants);
        }
      } else {
        setRestaurants(initialRestaurants);
      }
    }
  }, []);

  // Save to localStorage whenever restaurants change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      const currentJson = JSON.stringify(restaurants);

      if (stored !== currentJson) {
        localStorage.setItem(STORAGE_KEY, currentJson);
        window.dispatchEvent(new CustomEvent("restaurantsUpdated", { detail: restaurants.length }));
      }
    }
  }, [restaurants]);
  const handleAddRestaurant = () => {
    setEditingRestaurant(null);
    setIsModalOpen(true);
  };

  const handleEditRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingRestaurant) {
      setRestaurants((prev) =>
        prev.map((r) => (r.id === editingRestaurant.id ? { ...r, ...data } : r))
      );
      toast.success("Restaurant updated successfully");
    } else {
      const nextId = restaurants.length
        ? Math.max(...restaurants.map((r) => r.id)) + 1
        : 1;
      setRestaurants((prev) => [...prev, { id: nextId, ...data }]);
      toast.success("Restaurant created successfully");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this restaurant?")) {
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
      toast.success("Restaurant deleted successfully");
    }
  };

  const filteredRestaurants = restaurants.filter(r =>
    (r.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.cuisine ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.location ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-muted/20 px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="icon" className="h-10 w-10 shadow-sm">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to dashboard</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Restaurants
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your directory of {restaurants.length} restaurants.
              </p>
            </div>
          </div>
          <Button onClick={handleAddRestaurant} className="shadow-md bg-primary hover:bg-primary/90">
            <Plus className="h-5 w-5 mr-2" />
            Add Restaurant
          </Button>
        </div>

        {/* Filters & Content */}
        <div className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter restaurants..."
              className="pl-10 h-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Restaurant</th>
                      <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Cuisine</th>
                      <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Location</th>
                      <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                      <th className="text-right px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted bg-white">
                    {filteredRestaurants.length ? (
                      filteredRestaurants.map((restaurant) => (
                        <tr key={restaurant.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden border shadow-sm shrink-0">
                                {restaurant.image ? (
                                  <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
                                ) : (
                                  <span className="text-lg font-bold text-muted-foreground">{restaurant.name.charAt(0)}</span>
                                )}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-foreground truncate">{restaurant.name}</span>
                                <span className="text-xs text-muted-foreground truncate">{restaurant.email || "No email"}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-100 italic">
                              {restaurant.cuisine || "Generic"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {restaurant.location || "-"}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${restaurant.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-50 text-slate-700 border border-slate-200"
                                }`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full mr-2 ${restaurant.status === "Active" ? "bg-emerald-500" : "bg-slate-500"}`}></span>
                              {restaurant.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleEditRestaurant(restaurant)}>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600"
                                  onClick={() => handleDelete(restaurant.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <p className="text-muted-foreground font-medium">No restaurants found</p>
                            <p className="text-xs text-muted-foreground">Try adjusting your search or add a new restaurant.</p>
                            <Button variant="outline" size="sm" className="mt-2" onClick={() => setSearchQuery("")}>
                              Clear search
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <RestaurantModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingRestaurant}
        />
      </div>
    </div>
  );
};

export default RestaurantManagementPage;
