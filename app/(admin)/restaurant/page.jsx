"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RestaurantModal } from "@/components/admin/restaurant-modal";

const initialRestaurants = [
  {
    id: 1,
    name: "Bella Italia",
    cuisine: "Italian",
    location: "Downtown",
    status: "Active",
    image: null,
  },
  {
    id: 2,
    name: "Spice Route",
    cuisine: "Indian",
    location: "City Center",
    status: "Active",
    image: null,
  },
];

const RestaurantManagementPage = () => {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

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
    } else {
      const nextId = restaurants.length
        ? Math.max(...restaurants.map((r) => r.id)) + 1
        : 1;
      setRestaurants((prev) => [...prev, { id: nextId, ...data }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this restaurant?")) {
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 px-4 py-6 md:px-8 lg:px-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Restaurants
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage restaurants in your platform. Add, edit, or remove entries.
            </p>
          </div>
          <Button onClick={handleAddRestaurant}>
            <Plus className="h-4 w-4 mr-2" />
            Add Restaurant
          </Button>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base md:text-lg">
              All Restaurants
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-muted">
                  <tr className="border-b">
                    <th className="text-left px-4 py-3 font-medium text-xs text-muted-foreground">
                      Restaurant
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-xs text-muted-foreground">
                      Cuisine
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-xs text-muted-foreground">
                      Location
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-xs text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-xs text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.length ? (
                    restaurants.map((restaurant) => (
                      <tr
                        key={restaurant.id}
                        className="border-b last:border-0 hover:bg-muted/40 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-3">
                            {restaurant.image ? (
                              <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="h-10 w-10 rounded-lg object-cover bg-muted"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                                {restaurant.name.charAt(0)}
                              </div>
                            )}
                            {restaurant.name}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {restaurant.cuisine || "-"}
                        </td>
                        <td className="px-4 py-3">
                          {restaurant.location || "-"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${restaurant.status === "Active"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-700"
                              }`}
                          >
                            {restaurant.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => handleEditRestaurant(restaurant)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(restaurant.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-sm text-muted-foreground"
                      >
                        No restaurants yet. Click "Add Restaurant" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

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