import { Home, Users } from 'lucide-react';

export const sideBarMenu = [
  { icon: Home, label: 'Dashboard', active: false, link: '/dashboard' },
  { icon: Users, label: 'Users', active: true, link: '/dashboard/users' },
];
