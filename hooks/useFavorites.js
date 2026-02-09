
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function useFavorites() {
    const { data: session } = authClient.useSession();
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchFavorites();
        } else {
            setFavorites([]);
            setIsLoading(false);
        }
    }, [session]);

    const fetchFavorites = async () => {
        try {
            const res = await fetch("/api/user/favorites");
            if (res.ok) {
                const data = await res.json();
                // Store array of IDs
                setFavorites(data.map(f => f.restaurantId));
            }
        } catch (error) {
            console.error("Failed to load favorites", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFavorite = async (restaurantId) => {
        if (!session) {
            toast.error("Please sign in to save favorites");
            return;
        }

        const isFavorited = favorites.includes(restaurantId);

        // Optimistic update
        setFavorites(prev =>
            isFavorited ? prev.filter(id => id !== restaurantId) : [...prev, restaurantId]
        );

        try {
            const method = isFavorited ? "DELETE" : "POST";
            const res = await fetch("/api/user/favorites", {
                method,
                body: JSON.stringify({ restaurantId }),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) {
                throw new Error("Failed to update");
            }

            toast.success(isFavorited ? "Removed from favorites" : "Added to favorites");
        } catch (error) {
            // Revert on error
            setFavorites(prev =>
                isFavorited ? [...prev, restaurantId] : prev.filter(id => id !== restaurantId)
            );
            toast.error("Something went wrong");
        }
    };

    return {
        favorites,
        isLoading,
        toggleFavorite,
        isFavorite: (id) => favorites.includes(id)
    };
}
