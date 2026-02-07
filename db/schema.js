import { pgTable, text, timestamp, boolean, jsonb, real, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").notNull(),
    image: text("image"),
    role: text("role").notNull().default("user"),
    banned: boolean("banned").notNull().default(false),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt"),
    updatedAt: timestamp("updatedAt"),
});

export const restaurants = pgTable("restaurants", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    address: text("address").notNull(),
    latitude: real("latitude"),
    longitude: real("longitude"),
    cuisine: jsonb("cuisine").$type(),
    rating: real("rating").default(0),
    reviews: integer("reviews").default(0),
    priceRange: text("priceRange"),
    distance: text("distance"),
    openHours: text("openHours"),
    imageUrl: text("imageUrl"),
    images: jsonb("images").$type(),
    amenities: jsonb("amenities").$type(),
    isVegetarianFriendly: boolean("isVegetarianFriendly").default(false),
    isTouristFavorite: boolean("isTouristFavorite").default(false),
    languages: jsonb("languages").$type(),
    websiteUrl: text("websiteUrl"),
    menuUrl: text("menuUrl"),
    phoneNumber: text("phoneNumber"),
    email: text("email"),
    isPopular: boolean("isPopular").default(false),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const inquiries = pgTable("inquiries", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject"),
    message: text("message").notNull(),
    status: text("status").default("unread").notNull(),
    createdAt: timestamp("createdAt").notNull(),
});

export const reviews = pgTable("reviews", {
    id: text("id").primaryKey(),
    restaurantId: text("restaurantId").notNull().references(() => restaurants.id, { onDelete: "cascade" }),
    userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
    userName: text("userName"),
    userImage: text("userImage"),
    rating: integer("rating").notNull(),
    title: text("title"),
    content: text("content").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const favorites = pgTable("favorites", {
    id: text("id").primaryKey(),
    userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
    restaurantId: text("restaurantId").notNull().references(() => restaurants.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const travelerPhotos = pgTable("traveler_photos", {
    id: text("id").primaryKey(),
    restaurantId: text("restaurantId").notNull().references(() => restaurants.id, { onDelete: "cascade" }),
    imageUrl: text("imageUrl").notNull(),
    caption: text("caption"),
    user: text("user"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

