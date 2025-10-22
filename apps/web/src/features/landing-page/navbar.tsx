'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#products' },
    { label: 'Referrals', href: '#' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">RewardShop</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {
              navItems.map(item => (
                <Link key={item.label} href={item.href} className="text-gray-700 hover:text-indigo-600 transition">{item.label}</Link>
              ))
            }
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button type="button" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Sign In</button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {
              navItems.map(item => (
                <Link key={item.label} href={item.href} className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded">{item.label}</Link>
              ))
            }

            <div className="px-3 py-2 space-y-2">
              <button type="button" className="w-full text-left text-gray-700">Sign In</button>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
