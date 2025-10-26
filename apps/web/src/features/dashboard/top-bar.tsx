'use client';
import { Menu, Search } from 'lucide-react';

import UserDropdown from '@/components/user-dropdown';
import useMobileSidebarToggle from '@/hooks/mobile-sidebar-toggle';

export default function TopBar() {
  const { toggle } = useMobileSidebarToggle();
  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 lg:px-6">
      <button
        type="button"
        onClick={() => toggle()}
        className="text-gray-500 hover:text-gray-700 lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">

        <UserDropdown />
      </div>
    </header>
  );
}
