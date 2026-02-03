"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-black text-gray-900">
              Restaurant<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Finder</span>
            </h1>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={`text-sm font-medium transition-colors text-black hover:text-red-600`}>Home</Link>
            <Link href="/restaurants" className={`text-sm font-medium transition-colors text-black hover:text-red-600`}>Restaurants</Link>
            <a href="#" className={`text-sm font-medium transition-colors text-black hover:text-red-600`}>About</a>
            <a href="#" className={`text-sm font-medium transition-colors text-black hover:text-red-600`}>Contact</a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Sign In Button */}
            <Link href="/admin" className="hidden md:block px-6 py-2.5 rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 shadow-md hover:shadow-lg transform hover:scale-105">
              Sign In
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden pb-4 space-y-3 ${isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-black/20 backdrop-blur-sm'}`}>
            <Link href="/" className={`block text-sm font-medium transition-colors text-black hover:text-red-600`}>Home</Link>
            <Link href="/restaurants" className={`block text-sm font-medium transition-colors text-black hover:text-red-600`}>Restaurants</Link>
            <a href="#" className={`block text-sm font-medium transition-colors text-black hover:text-red-600`}>About</a>
            <a href="#" className={`block text-sm font-medium transition-colors text-black hover:text-red-600`}>Contact</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;