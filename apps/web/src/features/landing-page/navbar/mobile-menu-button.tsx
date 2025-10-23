'use client';

import useMobileNavbarToggle from '@/hooks/mobile-navbar-toggle';

export default function MobileMenuButton() {
  const { toggle } = useMobileNavbarToggle();
  return (
    <button
      type="button"
      onClick={() => toggle()}
      className="md:hidden text-gray-700"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  );
}
