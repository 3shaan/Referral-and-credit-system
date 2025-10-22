'use client'
import useMobileSidebarToggle from "@/hooks/mobile-sidebar-toggle";
import { LogOut, Menu, Search, User } from "lucide-react";
import { useState } from "react";

export default function TopBar() {
  const { toggle } = useMobileSidebarToggle()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 lg:px-6">
      <button
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

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setProfileMenuOpen(!profileMenuOpen);
            }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </button>

          {/* Profile dropdown menu */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User className="w-4 h-4 mr-3" />
                Profile
              </button>
              <hr className="my-1 border-gray-200" />
              <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
