import { db } from "@/db";
import { favorites, restaurants } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { Heart, ArrowLeft, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavoritesGrid } from "@/components/site/FavoritesGrid";

export const dynamic = 'force-dynamic';

export default async function FavoritesPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="h-10 w-10 text-red-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-3">Sign in to view your favorites</h1>
                        <p className="text-slate-500 mb-8">Save your favorite restaurants and access them anytime.</p>
                        <Link href="/">
                            <Button className="bg-primary text-white rounded-full px-8 h-12 font-bold">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Fetch user's favorites with restaurant details
    const userFavorites = await db.select().from(favorites).where(eq(favorites.userId, session.user.id));
    const restaurantIds = userFavorites.map(f => f.restaurantId);

    let favoriteRestaurants = [];
    if (restaurantIds.length > 0) {
        favoriteRestaurants = await db.select().from(restaurants).where(inArray(restaurants.id, restaurantIds));
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/" className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-foreground" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">
                            My Favorites
                        </h1>
                        <p className="text-slate-500 mt-1">
                            {favoriteRestaurants.length} saved restaurant{favoriteRestaurants.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                {favoriteRestaurants.length > 0 ? (
                    <FavoritesGrid restaurants={favoriteRestaurants} />
                ) : (
                    <div className="text-center py-20">
                        <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="h-12 w-12 text-slate-300" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground mb-2">No favorites yet</h2>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">
                            Start exploring restaurants and tap the heart icon to save your favorites here.
                        </p>
                        <Link href="/restaurants">
                            <Button className="bg-primary text-white rounded-full px-8 h-12 font-bold">
                                Explore Restaurants
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
