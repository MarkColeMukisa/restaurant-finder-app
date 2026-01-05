"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Clock, MapPin, Phone, Globe, Mail, Globe2, PhoneCall, MailIcon, X, Wifi, UtensilsCrossed, Wine, Dog, Users, ParkingCircle, CreditCard, Smartphone, Music, Cigarette, Trees, Armchair, Tv, AccessibilityIcon, Utensils, ChevronLeft, ChevronRight, Star, Heart, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { popularRestaurants } from '@/assets/assets'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const Overview = ({ restaurant }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showFeaturesDialog, setShowFeaturesDialog] = useState(false);
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const [showReservationDialog, setShowReservationDialog] = useState(false);
    const [menuScrollIndex, setMenuScrollIndex] = useState(0);
    const menuScrollRef = useRef(null);
    
    // Review form state
    const [reviewForm, setReviewForm] = useState({
        name: '',
        email: '',
        rating: 5,
        title: '',
        text: ''
    });

    // Reservation form state
    const [reservationForm, setReservationForm] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2'
    });

    const handleReviewFormChange = (e) => {
        const { name, value } = e.target;
        setReviewForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        // For now, just log the review
        console.log('New Review:', reviewForm);
        alert('Thank you for your review!');
        // Reset form
        setReviewForm({
            name: '',
            email: '',
            rating: 5,
            title: '',
            text: ''
        });
        setShowReviewDialog(false);
    };

    const handleReservationFormChange = (e) => {
        const { name, value } = e.target;
        setReservationForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReservationSubmit = (e) => {
        e.preventDefault();
        // For now, just log the reservation
        console.log('New Reservation:', reservationForm);
        alert('Reservation confirmed! You will receive a confirmation email shortly.');
        // Reset form
        setReservationForm({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            guests: '2'
        });
        setShowReservationDialog(false);
    };

    // Icon mapping for amenities
    const amenityIcons = {
        'Accepts Credit Cards': <CreditCard className="w-5 h-5" />,
        'American Express': <CreditCard className="w-5 h-5" />,
        'Digital Payments': <Smartphone className="w-5 h-5" />,
        'Dog Friendly': <Dog className="w-5 h-5" />,
        'Family style': <Users className="w-5 h-5" />,
        'Free off-street parking': <ParkingCircle className="w-5 h-5" />,
        'Free Wifi': <Wifi className="w-5 h-5" />,
        'Full Bar': <Wine className="w-5 h-5" />,
        'Highchairs Available': <Users className="w-5 h-5" />,
        'Live Music': <Music className="w-5 h-5" />,
        'Mastercard': <CreditCard className="w-5 h-5" />,
        'Non-smoking restaurant': <Cigarette className="w-5 h-5" />,
        'Outdoor Seating': <Trees className="w-5 h-5" />,
        'Parking Available': <ParkingCircle className="w-5 h-5" />,
        'Playgrounds': <Users className="w-5 h-5" />,
        'Reservations': <Clock className="w-5 h-5" />,
        'Seating': <Armchair className="w-5 h-5" />,
        'Serves Alcohol': <Wine className="w-5 h-5" />,
        'Street Parking': <ParkingCircle className="w-5 h-5" />,
        'Table Service': <Utensils className="w-5 h-5" />,
        'Takeout': <UtensilsCrossed className="w-5 h-5" />,
        'Television': <Tv className="w-5 h-5" />,
        'Validated Parking': <ParkingCircle className="w-5 h-5" />,
        'Visa': <CreditCard className="w-5 h-5" />,
        'Wheelchair Accessible': <AccessibilityIcon className="w-5 h-5" />,
    };

    const getAmenityIcon = (amenity) => {
        return amenityIcons[amenity] || <Utensils className="w-5 h-5" />;
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'hours', label: 'Hours' },
        { id: 'location', label: 'Location' },
        { id: 'menus', label: 'Menus' },
        { id: 'reviews', label: 'Reviews' },
    ];

    const handleTabClick = (tabId) => {
        const element = document.getElementById(tabId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Update active tab based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = tabs.map(tab => document.getElementById(tab.id));

            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i] && sections[i].getBoundingClientRect().top < 200) {
                    setActiveTab(tabs[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Menu scroll handlers
    const handleMenuPrevious = () => {
        if (menuScrollRef.current) {
            menuScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
            setMenuScrollIndex(Math.max(0, menuScrollIndex - 1));
        }
    };

    const handleMenuNext = () => {
        if (menuScrollRef.current) {
            menuScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
            setMenuScrollIndex(Math.min(restaurant?.menu?.length - 1, menuScrollIndex + 1));
        }
    };

    // Keyboard navigation for menu
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft') handleMenuPrevious();
            if (e.key === 'ArrowRight') handleMenuNext();
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [menuScrollIndex, restaurant?.menu?.length]);

    return (
        <div className="w-full bg-gray-50">
            {/* Sticky Navigation */}
            <div className="sticky top-20 bg-white border-b border-gray-200 z-40 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 flex gap-2 sm:gap-8 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`py-4 font-semibold text-xs sm:text-sm md:text-lg transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                                ? 'text-gray-900 border-b-2 border-orange-600'
                                : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">

                {/* Overview Section */}
                <section id="overview" className="mb-16 sm:mb-20 scroll-mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                        {/* Left Column - Content */}
                        <div className="md:col-span-2">
                            {/* At a Glance */}
                            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">At a Glance</h2>

                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">Open now</p>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <p className="text-gray-600 text-sm sm:text-base">Open until 11:00 PM</p>
                                            <button className="text-orange-600 font-medium hover:text-orange-700 text-sm">See all hours</button>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0 mt-1" />
                                        <p className="text-gray-600 text-sm sm:text-base">Plot 19-21 Wampewo Avenue, Speke Apartments Wampewo, Kampala 7036, Uganda</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
                                        <div className="flex items-center gap-2">
                                            <Globe2 className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                            <a href="#" className="text-orange-600 hover:text-orange-700 text-sm">Visit website</a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <PhoneCall className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                            <a href="tel:+256702711152" className="text-orange-600 hover:text-orange-700 text-sm">+256 702 711152</a>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MailIcon className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                            <a href="mailto:info@restaurant.com" className="text-orange-600 hover:text-orange-700 text-sm">info@restaurant.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            <div className="p-4 sm:p-6 mb-6">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">About</h2>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                    {restaurant?.description || `This is a premium dining establishment offering an exceptional culinary experience. 
                  With its carefully curated menu and elegant ambiance, it stands out as one of the finest restaurants in the area. 
                  Our dedicated team ensures every guest enjoys a memorable dining experience with impeccable service.`}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mt-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6">
                                    <p className="text-lg font-semibold text-gray-900">Features</p>
                                    <button onClick={() => setShowFeaturesDialog(true)} className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer text-sm sm:text-base">See all features</button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                                    {restaurant?.features?.amenities?.slice(0, 6).map((feature, index) => (
                                        <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-100 hover:border-orange-300 transition">
                                            <div className="flex items-center gap-3">
                                                <span className="text-orange-600 flex-shrink-0">
                                                    {getAmenityIcon(feature)}
                                                </span>
                                                <p className="text-gray-700 text-sm font-medium">{feature}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Location Section */}
                            <section id="location" className="mt-12 sm:mt-16 mb-8 scroll-mt-32">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">Location</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    {/* Left side - Map */}
                                    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 h-80 sm:h-96">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7679481875827!2d32.5831!3d0.3163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMMCsDMxJzUwLjciTiAzMsKwMzUnNTkuMiJF!5e0!3m2!1sen!2sug!4v1234567890`}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>

                                    {/* Right side - Location Details */}
                                    <div className="space-y-4 sm:space-y-6">
                                        {/* Location Details */}
                                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Address</h3>
                                            <div className="flex gap-3">
                                                <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="text-gray-700 font-medium">Plot 19-21 Wampewo Avenue</p>
                                                    <p className="text-gray-600">Speke Apartments Wampewo</p>
                                                    <p className="text-gray-600">Kampala 7036, Uganda</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Parking Info */}
                                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Parking</h3>
                                            <div className="space-y-3">
                                                {restaurant?.parking?.map((parkingOption, index) => (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <ParkingCircle className="w-5 h-5 text-orange-600" />
                                                        <span className="text-gray-700">{parkingOption}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column - Working Hours (Sticky) */}
                        <div className="grid-cols-1">
                            <div className="sticky top-32 bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 mb-5">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                                    Save This Restaurant

                                </h3>
                                <Button className="w-full">Save</Button>
                            </div>
                            <div className="sticky top-32 bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200" id="hours">
                                <h3
                                    onClick={() => {
                                        const element = document.getElementById('hours');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2 cursor-pointer hover:text-orange-600 transition"
                                >
                                    <Clock className="w-6 h-6 text-orange-600" />
                                    Hours
                                </h3>
                                <p >Closes at {restaurant.closing}</p>

                                <div className="space-y-3 mt-5">
                                    <div className="flex justify-between pb-3 border-b border-gray-100">
                                        <span className="font-medium text-gray-700">Monday</span>
                                        <span className="text-gray-600">11:00 AM - 11:00 PM</span>
                                    </div>
                                    <div className="flex justify-between pb-3 border-b border-gray-100">
                                        <span className="font-medium text-gray-700">Tuesday</span>
                                        <span className="text-gray-600">11:00 AM - 11:00 PM</span>
                                    </div>
                                    <div className="flex justify-between pb-3 border-b border-gray-100">
                                        <span className="font-medium text-gray-700">Wednesday</span>
                                        <span className="text-gray-600">11:00 AM - 11:00 PM</span>
                                    </div>
                                    <div className="flex justify-between pb-3 border-b border-gray-100">
                                        <span className="font-medium text-gray-700">Thursday</span>
                                        <span className="text-gray-600">11:00 AM - 11:00 PM</span>
                                    </div>
                                    <div className="flex justify-between pb-3 border-b border-gray-100">
                                        <span className="font-medium text-gray-700">Friday</span>
                                        <span className="text-gray-600">11:00 AM - 12:00 AM</span>
                                    </div>
                                    <div className="flex justify-between pb-3 border-b border-gray-100">
                                        <span className="font-medium text-gray-700">Saturday</span>
                                        <span className="text-gray-600">11:00 AM - 12:00 AM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Sunday</span>
                                        <span className="text-gray-600">11:00 AM - 10:00 PM</span>
                                    </div>
                                </div>

                                {/* Call to Action */}
                                <button onClick={() => setShowReservationDialog(true)} className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-700 hover:to-red-700 transition">
                                    Reserve a Table
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Features Dialog */}
            <Dialog open={showFeaturesDialog} onOpenChange={setShowFeaturesDialog}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">All Features</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-8 mt-6">
                        {/* Cuisines */}
                        {restaurant?.features?.cuisines && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">Cuisines</h3>
                                <div className="flex flex-wrap gap-2">
                                    {restaurant.features.cuisines.map((cuisine, index) => (
                                        <span key={index} className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                            {cuisine}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Meal Types */}
                        {restaurant?.features?.mealTypes && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Meal types</h3>
                                <div className="flex flex-wrap gap-2">
                                    {restaurant.features.mealTypes.map((mealType, index) => (
                                        <span key={index} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                            {mealType}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Special Diets */}
                        {restaurant?.features?.specialDiets && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Special Diets</h3>
                                <div className="flex flex-wrap gap-2">
                                    {restaurant.features.specialDiets.map((diet, index) => (
                                        <span key={index} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                            {diet}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Amenities */}
                        {restaurant?.features?.amenities && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">Features</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {restaurant.features.amenities.map((amenity, index) => (
                                        <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 border border-orange-100 hover:border-orange-300 transition">
                                            <div className="flex items-center gap-2">
                                                <span className="text-orange-600 flex-shrink-0">
                                                    {getAmenityIcon(amenity)}
                                                </span>
                                                <p className="text-gray-700 text-sm font-medium">{amenity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Dress Code */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Dress Code</h3>
                            <p className="text-gray-700 font-semibold text-base">{restaurant?.dressCode || 'Casual'}</p>
                        </div>

                        {/* Average Cost */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Average Cost</h3>
                            <p className="text-gray-700 font-semibold text-base">{restaurant?.averageCost || 'Contact for pricing'}</p>
                        </div>

                        {/* Payment Methods */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h3>
                            <div className="flex flex-wrap gap-2">
                                {restaurant?.paymentMethods?.map((method, index) => (
                                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Dietary Options */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Dietary Options</h3>
                            <div className="flex flex-wrap gap-2">
                                {restaurant?.dietaryOptions?.map((option, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {option}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Reservation Policy */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Reservation Policy</h3>
                            <p className="text-gray-700 text-base">{restaurant?.reservationPolicy || 'Please contact the restaurant for reservation details.'}</p>
                        </div>

                    </div>
                </DialogContent>
            </Dialog>

            {/* Review Form Dialog */}
            <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Write A Review</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleReviewSubmit} className="space-y-3 mt-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-1">Your Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={reviewForm.name}
                                onChange={handleReviewFormChange}
                                required
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-1">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={reviewForm.email}
                                onChange={handleReviewFormChange}
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                            />
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Rating *</label>
                            <div className="flex gap-3">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                                        className="transition-transform hover:scale-125"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${
                                                star <= reviewForm.rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Review Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-1">Review Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={reviewForm.title}
                                onChange={handleReviewFormChange}
                                required
                                placeholder="e.g., Amazing food and service!"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                            />
                        </div>

                        {/* Review Text */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-1">Your Review *</label>
                            <textarea
                                name="text"
                                value={reviewForm.text}
                                onChange={handleReviewFormChange}
                                required
                                placeholder="Share your detailed experience..."
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 resize-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 justify-end pt-2">
                            <button
                                type="button"
                                onClick={() => setShowReviewDialog(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium"
                            >
                                Submit Review
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Reservation Dialog */}
            <Dialog open={showReservationDialog} onOpenChange={setShowReservationDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Reserve a Table</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleReservationSubmit} className="space-y-3 mt-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={reservationForm.name}
                                onChange={handleReservationFormChange}
                                required
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-1">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={reservationForm.email}
                                onChange={handleReservationFormChange}
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-1">Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={reservationForm.phone}
                                onChange={handleReservationFormChange}
                                required
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                            />
                        </div>

                        {/* Date and Time Row */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Date */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-1">Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={reservationForm.date}
                                    onChange={handleReservationFormChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                                />
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-1">Time *</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={reservationForm.time}
                                    onChange={handleReservationFormChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                                />
                            </div>
                        </div>

                        {/* Guests */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-1">Number of Guests *</label>
                            <select
                                name="guests"
                                value={reservationForm.guests}
                                onChange={handleReservationFormChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                            >
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="3">3 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="5">5 Guests</option>
                                <option value="6">6 Guests</option>
                                <option value="7">7 Guests</option>
                                <option value="8">8 Guests</option>
                                <option value="9">9 Guests</option>
                                <option value="10">10+ Guests</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 justify-end pt-2">
                            <button
                                type="button"
                                onClick={() => setShowReservationDialog(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium"
                            >
                                Confirm Reservation
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Menus Section */}
            <section id="menus" className="mb-16 sm:mb-20 scroll-mt-32">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Menu</h2>
                        <p className="text-xs sm:text-sm text-gray-500">{menuScrollIndex + 1} / {restaurant?.menu?.length}</p>
                    </div>
                    
                    <div className="relative group">
                        {/* Previous Button */}
                        <button
                            onClick={handleMenuPrevious}
                            disabled={menuScrollIndex === 0}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 sm:-translate-x-16 z-10 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white p-1.5 sm:p-2 rounded-full transition disabled:cursor-not-allowed"
                            title="Previous (Arrow Left)"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                        </button>

                        {/* Scrollable Menu Container */}
                        <div 
                            ref={menuScrollRef}
                            className="overflow-x-auto scrollbar-hide"
                        >
                            <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
                                {restaurant?.menu?.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className="flex-shrink-0 w-64 sm:w-80 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-orange-300 transition"
                                    >
                                        {/* Menu Item Image */}
                                        <div className="relative w-full h-40 sm:h-48 bg-gray-200 overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                            />
                                            <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {item.category}
                                            </div>
                                        </div>

                                        {/* Menu Item Details */}
                                        <div className="p-3 sm:p-4">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                                            <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{item.description}</p>
                                            
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl sm:text-2xl font-bold text-orange-600">${item.price}</span>
                                                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium text-xs sm:text-sm">
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={handleMenuNext}
                            disabled={menuScrollIndex >= (restaurant?.menu?.length - 1)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 sm:translate-x-16 z-10 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white p-1.5 sm:p-2 rounded-full transition disabled:cursor-not-allowed"
                            title="Next (Arrow Right)"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                  
                </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="mb-16 sm:mb-20 scroll-mt-32">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Reviews</h2>
                        </div>
                        <Button onClick={() => setShowReviewDialog(true)} className="w-full sm:w-auto">Write A review</Button>
                    </div>
                    
                    {/* Rating Summary */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 mb-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                                    {restaurant?.reviews && restaurant.reviews.length > 0 
                                        ? (restaurant.reviews.reduce((sum, r) => sum + r.rating, 0) / restaurant.reviews.length).toFixed(1)
                                        : 'N/A'
                                    }
                                </span>
                                <div className="flex gap-1 mb-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star 
                                            key={star}
                                            className={`w-5 h-5 ${
                                                star <= Math.round(restaurant?.reviews?.reduce((sum, r) => sum + r.rating, 0) / (restaurant?.reviews?.length || 1) || 0)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-700 font-semibold text-sm sm:text-base">{restaurant?.reviews?.length || 0} reviews</p>
                            </div>
                        </div>

                        {/* Rating Distribution */}
                        {restaurant?.reviews && restaurant.reviews.length > 0 && (
                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map(rating => {
                                    const count = restaurant.reviews.filter(r => r.rating === rating).length;
                                    const percentage = (count / restaurant.reviews.length) * 100;
                                    return (
                                        <div key={rating} className="flex items-center gap-3">
                                            <span className="text-xs sm:text-sm font-medium text-gray-600 w-8">{rating}★</span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-yellow-400 transition-all" 
                                                    style={{width: `${percentage}%`}}
                                                />
                                            </div>
                                            <span className="text-xs sm:text-sm text-gray-500 w-8 text-right">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Reviews List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {restaurant?.reviews && restaurant.reviews.slice(0, 3).map(review => (
                            <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-orange-300 transition">
                                {/* Review Header */}
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                                                {review.author.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm sm:text-base">{review.author}</p>
                                                <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star 
                                                key={star}
                                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                                    star <= review.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Review Content */}
                                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{review.title}</h3>
                                <p className="text-gray-700 text-xs sm:text-sm mb-4 leading-relaxed">{review.text}</p>

                                {/* Helpful Button */}
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-orange-600 transition font-medium">
                                        👍 Helpful ({review.helpful})
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {restaurant?.reviews && restaurant.reviews.length > 0 && (
                        <div className="flex justify-center mt-8">
                            <button className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition font-semibold">
                                Load More Reviews
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Related Restaurants Section */}
            <section className="mb-16 sm:mb-20 scroll-mt-32">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Similar Restaurants</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                        {popularRestaurants
                            .filter(r => r.id !== restaurant.id)
                            .slice(0, 5)
                            .map((relatedRestaurant) => (
                            <Link key={relatedRestaurant.id} href={`/restaurants/${relatedRestaurant.id}`}>
                                <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden cursor-pointer flex flex-col h-full">
                                    {/* Image Container */}
                                    <div className="relative h-40 sm:h-48 overflow-hidden">
                                        <img
                                            src={relatedRestaurant.image}
                                            alt={relatedRestaurant.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        {/* Favorite Button */}
                                        <button className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-md"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                        >
                                            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hover:text-red-500 transition-colors" />
                                        </button>

                                        {/* Status Badge */}
                                        <div className="absolute top-2 left-2">
                                            <div className={`px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                                                relatedRestaurant.isOpen 
                                                    ? 'bg-green-500 text-white' 
                                                    : 'bg-red-500 text-white'
                                            }`}>
                                                {relatedRestaurant.isOpen ? 'Open' : 'Closed'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Restaurant Info */}
                                    <div className="p-3 sm:p-4 flex flex-col flex-grow">
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 line-clamp-1">
                                                    {relatedRestaurant.name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm mb-2 flex-wrap">
                                                    <Utensils className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                                                    <span className="line-clamp-1">{relatedRestaurant.cuisine}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 bg-blue-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg flex-shrink-0">
                                                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                                                <span className="text-xs sm:text-sm font-semibold text-gray-900">{relatedRestaurant.rating}</span>
                                            </div>
                                        </div>

                                        {/* Location & Delivery */}
                                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
                                            <div className="flex items-center gap-1 min-w-0">
                                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                                                <span className="truncate">{relatedRestaurant.distance}</span>
                                            </div>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                                <span>{relatedRestaurant.deliveryTime}</span>
                                            </div>
                                        </div>

                                        {/* Reviews */}
                                        <div className="text-xs text-gray-500 mb-2">
                                            {relatedRestaurant.reviews?.length || 0} reviews
                                        </div>

                                        {/* View Details Button */}
                                        <button className="w-full px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 text-xs sm:text-sm mt-auto"
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Overview;