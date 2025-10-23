import Link from 'next/link';
import { Activity } from 'react';

import { getCurrentUser } from '@/action/users';

import MobileMenu from './navbar/mobile-menu';
import MobileMenuButton from './navbar/mobile-menu-button';
import NavbarCart from './navbar/nav-bar-cart';

export default async function Navbar() {
  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#products' },
    { label: 'Referrals', href: '#' },
  ];
  const authUser = await getCurrentUser();

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
            <NavbarCart />
            <Activity mode={authUser?._id ? 'hidden' : 'visible'}>
              <Link href="/signin">
                <button type="button" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Sign In</button>
              </Link>
            </Activity>
            <Activity mode={authUser?._id ? 'visible' : 'hidden'}>
              <Link href="/dashboard">
                <button type="button" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Dashboard</button>
              </Link>
            </Activity>

          </div>

          {/* Mobile menu button */}
          <MobileMenuButton />

        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu navItems={navItems} />

    </nav>
  );
}
