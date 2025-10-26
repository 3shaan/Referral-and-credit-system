'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sideBarMenu } from '@/data/menuItem';

export default function SideBar() {
  const pathName = usePathname();
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-indigo-600">RewardShop</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {sideBarMenu.map(item => (
          <Link href={item.link} key={item.label}>
            <button
              type="button"
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${pathName === item.link
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          </Link>

        ))}
      </nav>
    </aside>
  );
}
