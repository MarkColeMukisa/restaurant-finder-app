"use client";

import React from "react";
import { RestaurantsExplorer } from "@/components/site/RestaurantsExplorer";

export default function RestaurantsPage() {
    return (
        <div className="pt-20 selection:bg-primary/30 selection:text-primary"> {/* Offset for sticky header */}
            <RestaurantsExplorer />
        </div>
    );
}
