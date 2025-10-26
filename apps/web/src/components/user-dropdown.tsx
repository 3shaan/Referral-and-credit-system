'use client';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { logout } from '@/action/auth';

import { Dropdown, DropdownItem, DropdownMenu, DropdownSeparator, DropdownTrigger } from './ui/dropdown';

export default function UserDropdown() {
  const router = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      </DropdownTrigger>

      <DropdownMenu align="right">
        <DropdownItem icon={LayoutDashboard}>
          <Link href="/dashboard">
            Dashboard
          </Link>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem
          icon={LogOut}
          onClickAction={
            async () => {
              await logout();
              toast.success('logout successful');
              router.push('/signin');
            }
          }
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
