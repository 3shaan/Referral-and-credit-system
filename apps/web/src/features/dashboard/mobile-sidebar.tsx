'use client'
import { sideBarMenu } from "@/data/menuItem";
import useMobileSidebarToggle from "@/hooks/mobile-sidebar-toggle";
import { X } from "lucide-react";
import { Activity } from "react";

export default function MobileSidebar() {
  const { toggle, isOpen } = useMobileSidebarToggle();
  return (
    <Activity mode={isOpen ? "visible" : "hidden"}>

      <div className="fixed inset-0 z-40 lg:hidden">
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => toggle()}></div>
        <aside className="absolute inset-y-0 left-0 flex flex-col w-64 bg-white">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <button onClick={() => toggle()} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            {sideBarMenu.map((item) => (
              <button
                key={item.label}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${item.active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
                onClick={() => toggle()}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
      </div>

    </Activity>
  )
}
