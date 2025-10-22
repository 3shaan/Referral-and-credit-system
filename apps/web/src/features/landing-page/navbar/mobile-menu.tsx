'use client'
import useMobileNavbarToggle from "@/hooks/mobile-navbar-toggle";
import Link from "next/link";
import { Activity } from "react";

export default function MobileMenu({ navItems }: { navItems: { label: string, href: string }[] }) {
  const { isOpen } = useMobileNavbarToggle()
  return (
    <Activity mode={isOpen ? 'visible' : 'hidden'}>
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
    </Activity>
  )
}
